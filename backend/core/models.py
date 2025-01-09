from django.db import models
from django.core.exceptions import ValidationError
from django.utils.timezone import now


class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.username


class UserSession(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='sessions')
    login_time = models.DateTimeField(default=now)
    logout_time = models.DateTimeField(null=True, blank=True)

    @property
    def duration(self):
        if self.logout_time:
            return (self.logout_time - self.login_time).total_seconds() // 60
        return None

    def __str__(self):
        return f'{self.user.username} - {self.login_time}'


class ActivityUser(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='activities')
    button_name = models.CharField(max_length=50)
    click_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} - {self.button_name} - {self.click_time}'


class Landing(models.Model):
    title = models.CharField(
        max_length=100,
        default="Bienvenido a AnalyticsApp",
        help_text="Titulo de la página"
    )
    description = models.TextField(
        default="Esta es una breve descripción.",
        help_text="Una breve descripción de la página de destino."
    )
    logo = models.BinaryField(
        null=True,
        blank=True,
        help_text="Imagen del logo opcional."
    )

    def clean(self):
        if self.logo and self.logo.size > 2 * 1024 * 1024:
            raise ValidationError("El logo no puede exceder las 2MB.")
        super().clean()

    def __str__(self):
        return self.title
