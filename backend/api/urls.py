from django.urls import path, include
from .views import (
    EventViewSet,
    PhotoViewSet,
    login,
    register,
    verify_token,
    upload_photo,
)
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r"events", EventViewSet)
router.register(r"photos", PhotoViewSet, basename='photos')

urlpatterns = [
    path("", include(router.urls)),  # Includes all API routes
    path("auth/login/", login, name="login"),
    path("auth/register/", register, name="register"),
    path("auth/verify/", verify_token, name="verify-token"),
    path("upload-photo/", upload_photo, name="upload_photo"),
]
