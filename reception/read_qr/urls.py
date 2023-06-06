from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path

from . import views

urlpatterns = [
    path("index", views.IndexView.as_view()),
    path("video_feed", views.video_feed_view(), name="video_feed"),
]
urlpatterns += staticfiles_urlpatterns()
