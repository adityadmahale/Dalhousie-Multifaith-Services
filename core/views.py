import json
from rest_framework.views import Response, APIView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import UserImageSerializer
from .models import User


@csrf_exempt
@api_view(["PUT"])
def recovery(request):
    body = json.loads(request.body.decode("utf-8"))
    user = User.objects.filter(email=body["email"]).first()
    if not user:
        return Response(
            {
                "email": [
                    "user with this email address does not "
                    "exist in the database."
                ]
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
    user.set_password(body["password"])
    user.save()
    return Response({}, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(["PUT"])
def update_name(request):
    body = json.loads(request.body.decode("utf-8"))
    if (
        "user_id" not in body
        or "first_name" not in body
        or "last_name" not in body
    ):
        return Response(
            {
                "error": [
                    "Missing required fields user_id, first_name, last_name."
                ]
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = User.objects.filter(id=body["user_id"]).first()
    if not user:
        return Response(
            {"user_id": ["User ID is incorrect."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user.first_name = body["first_name"]
    user.last_name = body["last_name"]
    user.save(update_fields=["first_name", "last_name"])
    return Response({}, status=status.HTTP_200_OK)


class UserImageView(APIView):
    def post(self, request):
        serializer = UserImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
