from django.urls import path, re_path
from upit_main import views as views_site
from re import *

urlpatterns = [
    re_path("(?:schedule)(?:_EN)?", views_site.schedule),
    re_path("(?:about_us)(?:_EN)?", views_site.about_us),
    re_path("(?:_EN)?", views_site.index),
]
