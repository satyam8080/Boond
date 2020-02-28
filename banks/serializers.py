from rest_framework import serializers
from .models import State, BloodBank, BloodGroup, Size, BloodBag, TotalBlood

class BloodBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodBank
        fields = (
            'name',
            'email',
            'password',
            'address',
            'pincode',
            'state',
            'city',
            'latitude',
            'longitude'    
        )


class DynamicSerializer(BloodBankSerializer):
    class Meta:
        model = BloodBank
        fields = (
            'name',
            'address',
            'pincode',
            'state',
            'city',
            'latitude',
            'longitude' 
        )        


class TotalBloodSerializer(serializers.ModelSerializer):
    blood_bank = DynamicSerializer()

    class Meta:
        model = TotalBlood
        fields = (
            'total_ml',
            'blood_bank',
        )



