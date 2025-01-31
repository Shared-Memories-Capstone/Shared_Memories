from django.shortcuts import get_object_or_404, redirect, render
from .forms import AccessCodeForm
from .models import Event, Upload

def home_view(request):
    form = AccessCodeForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        access_code = form.cleaned_data['access_code'].lower()
        try:
            event = Event.objects.get(access_code=access_code)
            return redirect('gallery:event_gallery', access_code=access_code)
        except Event.DoesNotExist:
            print("No such event. Redirecting...")
            form.add_error('access_code', 'No such event exists.')
    return render(request, 'gallery/home.html', {'form': form})

def gallery_view(request, access_code):
    access_code = access_code.lower()
    try:
        event = Event.objects.get(access_code=access_code)
        context = {'event': event}
        return render(request, 'gallery/gallery.html', context)
    except Event.DoesNotExist:
        form = AccessCodeForm({'access_code': access_code})
        form.add_error('access_code', 'No such event exists.')
    return render(request, 'gallery/home.html', {'form': form})

def photo_view(request, access_code, photo_id):
    upload = get_object_or_404(Upload, pk=photo_id)

    context = {
        'upload': upload,
    }

    return render(request, 'gallery/photo.html', context)
