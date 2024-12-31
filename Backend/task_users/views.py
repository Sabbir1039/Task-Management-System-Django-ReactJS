from task_users.serializers import CustomUserSerializer, MyTokenObtainPairSerializer
from task_users.models import CustomUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiResponse, OpenApiExample

@extend_schema_view(
    post=extend_schema(
        summary="Sign in",
        description="API endpoint for user authentication using email and password. Returns user_id, access and refresh tokens upon successful authentication.",
        request=MyTokenObtainPairSerializer,
        responses={
            200: OpenApiResponse(
                description="Successful login",
                response=MyTokenObtainPairSerializer,
                examples=[
                    OpenApiExample(
                        "Successful response",
                        value = {
                            "access" : "ahaksdaskdnasjkdbasldasd...",
                            "refresh" : "askdasdkln2e3ehjdnjdndk...",
                            "user_id" : 123
                        }
                    )
                ]
            ),
            400: OpenApiResponse(
                description="Invalid credentials",
                examples=[
                    OpenApiExample(
                        "Invalid Credentials",
                        value = {"detail": "No active account found with the given credentials"}
                    )
                ]
            )
        }
    )
)
class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CustomUserRetriveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    
