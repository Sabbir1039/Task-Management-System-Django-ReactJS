from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import TaskSerializer
from .models import Task

class TaskViewSet(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_object(self, pk):
        task = get_object_or_404(Task, pk=pk, author=self.request.user)
        serializer = TaskSerializer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get(self, request, *args, **kwargs):
        if 'pk' in kwargs:
            obj = self.get_object(kwargs['pk'])
            return obj
        try:
            tasks = Task.objects.filter(author=request.user)
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except Task.DoesNotExist:
            return Response("Cannot get tasks", status=status.HTTP_404_NOT_FOUND)
        
    def post(self, request, *args, **kwargs):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, *args, **kwargs):
        obj = get_object_or_404(Task, pk=kwargs['pk'], author=request.user)
        serializer = TaskSerializer(obj, data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        obj = get_object_or_404(Task, pk=kwargs['pk'], author=request.user)
        try:
            obj.delete()
            return Response("Successfully deleted", status=status.HTTP_204_NO_CONTENT)
        except:
            return Response("Cannot delete object", status=status.HTTP_400_BAD_REQUEST)
        
