#!/usr/bin/env python3
"""run-all — one script for ALL projects in this repo.

Tells you, for every project, whether it is ready to run — or not — and can
also run every project one by one.

Usage:
    uv run run-all               # status check for every project (default)
    uv run run-all --run         # actually run every project, one by one
    uv run run-all --install     # install every dependency first, then check
    uv run run-all "Snake Game"  # status check for just one project

Notes
-----
* The project list is imported from run_project.py (single source of truth).
* In --run mode, GUI/turtle projects open a window and block until you close
  it, then the next project starts. Console projects run to completion.
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

# Project manifest + helpers live in run_project.py — reuse them, don't copy.
from run_project import PROJECTS, ROOT, install, is_installed

# Make output safe on legacy console encodings (e.g. Windows cp1252).
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(errors="replace")
    except (AttributeError, ValueError):
        pass

OK, BAD = "✓", "✗"


def project_status(project):
    """Return (ok: bool, reasons: list[str]) for one project."""
    name, _, folder, main, deps = project
    reasons = []
    path = ROOT / folder / main
    if not path.exists():
        reasons.append(f"main file missing: {folder}/{main}")
    missing = [d for d in deps if not is_installed(d)]
    if missing:
        reasons.append("missing dependencies: " + ", ".join(missing))
    return (not reasons), reasons


def check(projects, verbosity: int = 1) -> int:
    """Print whether each project is ready to run; return count of failures."""
    ready = not_ready = 0
    for project in projects:
        name = project[0]
        ok, reasons = project_status(project)
        if ok:
            ready += 1
            print(f"{OK} {name:<28} ready to run")
        else:
            not_ready += 1
            if verbosity >= 1:
                print(f"{BAD} {name:<28} NOT ready — " + "; ".join(reasons))
            else:
                print(f"{BAD} {name}")
    print(f"\n{ready} ready to run, {not_ready} not ready (out of {len(projects)}).")
    return 1 if not_ready else 0


def run_all(projects) -> int:
    """Run every project one by one; report per-project result and exit code."""
    print(f"Running {len(projects)} projects one by one — close each window to continue.\n")
    failed = []
    for i, project in enumerate(projects, 1):
        name, _, folder, main, deps = project
        install(deps)  # same auto-install behaviour as run-project
        path = ROOT / folder / main
        print(f"\n[{i}/{len(projects)}] {name}  ({folder}/{main})")
        if not path.exists():
            print(f"{BAD} skipped — main file missing")
            failed.append(name)
            continue
        print(f"  >> running (exit with code 0 = ran fine, anything else = problem) ...")
        rc = subprocess.call([sys.executable, str(path)], cwd=ROOT / folder)
        if rc == 0:
            print(f"{OK} {name} ran fine (exit 0)")
        else:
            print(f"{BAD} {name} exited with code {rc}")
            failed.append(name)

    print("\n" + "=" * 50)
    if failed:
        print(f"Finished: {len(projects) - len(failed)}/{len(projects)} ran fine. Problems: {', '.join(failed)}")
        return 1
    print(f"Finished: all {len(projects)} projects ran fine.")
    return 0


def pick(projects, query: str):
    """Filter projects by a name substring; exit if nothing matches."""
    q = query.strip().lower()
    matches = [p for p in projects if q in p[0].lower() or q in p[2].lower()]
    if not matches:
        print(f"No project matches {query!r}. Use --list to see all projects.")
        sys.exit(1)
    return matches


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(
        prog="run-all",
        description="One script for all projects — check if each is ready to run, or run them all.",
    )
    ap.add_argument("name", nargs="?", help="filter to projects whose name/folder contains this text")
    ap.add_argument("--run", action="store_true", help="run every project one by one instead of just checking")
    ap.add_argument("--install", action="store_true", help="install every dependency first")
    ap.add_argument("--list", action="store_true", help="list every project and exit")
    ap.add_argument("-q", "--quiet", action="store_true", help="status check: only show NOT ready projects")
    args = ap.parse_args(argv)

    if args.list:
        for name, _, folder, main, deps in PROJECTS:
            dep_str = ", ".join(deps) if deps else "stdlib only"
            print(f"{name:<28} {folder}/{main}  [{dep_str}]")
        return 0

    if args.install:
        install(sorted({d for _, _, _, _, deps in PROJECTS for d in deps}))
        print("All dependencies are installed.")

    projects = PROJECTS
    if args.name:
        projects = pick(projects, args.name)

    if args.run:
        return run_all(projects)
    return check(projects, verbosity=0 if args.quiet else 1)


if __name__ == "__main__":
    sys.exit(main())
