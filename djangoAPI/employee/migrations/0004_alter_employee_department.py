# Generated by Django 3.2.6 on 2021-08-17 22:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0003_auto_20210806_1728'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='department',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='employee.department'),
        ),
    ]
