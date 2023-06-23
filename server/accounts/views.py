# IMPORTS
from .models import User
from .serializers import UserSerializer
from django.contrib.auth import get_user_model, authenticate
from rest_framework import status
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token


# SIGNUP VIEW
class SignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        User = get_user_model()
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]

            if User.objects.filter(email=email).exists():
                return Response(
                    data={"message": "Email already exists"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            user = serializer.save()
            return Response(
                data={"message": "Your account has been registered now."},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                data=serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )


# LOGIN VIEW
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        User = get_user_model()
        email = request.data.get("email")
        password = request.data.get("password")

        if email and password:
            user = authenticate(request, email=email, password=password)
            if user is not None:
                token, _ = Token.objects.get_or_create(user=user)
                return Response(
                    data={"token": token.key, "email": user.email},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    data={"message": "Invalid email or password"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
        else:
            return Response(
                data={"message": "Please provide both email and password"},
                status=status.HTTP_400_BAD_REQUEST,
            )
