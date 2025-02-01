import datetime
from django.db import IntegrityError
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from .models import Event


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
