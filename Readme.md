# Python ver :-
```
python 3.10.11 (64-bit)
```

# Create a virtualenv

## Using uv (Latest) Like Npm

## Install uv
```
pip install uv
```

## Initial uv
```
uv init <project_name>
```

## Run the project
```
uv run <main_file_name>.py
```
## Install Any Package
```
uv add <package_name>
```

## Using virtualenv

## Install virtualenv
```
pip install virtualenv
```

## Initial virtualenv
```
virtualenv .venv
```

# Before Activate virtualenv

### powershell run as admin
```
set-executionpolicy remotesigned
```
```
y
```

## Activate virtualenv
```
.\.venv\Scripts\Activate.ps1
```

## Diactivate virtualenv
```
deactivate
```

## Initial requirments.text
```
pip freeze > requirements.txt
```

## Intall all packages by requirments.text
```
pip install -r .\requirements.txt
```

## Start a project 
```
python Main.py
```

# Pyinstaller
## Install
```
pip install pyinstaller
```

## Create .exe
```
pyinstaller your_program.py
```

## Create .exe in one file
```
pyinstaller --onefile your_program.py
```
