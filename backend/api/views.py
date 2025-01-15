from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse


def test_view(request):
    data = {"new_count": 2}  # whenever this view is called, it will return this data
    return JsonResponse(data)
