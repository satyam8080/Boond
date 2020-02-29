from django.shortcuts import render,redirect
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.urls import reverse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from banks.models import  BloodBank, BloodBag, Size, BloodGroup, TotalBlood
from banks.serializers import DynamicSerializer, TotalBloodSerializer
from .serializers import UserSerializer
from .models import User

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
        user_city = request.query_params['city']
        blood_group = request.query_params['group']
        # user_state = request.query_params['state']
        blood_banks = list(BloodBank.objects.filter(city=user_city))
        total_blood_obj = TotalBlood.objects.filter(blood_bank__in=blood_banks, blood_group=blood_group)
        serializer = TotalBloodSerializer(total_blood_obj, many=True)
        return Response(serializer.data)



class RegisterUser(APIView):
    def post(self, request, *args, **kwargs):
        email =  request.data['email'] 
        if User.objects.filter(email=email).exists():
            return HttpResponseRedirect(reverse("user-home"))
            # return HttpResponse("Email Already Exists")
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponseRedirect(reverse('user-home'))
            # return Response(serializer.data)
        return Response(serializer.errors)    




class FetchResultsByUsersGroup(APIView):
    def get(self, request, *args, **kwargs):
        user_city = request.query_params['city']
        blood_group = request.query_params['group']
        # user_state = request.query_params['state']
        users = User.objects.filter(city=user_city, blood_group=blood_group)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)





  






