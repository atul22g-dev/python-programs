# Python ver :-)

```
python 3.10.9 (64-bit)
```

## Install virtualenv

```
pip install virtualenv
```

## Initial virtualenv

```
virtualenv project_name
```

## Before Activate virtualenv

### powershell run as admin

```
set-executionpolicy remotesigned
```

```
y
```

## Activate virtualenv

```
cd .\Scripts\
```

```
 .\activate
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
