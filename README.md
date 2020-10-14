# laundry-reservation

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
