# Generated by Django 3.1.2 on 2020-10-12 12:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Machine',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32)),
            ],
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('time', models.SmallIntegerField()),
                ('cancelCode', models.CharField(max_length=64)),
                ('owner', models.CharField(max_length=64)),
                ('machine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='laundry.machine')),
            ],
            options={
                'unique_together': {('date', 'time', 'machine')},
            },
        ),
    ]
