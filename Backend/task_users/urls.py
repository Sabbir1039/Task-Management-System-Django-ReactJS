# urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from task_users.views import UserCreateView, LoginView, CustomUserRetriveUpdateDestroyApiView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', CustomUserRetriveUpdateDestroyApiView, basename='user')

urlpatterns = [
    path('api/register/', UserCreateView.as_view(), name='create_user'),
    path('api/login/', LoginView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += router.urls