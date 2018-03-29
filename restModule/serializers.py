from .models import Users
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'first_name', 'last_name', 'email', 'birth_date')
