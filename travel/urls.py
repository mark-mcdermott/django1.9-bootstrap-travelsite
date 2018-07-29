from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import RedirectView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^proto/', include('proto.urls')),
    url(r'^webapp/', include('webapp.urls')),
    url('', RedirectView.as_view(url='/webapp/', permanent=False)),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

