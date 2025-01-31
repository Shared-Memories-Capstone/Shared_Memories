from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import ItemSerializer, EventSerializer
from .models import Item, Event
from django.http import JsonResponse


# Create your views here.
def test_view(request):
    data = {"new_count": 2}  # whenever this view is called, it will return this data
    return JsonResponse(data)


class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer



