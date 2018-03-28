from django.urls import path

from .views import *

urlpatterns = [
    path('', index, name='show'),
    path('<int:user_id>/', detail, name='detail'),
    path('<int:user_id>/edit/', edit, name='edit'),
    path('create/', create, name='create')
]