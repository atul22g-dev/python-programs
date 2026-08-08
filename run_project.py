#!/usr/bin/env python3
"""run-project — install dependencies and run any project in this repo, in one command.

Usage:
    uv run run-project                  # interactive picker
    uv run run-project "Snake Game"     # run a project by name
    uv run run-project --list           # list every project
    uv run run-project --install-all    # install every dependency, then exit

Missing dependencies are installed automatically before a project runs, so
`uv run run-project "Snake Game"` is a complete one-command setup + run.
"""

from __future__ import annotations

import argparse
import importlib.util
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent

# Make output safe on legacy console encodings (e.g. Windows cp1252).
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(errors="replace")
    except (AttributeError, ValueError):
        pass

# --------------------------------------------------------------------------
# Project manifest — (name, category, folder, main file, dependencies)
# Kept in sync with the showcase in index.html.
# --------------------------------------------------------------------------
PROJECTS = [
    # ------------------------------ Games ------------------------------
    ("Flappy Bird", "games", "Games/Flappy Bird Game", "main.py", ["pygame"]),
    ("Hangman", "games", "Games/hangman", "main.py", ["pygame"]),
    ("Ping Pong", "games", "Games/ping pong", "main.py", ["pygame"]),
    ("Rock Paper Scissors", "games", "Games/rms", "main.py", []),
    ("Snake Game", "games", "Games/Snake Game", "main.py", ["pygame"]),
    ("Snake Game 2", "games", "Games/snake game 2", "main.py", ["pygame"]),

    # --------------------- Cartoons & Portraits ------------------------
    ("Doraemon", "cartoon", "Turtle/character", "Doraemon.py", []),
    ("Doraemon 2", "cartoon", "Turtle/character", "Doraemon2.py", []),
    ("Draw Rose", "cartoon", "Turtle/character", "Draw Rose.py", []),
    ("Pikachu", "cartoon", "Turtle/character", "Pikachu.py", []),
    ("Radha-Krishna", "cartoon", "Turtle/character", "Radha-krishna.py", []),
    ("Radha-Krishna 2", "cartoon", "Turtle/character", "Radha-Krishna2.py", []),
    ("Shinchan", "cartoon", "Turtle/character", "Shinchan.py", []),
    ("Shinchan 2", "cartoon", "Turtle/character", "Shinchan2.py", []),
    ("Iron Man", "cartoon", "Turtle/character", "ironman.py", []),
    ("Spider Mask", "cartoon", "Turtle/character", "spidermask.py", []),
    ("Friends Intro", "cartoon", "Friends intro", "application.py", []),
    ("Hanuman Ji", "cartoon", "Turtle/HanumanJi", "hanumanji.py", ["opencv-python", "svgpathtools", "numpy", "tqdm"]),
    ("Iron Man (RDJ)", "cartoon", "Turtle/ironman", "main.py", ["sketchpy"]),
    ("Shiva Sketch", "cartoon", "Turtle/Shiva Sketch", "main.py", ["opencv-python", "matplotlib", "numpy"]),
    ("Itachi Sketch", "cartoon", "Turtle/Itachi Sketch", "main.py", ["opencv-python", "matplotlib", "numpy"]),
    ("Chhatrapati Shivaji Maharaj", "cartoon", "Turtle/Chattrapati Shivaji Maharaj", "Chattrapati Shivaji Maharaj.py", []),

    # ------------------------- Designs & Logos -------------------------
    ("Hexagon Spiral", "design", "Turtle/design", "HexagonSpiral.py", []),
    ("Spiral Design", "design", "Turtle/design", "SpiralDesign.py", []),
    ("Square Spirograph", "design", "Turtle/design", "Square Spirograph.py", []),
    ("Vibrant Circle", "design", "Turtle/design", "VibrantCircle.py", []),
    ("Circle Pattern", "design", "Turtle/design", "circle.py", []),
    ("Heart", "design", "Turtle/design", "heart.py", []),
    ("Line Flower", "design", "Turtle/design", "line flower.py", []),
    ("Rainbow Flower", "design", "Turtle/design", "rainbow flower.py", []),
    ("Rainbow Star", "design", "Turtle/design", "rainbowstar.py", []),
    ("Tesla Logo", "design", "Turtle/logos", "Tesla.py", []),
    ("Avengers Logo", "design", "Turtle/logos", "avengers.py", []),

    # ----------------------- Festival Animations -----------------------
    ("Happy Diwali", "festival", "Turtle/Happy Diwali", "application.py", []),
    ("Happy Holi", "festival", "Turtle/Happy Holi", "application.py", []),
    ("Merry Christmas", "festival", "Turtle/Merry Christmas", "application.py", []),
    ("Night Sky", "festival", "Turtle/Night Sky", "application.py", []),
    ("Republic Day", "festival", "Turtle/Republic Day", "application.py", []),

    # ----------------------------- Utilities ---------------------------
    ("Calculator", "utility", "Calculator", "Main.py", []),
    ("Calendar", "utility", "calender", "calender.py", []),
    ("Love Calculator", "utility", "Love Calculator", "main.py", []),
    ("XLSX to CSV", "utility", "xlsx to csv", "main.py", ["pandas"]),

    # ----------------------------- Security ----------------------------
    ("Hash to Password", "security", "Passwd Cracker/hash to password", "main.py", []),
    ("Password Cracker", "security", "Passwd Cracker/passwd cracker", "main.py", ["pyautogui"]),
    ("WiFi Password Cracker", "security", "Passwd Cracker/wifi password cracker", "main.py", []),

    # -------------------------- Computer Vision -------------------------
    ("Face Recognition", "vision", "Face Recognition", "face recognition.py", ["opencv-python"]),
]

