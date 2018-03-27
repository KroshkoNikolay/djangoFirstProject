# Generated by Django 2.0.3 on 2018-03-27 11:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newModule', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='users',
            options={'verbose_name': 'User', 'verbose_name_plural': 'Users'},
        ),
        migrations.AlterField(
            model_name='users',
            name='birth_date',
            field=models.DateField(verbose_name='birth_date'),
        ),
        migrations.AlterField(
            model_name='users',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, verbose_name='created_at'),
        ),
        migrations.AlterField(
            model_name='users',
            name='email',
            field=models.EmailField(max_length=30, unique=True, verbose_name='email'),
        ),
        migrations.AlterField(
            model_name='users',
            name='first_name',
            field=models.CharField(max_length=30, verbose_name='first_name'),
        ),
        migrations.AlterField(
            model_name='users',
            name='last_name',
            field=models.CharField(max_length=30, null=True, verbose_name='last_name'),
        ),
        migrations.AlterField(
            model_name='users',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, verbose_name='updated_at'),
        ),
        migrations.AlterModelTable(
            name='users',
            table='Users',
        ),
    ]