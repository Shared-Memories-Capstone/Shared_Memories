from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Item(models.Model):
    """Template"""

    name = models.CharField(max_length=6)
    description = models.TextField()

    def __str__(self):
        """This ensures the name is returned, instead of 'Item object (1)'"""
        return self.name


class Event(models.Model):
    """Event model, Primary key -> event_id"""

    event_id = models.AutoField(primary_key=True)  # Auto-increment primary key
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE
    )  # I would like a second set of eyes on this line
    event_title = models.CharField(max_length=50)
    event_description = models.CharField(max_length=255)
    event_date = models.DateField()
    access_code = models.CharField(max_length=6)

    def __str__(self):
        """This ensures the name is returned, instead of 'Item object (1)'"""
        return self.event_title


#  Event(models.Model)
