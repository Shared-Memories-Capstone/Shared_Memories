# Generated by Django 5.1.5 on 2025-02-01 23:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_event"),
    ]

    operations = [
        migrations.CreateModel(
            name="Photo",
            fields=[
                ("photo_id", models.AutoField(primary_key=True, serialize=False)),
                ("uploaded_by", models.CharField(max_length=40)),
                ("original_file_name", models.CharField(max_length=255)),
                ("file_key", models.CharField(max_length=512)),
                ("upload_timestamp", models.DateTimeField(auto_now_add=True)),
                ("is_deleted", models.BooleanField(default=False)),
                (
                    "event",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.event"
                    ),
                ),
            ],
        ),
        migrations.DeleteModel(
            name="Item",
        ),
    ]
