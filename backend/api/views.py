from rest_framework import viewsets
from .serializers import EventSerializer, PhotoSerializer
from .models import Event, Photo
from rest_framework import status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.core.files.storage import default_storage


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    @action(
        detail=False,
        methods=["get"],
        url_path=r"by-access-code/(?P<access_code>[0-9A-Za-z]+)",
        url_name="by-access-code",
    )
    def by_access_code(self, request, *args, **kwargs):
        """Return a response with an event or 404 using the access code."""
        # Change the name of the model field used to perform the lookup.
        self.lookup_field = "access_code"
        # Change the name of the keyword argument in the URL that holds the value for
        # lookup.
        self.lookup_url_kwarg = "access_code"
        # Lookup the event using the access code.
        event = self.get_object()  # returns 404 NOT FOUND if no events match
        # Serialize the found event.
        serializer = self.serializer_class(event)
        return Response({"status": "success", "event": serializer.data})


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.filter(is_deleted=False)  # filter out deleted photos
    serializer_class = PhotoSerializer


@api_view(["POST"])
def upload_photo(request):
    try:
        image = request.FILES["image"]
        event_id = request.POST["event"]
        uploaded_by = request.POST["uploaded_by"]
        original_file_name = request.POST["original_file_name"]

        # Save the file
        file_path = default_storage.save(f"photos/{image.name}", image)

        # Create photo record
        photo = Photo.objects.create(
            event_id=event_id,
            uploaded_by=uploaded_by,
            original_file_name=original_file_name,
            file_key=file_path,
            image=file_path,
        )

        return Response({"status": "success", "photo_id": photo.photo_id})
    except Exception as e:
        return Response({"status": "error", "message": str(e)}, status=400)


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response(
            {"token": token.key, "user_id": user.pk, "username": user.username}
        )
    else:
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")
    first_name = request.data.get("firstName")
    last_name = request.data.get("lastName")

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        password=password,
        email=email,
        first_name=first_name,
        last_name=last_name,
    )

    token, _ = Token.objects.get_or_create(user=user)
    return Response(
        {"token": token.key, "user_id": user.pk, "username": user.username},
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET"])
def verify_token(request):
    if not request.auth:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    return Response(status=status.HTTP_200_OK)
