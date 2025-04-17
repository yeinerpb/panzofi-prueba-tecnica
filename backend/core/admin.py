from django.contrib import admin
from .models import User, UserSession, ActivityUser, Landing

admin.site.register(User)
admin.site.register(UserSession)
admin.site.register(ActivityUser)
admin.site.register(Landing)
