import json
from decimal import Decimal

import requests
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render
from utils.call_api_processor import CallAPIProcessor
from utils.is_authenticated import is_authenticated
from utils.language_processor import LanguageDetector

from .models import *
from django.http import HttpResponse, HttpResponseRedirect


def home(request):
    lang_data = LanguageDetector.get_language_processor()

    if is_authenticated(request):
        return render(request, 'home.html',
                      {'lang_data': lang_data, 'email': request.session['email'], 'auth': request.session['auth']})

    return render(request, 'home.html', {'lang_data': lang_data})


def user_profile(request):
    lang_data = LanguageDetector.get_language_processor()

    if not is_authenticated(request):
        return HttpResponseRedirect('signin')
    return render(request, 'user.html',
                  {'lang_data': lang_data, 'email': request.session['email'], 'auth': request.session['auth']})


def register(request):
    lang_data = LanguageDetector.get_language_processor()
    if is_authenticated(request):
        return HttpResponseRedirect('/')

    if request.method == "POST":
        code = request.POST.get('code')
        email = request.POST.get('email')
        password = request.POST.get('password')
        repeat_password = request.POST.get('repeat_password')
        if password != repeat_password:
            return render(request, 'register.html',
                          {'err_message': '** Password doesn\'t match!', 'lang_data': lang_data})
        url = "https://exercise.api.rebiton.com/auth/register"
        data = {
            "code": code,
            "email": email,
            "password": password,
            "agreement": True
        }
        response = CallAPIProcessor.api(url=url, request=request, data=data)


        if response.status_code == 200 or response.status_code == 201:
            return render(request, 'register.html',
                          {'success_message': '** Registration is complete! Please login', 'lang_data': lang_data})
        else:
            try:
                res_content = json.loads(response.content.decode('utf-8'))
                error = res_content['errors']
                last_err = "Registration is Failed"
                for err in error:
                    last_err = err
                return render(request, 'register.html', {'err_message': '** ' + error[last_err][0], 'lang_data': lang_data})
            except:
                return render(request, 'register.html',
                       {'success_message': '** Registration is complete! Please login', 'lang_data': lang_data})

    return render(request, 'register.html', {'lang_data': lang_data})


def signin(request):
    lang_data = LanguageDetector.get_language_processor()

    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        url = 'https://exercise.api.rebiton.com/auth/login'
        data = {
            "email": email,
            "password": password
        }
        response = CallAPIProcessor.api(url=url, request=request, data=data)
        if response.status_code == 200:
            request.session['auth'] = json.loads(response.content.decode('utf-8'))
            request.session['email'] = email
            return HttpResponseRedirect('/user')
        else:
            return render(request, 'signin2.html',
                          {'err_message': 'Credential doesn\'t match!', 'lang_data': lang_data})

    return render(request, 'signin2.html', {'lang_data': lang_data})


def signout(request):
    # lang_data = LanguageDetector.get_language_processor()
    if is_authenticated:
        request.session.flush()
        return HttpResponseRedirect('/')
    else:
        return HttpResponseRedirect('/')
