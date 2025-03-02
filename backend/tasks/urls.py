from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('', include(router.urls)),
    path('categories/', TaskViewSet.as_view({'get': 'categories'}), name='categories'),
    path('tasks/stats/', TaskViewSet.as_view({'get': 'stats'}), name='task-stats'),
]