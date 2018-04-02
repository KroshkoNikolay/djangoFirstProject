from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'', views.UserViewSet)

urlpatterns = [
    url(r'^users/', include(router.urls)),
    path('', views.index, name='index'),
]
