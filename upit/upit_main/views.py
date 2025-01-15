from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from .models import schedule_groups
from translate import Translator
from django.contrib.auth.models import Group, Permission, User

def index(request: HttpRequest) -> HttpResponse:
    username = request.POST.get("name_user")
    password = request.POST.get("pass_user")
    if User.objects.filter( username = username, password = password):
        user_data = {"username": username, "password": password}
        return render(request, "account.html", context = user_data)
    else:
        if "EN" in request.path:
            return render(request, "index_EN.html")
        else:
            return render(request, "index.html")

def schedule(request: HttpRequest) -> HttpResponse:
    group = request.POST.get("group_name")
    week_num  = request.POST.get("week_number")
    
    if group != "none" and group != None and week_num != None and week_num != "none":
        schedule_curr_group = schedule_groups.objects.filter(group_name_db = group, week_number = week_num)
        data = schedule_curr_group.values()[0]
        data["nums_for_select"] = [x for x in range(1, 36)]
    else:
        data = dict()
        data["nums_for_select"] = [x for x in range(1, 36)]

    if "EN" in request.path:
        if len(data.values()) != 0:
            translator = Translator(from_lang = "ru", to_lang = "en")
            data_translate = {x: translator.translate(str(data[x])) for x in data.keys()}
            data_translate["nums_for_select"] = [x for x in range(1, 36)]
        else:
            data_translate = dict()
            data_translate["nums_for_select"] = [x for x in range(1, 36)]
        return render(request, "schedule_EN.html", context = data_translate)
        
    else:
        return render(request, "schedule.html", context = data)

def about_us(request: HttpRequest) -> HttpResponse:
    if "EN" in request.path:
        return render(request, "about_us_EN.html")
    else:
        return render(request, "about_us.html")