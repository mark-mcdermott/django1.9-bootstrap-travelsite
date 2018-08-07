from django.conf import settings
from django.conf.urls import include, url

urlpatterns = [
    url(r'^api/', include('api.urls', namespace='api')),
    # url(r'^api/', include('webapp.urls')),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
