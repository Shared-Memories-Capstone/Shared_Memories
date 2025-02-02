from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Event(models.Model):
    """Event model, Primary key -> event_id"""

    event_id = models.AutoField(primary_key=True)  # Auto-increment primary key
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE
    )
    event_title = models.CharField(max_length=50)
    event_description = models.CharField(max_length=255)
    event_date = models.DateField()
    access_code = models.CharField(max_length=6)

    def __str__(self):
        """This ensures the name is returned, instead of 'Item object (1)'"""
        return self.event_title
#  Event(models.Model)


class Photo(models.Model):
    """Photo model, Primary key -> photo_id"""
    photo_id = models.AutoField(primary_key=True)
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE
    )
    uploaded_by = models.CharField(max_length=40)
    original_file_name = models.CharField(max_length=255)
    file_key = models.CharField(max_length=512)
    upload_timestamp = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.original_file_name

