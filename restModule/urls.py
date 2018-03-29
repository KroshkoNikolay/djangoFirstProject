from django.conf.urls import url, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'', views.UserViewSet)

urlpatterns = [
    url(r'^users', include(router.urls)),
    url(r'^', views.index, name='index'),
]
