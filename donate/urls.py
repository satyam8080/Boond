from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name="user-home"),
    path('register', views.RegisterUser.as_view(), name="user-register"),
    path('results/', views.FetchResultsCity.as_view(), name="bloodbank-results"),
    path('results/group', views.FetchResultsGroup.as_view(), name="bloodbank-results-group"),
    path('results/group/users', views.FetchResultsByUsersGroup.as_view(), name="user-results-group"),
]

