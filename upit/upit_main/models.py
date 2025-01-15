from django.db import models

# Create your models here.
class schedule_groups(models.Model):
    week_number = models.IntegerField()
    group_name_db = models.TextField()
    monday = models.TextField()
    tuesday = models.TextField()
    wednesday = models.TextField()
    thursday = models.TextField()
    friday = models.TextField()
    saturday = models.TextField()