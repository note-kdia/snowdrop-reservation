from django.urls import path

from . import views

urlpatterns = [
    path("index", views.IndexView.as_view()),
    path("video_feed", views.video_feed_view(), name="video_feed"),
    path("<uuid:reservation_id>/", views.reservation_detail,
         name="reservation_detail"),
    path("list", views.reservation_list, name="reservation_list"),
]
