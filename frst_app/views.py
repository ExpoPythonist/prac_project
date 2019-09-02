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

    if not is_authenticated(request):
        return HttpResponseRedirect('signin')
    # print(request.session['auth'])
    print(request.session['email'])
    return render(request, 'home.html',
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

        if response.status_code == 200:
            return render(request, 'register.html',
                          {'success_message': '** Registration is complete! Please login', 'lang_data': lang_data})
        else:
            res_content = json.loads(response.content.decode('utf-8'))
            error = res_content['errors']
            last_err = "Registration is Failed"
            for err in error:
                last_err = err
            return render(request, 'register.html', {'err_message': '** ' + error[last_err][0], 'lang_data': lang_data})

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
            return HttpResponseRedirect('/')
        else:
            return render(request, 'signin2.html', {'err_message': 'Credential doesn\'t match!', 'lang_data': lang_data})

    return render(request, 'signin2.html', {'lang_data': lang_data})


def signout(request):
    # lang_data = LanguageDetector.get_language_processor()
    if is_authenticated:
        request.session.flush()
        return HttpResponseRedirect('/')
    else:
        return HttpResponseRedirect('/')

# def add_question(request):
#     return render(request, 'add_question.html')
#
#
# def question_list(request):
#     all_questions = Question.objects.all().order_by('-id')
#
#     all_data = []
#     for q in all_questions:
#         temp = {}
#         op_list = []
#         for op in q.options.all():
#             op_temp = {}
#             op_temp['option'] = op.option
#             op_list.append(op_temp)
#         temp['id'] = q.pk
#         temp['question'] = q.question
#         temp['answer'] = q.answer
#         temp['options'] = op_list
#         all_data.append(temp)
#
#     return render(request, 'question_list.html', {'all_data': all_data})
#
#
# def add_question_json(request):
#     try:
#         question = request.POST.get('question')
#         answer = request.POST.get('answer')
#         op_a = request.POST.get('op_a')
#         op_b = request.POST.get('op_b')
#         op_c = request.POST.get('op_c')
#         op_d = request.POST.get('op_d')
#
#         op_a_instance = Option(option=op_a)
#         op_a_instance.save()
#         op_b_instance = Option(option=op_b)
#         op_b_instance.save()
#         op_c_instance = Option(option=op_c)
#         op_c_instance.save()
#         op_d_instance = Option(option=op_d)
#         op_d_instance.save()
#
#         question_instance = Question(question=question, answer=answer)
#         question_instance.save()
#
#         question_instance.options.add(op_a_instance)
#         question_instance.options.add(op_b_instance)
#         question_instance.options.add(op_c_instance)
#         question_instance.options.add(op_d_instance)
#
#         question_instance.save()
#
#         return HttpResponse('success')
#
#     except:
#         return HttpResponse('0')
#
# def remaining_time_json(request):
#     try:
#         sec = request.POST.get('sec')
#         rem_tim_instances = UserRemainingTime.objects.filter(user_id=request.user.pk)
#         if rem_tim_instances:
#             rem_tim_instance = rem_tim_instances.last()
#         else:
#             rem_tim_instance = UserRemainingTime(user_id=request.user.pk)
#         rem_tim_instance.sec = sec
#         rem_tim_instance.save()
#
#         return HttpResponse('1')
#
#     except:
#         return HttpResponse('0')
#
# def EditStudent(request, s_id):
#     student_info = Student.objects.get(id=s_id)
#
#     if request.method == 'POST':
#         name = request.POST.get('stu_name', None)
#         roll = request.POST.get('stu_roll', None)
#         class_name = request.POST.get('stu_class', None)
#
#         student_info.stu_name = name
#         student_info.stu_roll = roll
#         student_info.stu_class = class_name
#         student_info.save()
#
#         all_students = Student.objects.all()
#         return render(request, 'studentDeatils.html', {'all_students': all_students})
#     else:
#         return render(request, 'SingleInfo.html', {'student_info': student_info})
# def student_signin(request):
#     if request.user.is_authenticated:
#         return HttpResponseRedirect('/student-panel')
#
#     if request.method == 'POST':
#         email = request.POST.get('email')
#         user = User.objects.filter(email=email).first()
#         if user is not None:
#             login(request, user)
#             return HttpResponseRedirect('/student-panel')
#         elif user is None:
#             user = User(email=email)
#             user.is_active = True
#             user.is_staff = True
#             user.save()
#             login(request, user)
#             return HttpResponseRedirect('/student-panel')
#         else:
#             return HttpResponseRedirect('/')
#     return render(request, 'signin.html')
#
#
# def student_panel(request):
#     return render(request, 'student_panel.html')
#
# def set_exam_time(request):
#     if request.method=='POST':
#         min = request.POST.get('min')
#         instance = SetExamTime(sec=Decimal(min)*60)
#         instance.save()
#         return HttpResponseRedirect('/')
#     return render(request, 'set_exam_time.html')
#
#
# def student_exam(request):
#     all_questions = Question.objects.all().order_by('-id')
#
#     all_data = []
#     for q in all_questions:
#         temp = {}
#         op_list = []
#         for op in q.options.all():
#             op_temp = {}
#             op_temp['option'] = op.option
#             op_list.append(op_temp)
#         temp['id'] = q.pk
#         temp['question'] = q.question
#         temp['answer'] = q.answer
#         temp['options'] = op_list
#         temp['flag'] = q.flag
#         all_data.append(temp)
#         rem_tim = UserRemainingTime.objects.filter(user_id=request.user.pk).last()
#         if rem_tim:
#             time_val = rem_tim.sec
#         else:
#             time_val = SetExamTime.objects.last().sec
#
#     return render(request, 'student_exam.html', {'all_data': all_data,'time_val': time_val})
#
#
# def add_examination_answer(request):
#     try:
#         question_id = request.POST.get('question_id')
#         answer = request.POST.get('answer')
#         if request.user.email:
#             examination_instance = Examination(user_id=request.user.id, question_id=question_id, given_answer=answer)
#             examination_instance.save()
#
#             question = Question.objects.filter(id=question_id).first()
#             question.user_id = request.user.id
#             question.flag = True
#             question.save()
#
#             return HttpResponse('success')
#
#     except:
#         return HttpResponse('0')
