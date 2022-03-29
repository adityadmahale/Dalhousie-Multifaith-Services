from djoser.serializers import UserSerializer as BaseUserSerializer
from djoser.serializers import (
    UserCreateSerializer as BaseUserCreateSerializer,
)
from rest_framework import serializers
from .models import UserImage


class UserImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserImage
        fields = ["id", "image", "user"]


class UserCreateSerializer(BaseUserCreateSerializer):
    image = UserImageSerializer(read_only=True)

    class Meta(BaseUserCreateSerializer.Meta):
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "password",
            "is_staff",
            "image",
        ]


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ["id", "email", "first_name", "last_name", "is_staff"]
