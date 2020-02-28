from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name="user-home"),
    path('results/', views.FetchResultsCity.as_view(), name="user-results"),
    path('results/group', views.FetchResultsGroup.as_view(), name="user-results-group"),
]

