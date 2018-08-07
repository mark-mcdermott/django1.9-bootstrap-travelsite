from django.conf import settings
from django.conf.urls import include, url
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^api/', include('api.urls', namespace='api')),
    # url(r'^api/', include('webapp.urls')),
    # url(r'^token-auth', obtain_jwt_token),
    url(r'^', TemplateView.as_view(template_name="index.html")),

]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
