from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=6)
    description = models.TextField()

    def __str__(self):
        """This ensures the name is returned, instead of 'Item object (1)' """
        return self.name