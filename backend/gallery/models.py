import datetime
from django.db import models
from django.utils import timezone


class Event(models.Model):
    name = models.CharField(default='', max_length=50)
    date = models.DateField(default=datetime.date.today)
    description = models.TextField(default='')
    access_code = models.CharField(default='', max_length=6)

    def __str__(self):
        return self.name

class Upload(models.Model):
    event = models.ForeignKey(Event, on_delete=models.PROTECT)
    attendee_name = models.CharField(default='', max_length=40)
    original_file_name = models.CharField(default='', max_length=255)
    file_key = models.CharField(default='', max_length=512)
    upload_datetime = models.DateTimeField(default=timezone.now)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.original_file_name
