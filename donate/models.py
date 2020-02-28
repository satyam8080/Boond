from django.db import models

from banks.models import State, BloodGroup

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    # password = models.CharField(max_length=400)
    mobile_no = models.CharField(max_length=10)
    blood_group = models.ForeignKey(BloodGroup, on_delete=models.CASCADE, related_name="users")
    address = models.TextField(max_length=400)
    pincode = models.IntegerField()
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name="users")
    city = models.CharField(max_length=64)
    latitude = models.CharField(max_length=20)
    longitude = models.CharField(max_length=20)




    
