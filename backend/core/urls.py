from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, UserSessionViewSet, ActivityUserViewSet, LandingViewSet, LoginView, LogoutView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'sessions', UserSessionViewSet)
router.register(r'activities', ActivityUserViewSet)
router.register(r'landing', LandingViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("register_interaction/",
         ActivityUserViewSet.as_view({'post': 'create'}), name="register_interaction"),
]
