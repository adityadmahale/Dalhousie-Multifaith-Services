# Generated by Django 4.0.3 on 2022-03-31 23:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dmsfront', '0004_timesheet'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timesheet',
            name='end_time',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='timesheet',
            name='start_time',
            field=models.CharField(max_length=150),
        ),
    ]
