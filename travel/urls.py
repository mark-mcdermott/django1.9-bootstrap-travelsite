from django.conf.urls import url, include
# from rest_framework import routers
# from proto import views

# router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
# router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    # url(r'^', include(router.urls)),
    url(r'^', include('snippets.urls')),
    url(r'^api_auth/', include('rest_framework.urls', namespace='rest_framework')),
]

