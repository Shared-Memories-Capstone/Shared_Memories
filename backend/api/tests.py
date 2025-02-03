import datetime
import shutil
import tempfile
from django.conf import settings
from django.db import IntegrityError
from django.test import TestCase, override_settings
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO
from PIL import Image
from rest_framework import status
from .models import Event, Photo


class EventModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up data for the whole TestCase
        cls.user = get_user_model().objects.create(
            username="testuser",
            email="testuser@example.com",
            password="testpassword",
        )
        cls.second_user = get_user_model().objects.create(
            username="anotheruser",
            email="another@example.com",
            password="testpassword",
        )

    def test_event_creation(self):
        """Ensure retrieved events match their expected attributes."""
        first_event = Event.objects.create(
            user_id=self.user,
            event_title="Wes's 4th Birthday",
            event_date=datetime.date(2025, 1, 11),
            event_description="Brief event description.",
            access_code="abcdef",
        )

        second_event = Event.objects.create(
            user_id=self.user,
            event_title="Bob's Retirement Party",
            event_date=datetime.date(2023, 11, 17),
            event_description="",
            access_code="fedcba",
        )

        saved_events = Event.objects.all()
        self.assertEqual(saved_events.count(), 2)

        first_saved_event = saved_events[0]
        second_saved_event = saved_events[1]

        self.assertEqual(first_saved_event.event_title, "Wes's 4th Birthday")
        self.assertEqual(first_saved_event.event_date, datetime.date(2025, 1, 11))
        self.assertEqual(
            first_saved_event.event_description, "Brief event description."
        )
        self.assertEqual(first_saved_event.access_code, "abcdef")

        self.assertEqual(second_saved_event.event_title, "Bob's Retirement Party")
        self.assertEqual(second_saved_event.event_date, datetime.date(2023, 11, 17))
        self.assertEqual(second_saved_event.event_description, "")
        self.assertEqual(second_saved_event.access_code, "fedcba")

    def test_event_str_method(self):
        """Test the __str__ method returns the correct string."""
        event = Event.objects.create(
            user_id=self.user,
            event_title="Wes's 4th Birthday",
            event_date=datetime.date(2025, 1, 11),
            event_description="Brief event description.",
            access_code="abcdef",
        )
        self.assertEqual(str(event), "Wes's 4th Birthday")

    def test_event_creation_without_required_fields(self):
        """Ensure that missing required fields raise an error."""
        with self.assertRaises(IntegrityError):
            Event.objects.create(
                user_id=self.user,
                event_title=None,
                event_date=datetime.date(2025, 2, 1),
            )

    def test_invalid_date_format(self):
        """Ensure invalid date formats are not accepted."""
        with self.assertRaises(ValidationError):
            Event.objects.create(
                user_id=self.user,
                event_title="Invalid Date Event",
                event_date="invalid-date",
            )

    def test_event_description_can_be_empty(self):
        """Ensure an empty event description is stored correctly."""
        event = Event.objects.create(
            user_id=self.user,
            event_title="Empty Description Event",
            event_date=datetime.date(2025, 3, 15),
            event_description="",
            access_code="xyz123",
        )
        self.assertEqual(event.event_description, "")

    def test_event_belongs_to_correct_user(self):
        """Ensure events are linked to the correct user."""
        event = Event.objects.create(
            user_id=self.second_user,
            event_title="Second User Event",
            event_date=datetime.date(2025, 4, 10),
            event_description="Created by second user.",
            access_code="user2code",
        )
        self.assertEqual(event.user_id, self.second_user)
        self.assertNotEqual(event.user_id, self.user)

    def test_event_deletion(self):
        """Ensure an event is properly deleted."""
        event = Event.objects.create(
            user_id=self.user,
            event_title="To Be Deleted",
            event_date=datetime.date(2025, 5, 20),
            event_description="This event will be deleted.",
            access_code="delete",
        )
        event_id = event.event_id
        event.delete()
        self.assertFalse(Event.objects.filter(event_id=event_id).exists())


