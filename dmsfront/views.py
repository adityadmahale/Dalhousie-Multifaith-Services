from django.shortcuts import get_object_or_404
from rest_framework.views import APIView, Response
from rest_framework import status
from dmsfront.models import DalUser, Chaplain, Appointment
from .serializers import (
    DalUserSerializer,
    ChaplainSerializer,
    AppointmentSerializer,
)


class DalUserList(APIView):
    def post(self, request):
        serializer = DalUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class DalUserDetail(APIView):
    def get(self, request, id):
        dal_user = get_object_or_404(DalUser, pk=id)
        serializer = DalUserSerializer(dal_user)
        return Response(serializer.data)

    def put(self, request, id):
        dal_user = get_object_or_404(DalUser, pk=id)
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
        dal_user = get_object_or_404(Chaplain, pk=id)
        serializer = ChaplainSerializer(dal_user)
        return Response(serializer.data)

    def put(self, request, id):
        dal_user = get_object_or_404(Chaplain, pk=id)
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
