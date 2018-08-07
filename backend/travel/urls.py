from django.conf.urls import url, include
from proto import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('webapp.urls')),
]

