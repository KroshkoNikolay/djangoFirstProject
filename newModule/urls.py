from django.urls import path

from .views import *

urlpatterns = [
    path('', index, name='show'),
    path('<int:user_id>/', detail, name='detail')
]