from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^flights-api$', views.flightsApi, name='flights api'),
    url(r'^hotels-api$', views.hotelsApi, name='hotels api'),
    url(r'^booking-api$', views.bookingApi, name='booking api'),
    url(r'^reservation-api$', views.reservationApi, name='reservation api'),
    url(r'^feedback-api$', views.feedbackApi, name='feedback api'),
    url(r'^history-api$', views.historyApi, name='history api'),
    url(r'^deals-api$', views.dealsApi, name='deals api')

]
