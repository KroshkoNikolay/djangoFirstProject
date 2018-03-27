# Generated by Django 2.0.3 on 2018-03-27 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(db_column='first_name', max_length=30)),
                ('last_name', models.CharField(db_column='last_name', max_length=30, null=True)),
                ('email', models.EmailField(db_column='email', max_length=30, unique=True)),
                ('birth_date', models.DateField(db_column='birth_date')),
                ('created_at', models.DateField(auto_now_add=True, db_column='created_at')),
                ('updated_at', models.DateField(auto_now=True, db_column='updated_at')),
            ],
        ),
    ]