from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import TaskSerializer
from .models import Task
from drf_spectacular.utils import extend_schema, OpenApiResponse

class TaskViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_object(self, pk):
        task = get_object_or_404(Task, pk=pk, author=self.request.user)
        serializer = TaskSerializer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @extend_schema(
        summary="Get tasks",
        description="Retrive a list of tasks for authenticated user",
        responses={
            200 : TaskSerializer(many=True),
            404: OpenApiResponse(description="Task not found")
        }
    )
    def list(self, request):
        try:
            queryset = Task.objects.filter(author=request.user)
            serializer = TaskSerializer(queryset ,many=True)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except Task.DoesNotExist:
            return Response("Cannot get tasks", status=status.HTTP_404_NOT_FOUND)
    
    
    @extend_schema(
        summary="Get a task",
        description="Retrive a task for authenticated user by it's id",
        responses={
            202: TaskSerializer,
            404: OpenApiResponse(description="Task not found")
        }
    )
    def retrive(self, request, pk=None):
        try:
            task = get_object_or_404(Task, pk=pk, author=request.user)
            serializer = TaskSerializer(task)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except Task.DoesNotExist:
            return Response("Cannot get task", status=status.HTTP_404_NOT_FOUND)

    
    @extend_schema(
        summary="Add a task",
        description="Create a new task for authenticated user",
        request=TaskSerializer,
        responses={
            201: TaskSerializer,
            400: OpenApiResponse(description="Validation error")
        }
    )
    def create(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    @extend_schema(
        summary="Update a task",
        description="Update a existing task for authenticated user",
        request=TaskSerializer,
        responses={
            200: TaskSerializer,
            400: OpenApiResponse(description="Validation error"),
            404: OpenApiResponse(description="Task not found")
        }
    )
    def update(self, request, pk=None):
        task = get_object_or_404(Task, pk=pk, author=request.user)
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    @extend_schema(
        summary="Delete a task",
        description="Delete a existing task for authenticated user",
        responses={
            202: OpenApiResponse(description="Task successfully deleted"),
            404: OpenApiResponse(description="Task not found")
        }
    )
    def destroy(self, request, pk=None):
        task = get_object_or_404(Task, pk=pk, author=request.user)
        try:
            task.delete()
            return Response("Successfully deleted", status=status.HTTP_204_NO_CONTENT)
        except:
            return Response("Cannot delete object", status=status.HTTP_400_BAD_REQUEST)
        
