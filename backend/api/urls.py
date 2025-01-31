from django.urls import path, include
from .views import ItemListCreateView, EventViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'events', EventViewSet)

urlpatterns = [
    path('items/', ItemListCreateView.as_view(), name='item-list-create'),
    path('', include(router.urls)),  # Includes all API routes
]
