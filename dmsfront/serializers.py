from rest_framework import serializers

from core.serializers import UserCreateSerializer
from .models import DalUser, Chaplain


class DalUserSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    user = UserCreateSerializer(read_only=True)

    class Meta:
        model = DalUser
        fields = ['id', 'user_id', 'phone', 'user']


class ChaplainSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    user = UserCreateSerializer(read_only=True)

    class Meta:
        model = Chaplain
        fields = ['id', 'user_id', 'phone', 'religion', 'description', 'user']
