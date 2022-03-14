from django.shortcuts import get_object_or_404
from rest_framework.views import APIView, Response
from rest_framework import status
from rest_framework.decorators import api_view
from dmsfront.models import DalUser, Chaplain, Appointment, Event
from .serializers import (
    DalUserSerializer,
    ChaplainSerializer,
    AppointmentSerializer,
    EventSerializer
)


class DalUserList(APIView):
    def post(self, request):
        serializer = DalUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class DalUserDetail(APIView):
    def get(self, request, id):
        dal_user = get_object_or_404(DalUser, user_id=id)
        serializer = DalUserSerializer(dal_user)
        return Response(serializer.data)

    def put(self, request, id):
        dal_user = get_object_or_404(DalUser, user_id=id)
        serializer = DalUserSerializer(dal_user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ChaplainList(APIView):
    def get(self, request):
        queryset = Chaplain.objects.select_related("user").all()
        serializer = ChaplainSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ChaplainSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ChaplainDetail(APIView):
    def get(self, request, id):
        dal_user = get_object_or_404(Chaplain, user_id=id)
        serializer = ChaplainSerializer(dal_user)
        return Response(serializer.data)

    def put(self, request, id):
        dal_user = get_object_or_404(Chaplain, user_id=id)
        serializer = ChaplainSerializer(dal_user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserAppointmentList(APIView):
    def post(self, request):
        serializer = AppointmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AppointmentList(APIView):
    def get(self, request, user_id, chaplain_id):
        queryset = Appointment.objects.all()
        if user_id != 0:
            queryset = queryset.filter(user_id=user_id)
        if chaplain_id != 0:
            queryset = queryset.filter(chaplain_id=chaplain_id)
        serializer = AppointmentSerializer(queryset, many=True)
        return Response(serializer.data)


class UserAppointmentDetails(APIView):
    def put(self, request, id):
        appointment = get_object_or_404(Appointment, pk=id)
        serializer = AppointmentSerializer(appointment, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


@api_view(['GET'])
def get_events(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_event(request):
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def get_event(request, id):
    event = Event.objects.filter(id=id)
    serializer = EventSerializer(event, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def book_event(request, id):
    event = get_object_or_404(Event, id=id)
    data = {"available_seats": event.available_seats - 1}
    serializer = EventSerializer(event, data=data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
