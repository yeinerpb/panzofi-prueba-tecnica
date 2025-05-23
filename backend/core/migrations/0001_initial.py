# Generated by Django 5.1.4 on 2025-01-08 13:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Landing",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "title",
                    models.CharField(
                        default="Bienvenido a AnalyticsApp",
                        help_text="Titulo de la página",
                        max_length=100,
                    ),
                ),
                (
                    "description",
                    models.TextField(
                        default="Esta es una breve descripción.",
                        help_text="Una breve descripción de la página de destino.",
                    ),
                ),
                (
                    "logo",
                    models.ImageField(
                        blank=True,
                        help_text="Imagen del logo opcional.",
                        null=True,
                        upload_to="logos/%Y/%m/%d/",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50, unique=True)),
                ("password", models.CharField(max_length=100)),
                ("is_admin", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="ActivityUser",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "button_name",
                    models.CharField(
                        choices=[("button1", "Button 1"), ("button2", "Button 2")],
                        max_length=20,
                    ),
                ),
                ("click_time", models.DateTimeField(auto_now_add=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="activities",
                        to="core.user",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="UserSession",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("session_start", models.DateTimeField(auto_now_add=True)),
                ("session_end", models.DateTimeField(blank=True, null=True)),
                (
                    "user_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sessions",
                        to="core.user",
                    ),
                ),
            ],
        ),
    ]
