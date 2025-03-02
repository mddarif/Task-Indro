from django.db.models import Count, Q
from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import timedelta
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """
        Filter tasks to return only those belonging to the current user.
        Apply additional filters based on query parameters.
        """
        queryset = Task.objects.filter(user=self.request.user)
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        
        # Filter by completion status
        completed = self.request.query_params.get('completed')
        if completed is not None:
            completed = completed.lower() == 'true'
            queryset = queryset.filter(completed=completed)
        
        # Search by title
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(title__icontains=search)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """
        Return statistics about the user's tasks.
        """
        user = request.user
        today = timezone.now().date()
        due_soon_date = today + timedelta(days=3)
        
        # Get task counts
        total_tasks = Task.objects.filter(user=user).count()
        completed_tasks = Task.objects.filter(user=user, completed=True).count()
        pending_tasks = Task.objects.filter(user=user, completed=False).count()
        high_priority_tasks = Task.objects.filter(user=user, priority='high', completed=False).count()
        due_soon_tasks = Task.objects.filter(
            user=user, 
            completed=False,
            due_date__isnull=False,
            due_date__lte=due_soon_date,
            due_date__gte=today
        ).count()
        
        return Response({
            'total': total_tasks,
            'completed': completed_tasks,
            'pending': pending_tasks,
            'high_priority': high_priority_tasks,
            'due_soon': due_soon_tasks
        })
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """
        Return a list of all categories used by the current user.
        """
        categories = Task.objects.filter(user=request.user).values_list('category', flat=True).distinct()
        return Response(list(categories))