import json
from rest_framework.views import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework import status
from .models import User


@csrf_exempt
@api_view(['PUT'])
def recovery(request):
    body = json.loads(request.body.decode('utf-8'))
    user = User.objects.filter(email=body['email']).first()
    if not user:
        return Response({
            "email": [
                "user with this email address does not exist in the database."
            ]}, status=status.HTTP_400_BAD_REQUEST
        )
    user.set_password(body['password'])
    user.save()
    return Response({}, status=status.HTTP_200_OK)