# Category order + labels for the picker (mirrors index.html).
CATS = [
    ("games", "Games"),
    ("cartoon", "Cartoons & Portraits"),
    ("design", "Designs & Logos"),
    ("festival", "Festival Animations"),
    ("utility", "Utilities"),
    ("security", "Security"),
    ("vision", "Computer Vision"),
]

# pip package name -> importable module name (used for the "is it installed?" check).
MODULE_NAMES = {
    "opencv-python": "cv2",
    "pygame": "pygame",
    "numpy": "numpy",
    "matplotlib": "matplotlib",
    "svgpathtools": "svgpathtools",
    "svg.path": "svg.path",
    "tqdm": "tqdm",
    "sketchpy": "sketchpy",
    "pandas": "pandas",
    "pyautogui": "pyautogui",
    "Pillow": "PIL",
}

ALL_DEPS = sorted({d for _, _, _, _, deps in PROJECTS for d in deps})


def module_name(pkg: str) -> str:
    return MODULE_NAMES.get(pkg, pkg)


def is_installed(pkg: str) -> bool:
    try:
        return importlib.util.find_spec(module_name(pkg)) is not None
    except (ModuleNotFoundError, ValueError):
        return False


# Packages that must be installed with --no-deps: sketchpy lists the stdlib
# `turtle` module as a PyPI dependency, but the dummy `turtle` package was
# removed from PyPI, so pip/uv can't resolve it. turtle ships with Python, so
# installing sketchpy alone is enough — its other (real) dependencies are
# installed explicitly from its metadata, see _real_deps().
NO_DEPS = {"sketchpy"}


def _real_deps(pkg: str) -> list[str]:
    """Real, installable dependencies of `pkg`, read from its PyPI metadata.

    Installing with --no-deps skips *everything*, but packages like sketchpy
    genuinely need most of their declared dependencies (geocoder, geopy,
    requests, ...) at runtime. Only the unavailable ones — the dummy `turtle`
    package — should stay skipped. Returns [] if metadata isn't available yet.
    """
    try:
        import importlib.metadata as md
        reqs = md.requires(pkg) or []
    except md.PackageNotFoundError:
        return []
    deps = []
    for req in reqs:
        name = req.split()[0].split("[")[0]
        if name.lower() == "turtle":
            continue
        deps.append(name)
    return deps


