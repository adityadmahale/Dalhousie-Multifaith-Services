from djoser.serializers import UserSerializer as BaseUserSerializer
from djoser.serializers import (
    UserCreateSerializer as BaseUserCreateSerializer,
)
from rest_framework import serializers
from .models import UserImage


# Serializer for uploaded user image
class UserImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserImage
        fields = ["id", "image", "user"]


# Used when a user creates a profile
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


# Used to retrieve user data
class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ["id", "email", "first_name", "last_name", "is_staff"]
