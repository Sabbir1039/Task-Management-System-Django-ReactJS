# urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from task_users.views import UserCreateView, LoginView, CustomUserRetriveUpdateDestroyView

urlpatterns = [
    path('api/login/', LoginView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', UserCreateView.as_view(), name='create_user'),
    path('api/users/<int:pk>', CustomUserRetriveUpdateDestroyView.as_view(), name='user_retrive_update_destroy'),
]