class PhotoModelTest(TestCase):
    @classmethod
    def setUp(cls):
        """Set up a test user, event, and photo."""
        cls.user = get_user_model().objects.create_user(
            username="testuser",
            password="password123"
        )
        cls.event = Event.objects.create(
            user_id=cls.user,
            event_title="Concert",
            event_description="A live music event.",
            event_date="2025-07-20",
            access_code="XYZ789"
        )
        cls.photo = Photo.objects.create(
            event=cls.event,
            uploaded_by="photographer_1",
            original_file_name="concert_photo.jpg",
            file_key="unique_file_key_789",
            is_deleted=False
        )

    def test_photo_creation(self):
        """Test that a photo object is created correctly."""
        self.assertEqual(self.photo.original_file_name, "concert_photo.jpg")
        self.assertEqual(self.photo.uploaded_by, "photographer_1")
        self.assertEqual(self.photo.file_key, "unique_file_key_789")
        self.assertFalse(self.photo.is_deleted)

    def test_photo_str_method(self):
        """Test the __str__ method returns the correct string."""
        self.assertEqual(str(self.photo), "concert_photo.jpg")

    def test_upload_timestamp_auto_now_add(self):
        """Test that upload_timestamp is automatically set on creation."""
        self.assertIsNotNone(self.photo.upload_timestamp)

    def test_foreign_key_relationship(self):
        """Test that the photo is correctly associated with the event."""
        self.assertEqual(self.photo.event, self.event)

    def test_is_deleted_default_value(self):
        """Test that is_deleted defaults to False."""
        new_photo = Photo.objects.create(
            event=self.event,
            uploaded_by="photographer_2",
            original_file_name="event_picture.jpg",
            file_key="unique_file_key_456"
        )
        self.assertFalse(new_photo.is_deleted)


@override_settings(MEDIA_ROOT=tempfile.mkdtemp())
class PhotoUploadTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up data for the whole TestCase
        cls.user = get_user_model().objects.create(
            username="testuser",
            email="testuser@example.com",
            password="testpassword",
        )
        cls.event = Event.objects.create(
            user_id=cls.user,
            event_title="Wes's 4th Birthday",
            event_date=datetime.date(2025, 1, 11),
            event_description="Brief event description.",            access_code="abcdef",
        )
        cls.image = cls.create_test_image()
        cls.upload_url = reverse("upload_photo")

    @classmethod
    def tearDownClass(cls):
        """Remove test-created media files."""
        shutil.rmtree(settings.MEDIA_ROOT, ignore_errors=True)
        super().tearDownClass()

    @classmethod
    def create_test_image(cls):
        """Creates an in-memory test image using PIL."""
        # Create a new image using PIL
        image = Image.new("RGB", (100, 100), "red")
        # Create a file-like object to write the image to
        image_io = BytesIO()
        # Save the image to the file-like object
        image.save(image_io, format="JPEG")
        # Reset the file pointer to the beginning
        image_io.seek(0)
        # Create an InMemoryUploadedFile from the image
        image_file = InMemoryUploadedFile(
            file=image_io,
            field_name=None,
            name="test_image.jpg",
            content_type="image/jpeg",
            size=image_io.tell(),
            charset=None,
        )
        return image_file

    def test_successful_photo_upload(self):
        """Ensure photo upload is successful when valid data is received."""
        response = self.client.post(
            self.upload_url,
            {
                "image": self.image,
                "event": self.event.event_id,
                "uploaded_by": "Michael",
                "original_file_name": "test_image.jpg",
            },
            format="multipart",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "success")
        self.assertTrue(
            Photo.objects.filter(original_file_name="test_image.jpg").exists()
        )

    def test_missing_image(self):
        """Ensure that an upload without an image fails."""
        response = self.client.post(
            self.upload_url,
            {
                "event": self.event.event_id,
                "uploaded_by": "John Doe",
                "original_file_name": "test_image.jpg"
            }
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["status"], "error")
