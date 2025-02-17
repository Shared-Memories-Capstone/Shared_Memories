#!/bin/sh
python manage.py collectstatic --noinput
exec gunicorn --bind 0.0.0.0:8000 myproject.wsgi:application
