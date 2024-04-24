from django.urls import path, include
from .views import TaskViewSet
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path('api/tasks/', TaskViewSet.as_view(), name='task-list-create'),
    path('api/tasks/<int:pk>/', TaskViewSet.as_view(), name='task-detail-update-delete'),
]