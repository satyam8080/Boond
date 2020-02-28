from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'name',
            'email',
            # 'password',
            'mobile_no',
            'blood_group',
            'address',
            'pincode',
            'state',
            'city',
            'latitude',
            'longitude'    
        )



