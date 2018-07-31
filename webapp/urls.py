from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^flights-api/(?P<fromcity>\w+)$', views.flightsApi, name='flights api'),
    url(r'^hotels-api/(?P<city>\w+)$', views.hotelsApi, name='hotels api')
    #url(r'^flights-api$', views.flightsApi, name='flights api'),
    #url(r'^hotels-api/$', views.hotelsApi, name='hotels api')
]
