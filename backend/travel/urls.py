from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url('', include('webapp.urls')),
    url('flights-api', include('webapp.urls')),
    url('hotels-api', include('webapp.urls'))
]
