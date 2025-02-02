from django.shortcuts import render
from rest_framework import viewsets
from .serializers import EventSerializer, PhotoSerializer
from .models import Event, Photo
from django.http import JsonResponse


# Create your views here.
def test_view(request):
    data = {"new_count": 2}  # whenever this view is called, it will return this data
    return JsonResponse(data)


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
#  EventViewSet(viewsets.ModelViewSet)


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
#  PhotoViewSet(viewsets.PhotoViewSet)



