def is_authenticated(request):
    try:
        auth = request.session['auth']
        email = request.session['email']
        return True
    except:
        return False