def _installer() -> list[str]:
    """Command prefix for installing into the active environment.

    uv-created virtualenvs don't bundle pip, so prefer `uv pip install`
    (which targets the venv `uv run` activates) and only fall back to
    `python -m pip` when pip is actually available.
    """
    if importlib.util.find_spec("pip") is not None:
        return [sys.executable, "-m", "pip", "install"]
    return ["uv", "pip", "install"]


def install(deps: list[str]) -> None:
    missing = [d for d in deps if not is_installed(d)]
    # Even when a --no-deps package is already installed, its real
    # dependencies may still be missing (e.g. geocoder for sketchpy).
    for dep in deps:
        if dep in NO_DEPS:
            missing += [d for d in _real_deps(dep) if not is_installed(d)]
    missing = list(dict.fromkeys(missing))
    if not missing:
        return
    print(f"Installing missing dependencies: {', '.join(missing)}")
    for dep in missing:
        cmd = _installer()
        if dep in NO_DEPS:
            cmd.append("--no-deps")
        cmd.append(dep)
        subprocess.check_call(cmd)
    # A --no-deps package freshly installed above skipped its real
    # dependencies; install them now that its metadata is available.
    for dep in missing:
        if dep in NO_DEPS:
            install(_real_deps(dep))


def find_by_name(query: str):
    """Return the project matching `query`, preferring an exact name match."""
    q = query.strip().lower()
    for p in PROJECTS:
        if p[0].lower() == q:
            return p
    matches = [p for p in PROJECTS if q in p[0].lower()]
    if len(matches) == 1:
        return matches[0]
    if len(matches) > 1:
        print("Multiple matches: " + ", ".join(p[0] for p in matches) + " - be more specific.")
    return None


def list_projects() -> None:
    for cat, label in CATS:
        print(f"\n{label}")
        for name, c, folder, main, deps in PROJECTS:
            if c != cat:
                continue
            dep_str = ", ".join(deps) if deps else "stdlib only"
            print(f"  {name:<28} {folder}/{main}  [{dep_str}]")


def picker():
    """Interactive numbered picker; returns a project or None to quit."""
    n = 0
    for cat, label in CATS:
        print(f"\n{label}")
        for name, c, *_ in PROJECTS:
            if c == cat:
                n += 1
                print(f"  {n:>2}. {name}")
    while True:
        try:
            raw = input("\nEnter a number or name (q to quit): ").strip()
        except (EOFError, KeyboardInterrupt):
            print()
            return None
        if raw.lower() in ("q", "quit", ""):
            return None
        if raw.isdigit():
            idx = int(raw) - 1
            if 0 <= idx < len(PROJECTS):
                return PROJECTS[idx]
        else:
            match = find_by_name(raw)
            if match is not None:
                return match
        print("Unknown choice — try again.")


def run_project(project) -> int:
    name, _, folder, main, deps = project
    path = ROOT / folder / main
    if not path.exists():
        print(f"Project file not found: {path}")
        return 1
    print(f"\n>> Running {name}  ({path.relative_to(ROOT)})\n")
    return subprocess.call([sys.executable, str(path)], cwd=ROOT / folder)


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(
        prog="run-project",
        description="Install dependencies and run any project in this repo — one command.",
    )
    ap.add_argument("name", nargs="?", help="project name (exact or partial, case-insensitive)")
    ap.add_argument("--list", action="store_true", help="list every project and exit")
    ap.add_argument("--install-all", action="store_true", help="install every dependency and exit")
    args = ap.parse_args(argv)

    if args.list:
        list_projects()
        return 0
    if args.install_all:
        install(ALL_DEPS)
        print("All dependencies are installed.")
        return 0

    project = None
    if args.name:
        project = find_by_name(args.name)
        if project is None:
            print(f"No unique project matching {args.name!r}. Use --list to see all projects.")
            return 1
    else:
        project = picker()
        if project is None:
            return 0

    install(project[4])
    return run_project(project)


if __name__ == "__main__":
    sys.exit(main())
