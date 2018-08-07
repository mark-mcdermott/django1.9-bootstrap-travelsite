from django.conf.urls import include, url

from rest_framework.routers import DefaultRouter

from api import views

router = DefaultRouter()
router.register(r'cities', views.CityViewSet)
router.register(r'hotels', views.HotelViewSet)
router.register(r'occupancy', views.OccupancyViewSet)
router.register(r'airlines', views.AirlineViewSet)
router.register(r'flights', views.FlightViewSet)
router.register(r'flightinstances', views.FlightInstanceViewSet)
router.register(r'profiles', views.ProfileViewSet)
router.register(r'bookings', views.BookingViewSet)
router.register(r'reservations', views.ReservationViewSet)
router.register(r'transactions', views.TransactionViewSet)
router.register(r'addresses', views.AddressViewSet)
router.register(r'payments', views.PaymentViewSet)
router.register(r'feedback', views.FeedbackViewSet)

urlpatterns = [
    url(r'^', include(router.urls))
]
