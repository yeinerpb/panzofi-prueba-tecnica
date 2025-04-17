from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils import timezone
from .models import User, UserSession, ActivityUser, Landing
from .serializers import UserSerializer, UserSessionSerializer, ActivityUserSerializer, LandingSerializer


class LandingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Landing.objects.all()
    serializer_class = LandingSerializer

    def list(self, request, *args, **kwargs):
        landing = Landing.objects.first()
        if landing:
            serializer = self.get_serializer(landing)
            return Response(serializer.data)
        return Response({"detail": "No landing page found."}, status=404)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        data = []
        for user in queryset:
            sessions = user.sessions.all()
            activities = user.activities.all()
            latest_session = sessions.latest(
                'login_time') if sessions.exists() else None
            login_time = latest_session.login_time if latest_session else None
            session_duration = latest_session.duration if latest_session and latest_session.logout_time else None

            user_data = {
                "id": user.id,
                "username": user.username,
                "is_admin": user.is_admin,
                "is_active": user.is_active,
                "loginDate": login_time,
                "sessionTime": session_duration,
                "button1Clicks": activities.filter(button_name='button1').count(),
                "button2Clicks": activities.filter(button_name='button2').count(),
            }
            data.append(user_data)
        return Response(data)


class UserSessionViewSet(viewsets.ModelViewSet):
    queryset = UserSession.objects.all()
    serializer_class = UserSessionSerializer


class ActivityUserViewSet(viewsets.ModelViewSet):
    queryset = ActivityUser.objects.all()
    serializer_class = ActivityUserSerializer

    def create(self, request, *args, **kwargs):
        try:
            username = request.data.get('username')
            button_name = request.data.get('button_name')
            user = User.objects.get(username=username)
            ActivityUser.objects.create(user=user, button_name=button_name)
            return Response({'message': 'Interaction registered'})
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = User.objects.get(username=username, password=password)
            session = UserSession.objects.create(
                user=user, login_time=timezone.now())
            if user.is_admin:
                return Response({
                    'message': 'Admin login successful',
                    'is_admin': True,
                    'username': user.username,
                    'token': 'some_generated_token'
                })
            else:
                return Response({
                    'message': 'User login successful',
                    'is_admin': False,
                    'username': user.username,
                    'token': 'some_generated_token'
                })
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=401)


class LogoutView(APIView):
    def post(self, request):
        username = request.data.get('username')
        try:
            user = User.objects.get(username=username)
            session = UserSession.objects.filter(
                user=user).latest('login_time')
            session.logout_time = timezone.now()
            session.save()
            return Response({'message': 'Logout successful'})
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)
        except UserSession.DoesNotExist:
            return Response({'error': 'Session not found'}, status=404)
