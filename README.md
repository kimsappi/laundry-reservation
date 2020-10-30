# About
Configurable common laundry room reservation app (WIP).

# Requirements
* Python >= 3.6, possibly even newer
* Access to a Postgres server (can use a different server with slight modifications)
* Postgres client
* `npm` or `yarn`
* Major dependencies:
  * Django
  * React

# Instructions
First edit `config.json` and `.env.edit` (see **Configuration**), then:
```shell
./exportconfig.sh

# Optional block
python3 -m venv env
source env/bin/activate

pip3 install -r requirements.txt
python3 backend/manage.py migrate
python3 backend/manage.py runserver
```
Because the project is not yet at the point where an actual deployment would be feasible, open a different shell and:
```shell
cd frontend
yarn install
yarn start
```

# Configuration
## env.edit
* `SECRET_KEY`: secret key used by Django
* `DEBUG`: should be `off`, can be `on` for development
* `DATABASE_URL`: Postgres URL containing all credentials required to access database

## config.json
* `dayCount` <int>: Number of days to be displayed at once
* ~~`maxReservations` <int>: Currently unused~~
* `firstSlot` <int>: Time of morning when laundry room is first open
* `lastSlot` <int>: Time of night (24-hour clock) when last slot should start
* `ownerDelimiter` <str>: Field delimiter for the `owner` string in the database and displays
* `timezone` <str>: Time zone. Using tz names is the best option, e.g. 'Europe/Helsinki'
* `machines` <Array<Object>>: Array consisting of objects with the following keys
  * `fullName` <str>: Full display name of the reservable object in question, no length considerations, e.g. 'Washing machine 1'
  * `shorthand` <str>: This should be a short form representation of `fullName` for preserving grid display, e.g. 'W1'
* `apartments` <Object>: An object/dict containing key-value pairs:
  * key <str>: Identifier for a collection of apartments, e.g. stairwell or building, e.g. 'A' or '13 B' or 'High Street 4'
  * value <Array<str>>: Identifier for a unique apartment within the collection, e.g. '1' or 'B 5'

# Notes to self
## Django workflow
### Creating a project + adding an app
```shell
django-admin startproject $mysite
cd $mysite
python manage.py startapp $myapp
# 1. Create views in $myapp/views.py
# 2. Add urlpatterns to $myapp/urls.py
# 3. Include in $mysite/urls.py
```

### Creating models
#### Run once to initialise DB
`python manage.py migrate`

#### Include DB changes to main app
First edit `$mysite/settings.py` `INSTALLED_APPS` to include a path to `$myapp.apps.$AppConfig`. (Adding `__str__` methods is really helpful, possibly required(?).)
```shell
python manage.py makemigrations $myapp
python manage.py sqlmigrate $myapp $0001
python manage.py migrate
```

#### Creating new instance
```python
from $myapp.models import $ModelName
x = $ModelName(
  a='123',
  b=123
)
x.save()

$ModelName.objects.all()
<QuerySet [<$ModelName: $ModelName object (1)>]>
```
