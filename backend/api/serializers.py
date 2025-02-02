from rest_framework import serializers
from .models import Event, Photo


class EventSerializer(serializers.ModelSerializer):
    """Event Model"""
    class Meta:
        model = Event
        fields = '__all__'
#  EventSerializer(serializers.ModelSerializer)


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'
#  PhotoSerializer(serializers.ModelSerializer)
