from django.conf import settings
from django.conf.urls import include, url

from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    url(r'^api/', include('api.urls', namespace='api')),
    # url(r'^api/', include('webapp.urls')),
    # url(r'^token-auth', obtain_jwt_token),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
