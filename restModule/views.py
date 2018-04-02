from django.shortcuts import render
from .models import Users
from rest_framework import viewsets
from .serializers import UserSerializer


def index(request):
    return render(request, 'restlist/index.html')


class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
