from django.urls import path, include
from .views import EventViewSet, PhotoViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'photos', PhotoViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Includes all API routes
]
