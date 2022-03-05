from django.shortcuts import get_object_or_404
from rest_framework.views import APIView, Response
from rest_framework import status

from dmsfront.models import DalUser, Chaplain
from .serializers import DalUserSerializer, ChaplainSerializer


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
        queryset = Chaplain.objects.select_related('user').all()
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
