import datetime
from django.test import TestCase
from gallery.models import Event

class HomePageTest(TestCase):
    def test_home_page_returns_template(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'gallery/home.html')

    def test_can_accept_a_POST_request(self):
        access_code = 'abcdef'
        response = self.client.post('/', data={'access_code': access_code})
        self.assertRedirects(response, f'/gallery/{access_code}/')

class GalleryPageTest(TestCase):
    def test_gallery_page_returns_template(self):
        response = self.client.get('/gallery/')
        self.assertTemplateUsed(response, 'gallery/home.html')

class PhotoPageTest(TestCase):
    def test_photo_page_returns_template(self):
        response = self.client.get('/gallery/ABCDEF/1/')
        self.assertTemplateUsed(response, 'gallery/photo.html')

class EventModelTest(TestCase):
    def test_saving_and_retrieving_items(self):
        first_event = Event()
        first_event.name = 'Wes\'s 4th Birthday'
        first_event.date = '2025-01-11'
        first_event.description = 'Brief event description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        first_event.access_code = 'abcdef'
        first_event.save()

        second_event = Event()
        second_event.name = 'Bob\'s Retirement Party'
        second_event.date = '2023-11-17'
        second_event.description = ''
        second_event.access_code = 'fedcba'
        second_event.save()

        saved_events = Event.objects.all()
        self.assertEqual(saved_events.count(), 2)

        first_saved_event = saved_events[0]
        second_saved_event = saved_events[1]

        self.assertEqual(first_saved_event.name, 'Wes\'s 4th Birthday')
        self.assertEqual(first_saved_event.date, datetime.date(2025, 1, 11))
        self.assertEqual(first_saved_event.description, 'Brief event description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
        self.assertEqual(first_saved_event.access_code, 'abcdef')

        self.assertEqual(second_saved_event.name, 'Bob\'s Retirement Party')
        self.assertEqual(second_saved_event.date, datetime.date(2023, 11, 17))
        self.assertEqual(second_saved_event.description, '')
        self.assertEqual(second_saved_event.access_code, 'fedcba')
