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


@extend_schema_view(
    post=extend_schema(
        summary="Sign up",
        description = "API endpoint for user registration. Returns id, username, email, birth_date, address and image upon successful registration.",
        request=CustomUserSerializer,
        responses={
            201: OpenApiResponse(
                description="Successful registration",
                response=CustomUserSerializer,
                examples=[
                    OpenApiExample(
                        "Successful response",
                        value = {
                            "id" : 123,
                            "username" : "John Doe",
                            "email" : "johndoe@mail.com",
                            "birth_date" : "2000-12-31",
                            "address" : "New York",
                            "image" : "http://....."
                        },
                    )
                ]
            ),
            400: OpenApiResponse(
                description="Validation error",
                examples=[
                    OpenApiExample(
                        "Missing fields",
                        value={
                            "detail": "Validation error.",
                            "errors": {
                                "username": ["This field is required."],
                                "email": ["This field is required."],
                                "password": ["This password is too short. It must contain at least 8 characters."]
                            }
                        }
                    ),
                    OpenApiExample(
                        "Existing user",
                        value={
                            "detail": "Validation error.",
                            "errors": {
                                "email": ["A user with this email address already exists."]
                            }
                        }
                    )
                ]
            )
        }
    )
)
class UserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)



@extend_schema_view(
    get=extend_schema(
        summary="Retrieve User Details",
        description="Fetch details of the currently authenticated user.",
        responses={
            200: OpenApiResponse(
                description="Successfully retrieved user details",
                examples=[
                    OpenApiExample(
                        name="Successful Response",
                        value={
                            "id": 1,
                            "username": "john_doe",
                            "email": "john@example.com",
                            "birth_date" : "2000-12-31",
                            "address" : "NY",
                            "image" : "http://....."
                        }
                    )
                ]
            ),
            401: OpenApiResponse(
                description="Authentication credentials were not provided or are invalid."
            ),
        },
    ),
    put=extend_schema(
        summary="Update User Details",
        description="Update the details of the currently authenticated user.",
        request=CustomUserSerializer,
        responses={
            200: OpenApiResponse(
                description="Successfully updated user details",
                examples=[
                    OpenApiExample(
                        name="Successful Update",
                        value={
                            "id": 1,
                            "username": "john_doe",
                            "email": "john@example.com",
                            "birth_date" : "2000-12-31",
                            "address" : "NY",
                            "image" : "http://....."
                        }
                    )
                ]
            ),
            400: OpenApiResponse(
                description="Validation error or invalid input",
                examples=[
                    OpenApiExample(
                        name="Validation Error",
                        value={
                            "email": ["Enter a valid email address."]
                        }
                    )
                ]
            ),
            401: OpenApiResponse(
                description="Authentication credentials were not provided or are invalid."
            ),
        },
    ),
    patch=extend_schema(
        summary="Partially Update User Details",
        description="Partially update the details of the currently authenticated user. Only send the fields you wish to update.",
        request=CustomUserSerializer,
        responses={
            200: OpenApiResponse(
                description="Successfully updated user details",
                examples=[
                    OpenApiExample(
                        name="Partial Update",
                        value={
                            "id": 1,
                            "username": "john_doe",
                            "email": "john@example.com",
                            "birth_date" : "2000-12-31",
                            "address" : "NY",
                            "image" : "http://....."
                        }
                    )
                ]
            ),
            400: OpenApiResponse(
                description="Validation error or invalid input",
                examples=[
                    OpenApiExample(
                        name="Validation Error",
                        value={
                            "email": ["Enter a valid email address."]
                        }
                    )
                ]
            ),
            401: OpenApiResponse(
                description="Authentication credentials were not provided or are invalid."
            ),
        },
    ),
    delete=extend_schema(
        summary="Delete User Account",
        description="Delete the account of the currently authenticated user.",
        responses={
            204: OpenApiResponse(
                description="Successfully deleted the user account."
            ),
            401: OpenApiResponse(
                description="Authentication credentials were not provided or are invalid."
            ),
        },
    )
)
class CustomUserRetriveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    
