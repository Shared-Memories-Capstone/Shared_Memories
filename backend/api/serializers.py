from rest_framework import serializers
from .models import Event, Photo


class EventSerializer(serializers.ModelSerializer):
    """Event Model"""

    class Meta:
        model = Event
        fields = "__all__"


class PhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()  # for handling image urls

    class Meta:
        model = Photo
        fields = [
            "photo_id",
            "original_file_name",
            "upload_timestamp",
            "image_url",
        ]  # we added image_url to the fields

    # Get the absolute URL for the image
    def get_image_url(self, obj):
        if obj.image:
            return self.context["request"].build_absolute_uri(obj.image.url)
        return None
