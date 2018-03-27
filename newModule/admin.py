from django.contrib import admin
from .models import *

# Register your models here.


class UsersAdmin(admin.ModelAdmin):
    model = Users
    exclude = ('created_at', 'updated_at')


admin.site.register(Users, UsersAdmin)
