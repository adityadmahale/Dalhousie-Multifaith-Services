from rest_framework import serializers
from core.serializers import UserCreateSerializer, UserSerializer
from .models import Appointment, DalUser, Chaplain, Event, TimeSheet


class DalUserSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    user = UserCreateSerializer(read_only=True)

    class Meta:
        model = DalUser
        fields = ["id", "user_id", "phone", "user"]


class ChaplainSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    user = UserCreateSerializer(read_only=True)

    class Meta:
        model = Chaplain
        fields = ["id", "user_id", "phone", "religion", "description", "user"]


class UserInfoSeriaizer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = DalUser
        fields = ["user"]


class ChaplinInfoSeriaizer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = DalUser
        fields = ["user"]


class AppointmentSerializer(serializers.ModelSerializer):
    slot = serializers.DateTimeField()
    status = serializers.CharField(max_length=255)
    daluser = UserInfoSeriaizer(source="user_id", read_only=True)
    chaplain = ChaplinInfoSeriaizer(source="chaplain_id", read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id",
            "user_id",
            "chaplain_id",
            "slot",
            "status",
            "daluser",
            "chaplain",
        ]


class TimeSheetSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=150)
    start_time = serializers.DateTimeField()
    end_time = serializers.DateTimeField()

    class Meta:
        model = TimeSheet
        fields = [
            "chaplain_id",
            "title",
            "start_time",
            "end_time",
        ]


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"
