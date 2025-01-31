from rest_framework import serializers
from .models import Item, Event


class ItemSerializer(serializers.ModelSerializer):
    """Template"""
    class Meta:
        model = Item
        fields = '__all__'
#  ItemSerializer(serializers.ModelSerializer):


class EventSerializer(serializers.ModelSerializer):
    """Event Model"""
    class Meta:
        model = Event
        fields = '__all__'
#  EventSerializer(serializers.ModelSerializer)
