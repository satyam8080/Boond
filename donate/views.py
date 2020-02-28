from django.shortcuts import render,redirect
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.urls import reverse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from banks.models import  BloodBank, BloodBag, Size, BloodGroup, TotalBlood
from banks.serializers import DynamicSerializer, TotalBloodSerializer

# Create your views here.
def home(request):
    return render(request, "donate/home.html")


class FetchResultsCity(APIView):
    def get(self, request, *args, **kwargs):
        user_city= request.query_params['city']
        # user_state = request.query_params['state']
        blood_banks = BloodBank.objects.filter(city=user_city)
        serializer = DynamicSerializer(blood_banks, many=True)
        return Response(serializer.data)


class FetchResultsGroup(APIView):
    def get(self, request, *args, **kwargs):
        user_city= request.query_params['city']
        blood_group = request.query_params['group']
        # user_state = request.query_params['state']
        blood_banks = list(BloodBank.objects.filter(city=user_city))
        total_blood_obj = TotalBlood.objects.filter(blood_bank__in=blood_banks, blood_group=blood_group)
        serializer = TotalBloodSerializer(total_blood_obj, many=True)
        return Response(serializer.data)



  






