from .models import Landing
from rest_framework import serializers
from .models import User, UserSession, ActivityUser, Landing


class UserSessionSerializer(serializers.ModelSerializer):
    duration = serializers.SerializerMethodField()

    class Meta:
        model = UserSession
        fields = ['id', 'user', 'login_time', 'logout_time', 'duration']

    def get_duration(self, obj):
        if obj.login_time and obj.logout_time:
            return (obj.logout_time - obj.login_time).total_seconds() // 60
        return None


class ActivityUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityUser
        fields = ['id', 'user', 'button_name', 'click_time']


class UserSerializer(serializers.ModelSerializer):
    sessions = UserSessionSerializer(many=True, read_only=True)
    activities = ActivityUserSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'is_admin',
                  'is_active', 'sessions', 'activities']


class LandingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Landing
        fields = ['title', 'description', 'logo']
