from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^flights-api$', views.flightsApi, name='flights api'),
    url(r'^hotels-api$', views.hotelsApi, name='hotels api'),
    url(r'^flights-hotels-api$', views.hotelsApi, name='flights and hotels api'),
    url(r'^booking-api$', views.bookingApi, name='booking api'),
    url(r'^reservation-api$', views.reservationApi, name='reservation api'),
    url(r'^feedback-api$', views.feedbackApi, name='feedback api'),
    url(r'^history-api$', views.historyApi, name='history api'),
    url(r'^deals-api$', views.dealsApi, name='deals api'),
    url(r'^create-user-api$', views.createUserApi, name='create user api'),
    url(r'^get-user-api$', views.getUserApi, name='get user api'),
    url(r'^get-flight-status-api$', views.getFlightStatusApi, name='get flight status api'),
    url(r'^login-api$', views.loginApi, name='login api')#,
    #url(r'^$', views.login, name='login')

]
