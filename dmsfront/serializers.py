from rest_framework import serializers
from datetime import datetime, timedelta
from django.db.models import Q
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
    booked_slots = serializers.SerializerMethodField()

    class Meta:
        model = Chaplain
        fields = ["id", "user_id", "phone", "religion", "description",
                  "user", "booked_slots"]

    def get_booked_slots(self, obj):
        booked_slots = Appointment.objects.all()
        booked_slots = booked_slots.filter(chaplain_id=obj.user_id)
        lastfriday = datetime.now()
        curfriday = datetime.now()
        lastfriday -= timedelta(1)
        while curfriday.weekday() != 4:
            curfriday += timedelta(1)
        while(lastfriday.weekday() != 4):
            lastfriday -= timedelta(1)
        current_friday = curfriday.strftime("%Y-%m-%d %H:%M:%S")
        current_friday = current_friday[:10]+" 15:00:00.00000"
        last_friday = lastfriday.strftime("%Y-%m-%d %H:%M:%S")
        last_friday = last_friday[:10]+" 15:00:00.00000"
        booked_slots = booked_slots.filter(
            slot__gt=last_friday,
            slot__lt=current_friday
        )
        booked_slots = booked_slots.filter(~Q(status="cancelled"))
        return booked_slots.count()


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
