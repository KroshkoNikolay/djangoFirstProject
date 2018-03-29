from django.urls import path

from .views import *

urlpatterns = [
    path('', index, name='show'),
    path('<int:user_id>/', detail, name='detail'),
    path('<int:user_id>/edit/', edit, name='edit'),
    path('<int:user_id>/delete/', delete, name='delete'),
    path('create/', create, name='create')
]