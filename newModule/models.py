from django.db import models

# Create your models here.


class Users(models.Model):
    first_name = models.CharField("first_name", max_length=30)
    last_name = models.CharField("last_name", null=True, max_length=30)
    email = models.EmailField("email", unique=True, max_length=30)
    birth_date = models.DateField("birth_date")
    created_at = models.DateTimeField("created_at", auto_now_add=True)
    updated_at = models.DateTimeField("updated_at", auto_now=True)

    class Meta:
        verbose_name = "User"
        app_label = "newModule"
        verbose_name_plural = "Users"
        db_table = 'Users'

    def __str__(self):
        return self.first_name
