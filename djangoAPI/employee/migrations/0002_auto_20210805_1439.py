# Generated by Django 3.2.6 on 2021-08-05 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='department',
        ),
        migrations.AlterField(
            model_name='employee',
            name='date_of_joining',
            field=models.DateField(auto_now_add=True),
        ),
    ]
