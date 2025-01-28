from django.urls import path

from . import views

app_name = 'gallery'
urlpatterns = [
    path('', views.home_view, name='home'),
    path('gallery/', views.home_view, name='gallery'),
    path('gallery/<str:access_code>/', views.gallery_view, name='event_gallery'),
    path('gallery/<str:access_code>/<int:photo_id>/', views.photo_view, name='photo'),
]