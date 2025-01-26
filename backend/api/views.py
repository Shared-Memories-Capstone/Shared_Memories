from django.shortcuts import render
from rest_framework import generics
from .serializers import ItemSerializer
from .models import Item
from django.http import JsonResponse


# Create your views here.
def test_view(request):
    data = {"new_count": 2}  # whenever this view is called, it will return this data
    return JsonResponse(data)

class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


