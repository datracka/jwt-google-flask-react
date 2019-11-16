from flask import make_response, render_template, request, session, Blueprint, redirect, Response
import os
import json
from server.authentication import Authentication
import logging

blueprint = Blueprint('main', __name__)

# client routing #####

# routes managed on client side through routes.js
# https://github.com/shea256/angular-flask/
@blueprint.route('/')
@blueprint.route('/protected-page')
def basic_pages(**kwargs):
    return render_template('index.html')

@blueprint.route('/network-error')
def network_error():
    return "network error, check your internet connection or try later"

@blueprint.route('/login')
def login():
    auth = Authentication(request)
    try: 
        response = auth.google_login()
    except Exception as e:
        logging.exception('Error on authenticating user')
        return redirect('/network-error') 

    session['state'] = response['state']
    return redirect(response['request_uri'])

@blueprint.route('/login/callback')
def login_callback():
    
    if request.args.get('state', '') != session['state']:
        response = make_response(json.dumps(
            'Invalid state parameter.'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response

    auth = Authentication(request)
    try: 
        data = auth.google_login_callback()
    except Exception as e:
        logging.exception('Error on authenticating user')
        return redirect('/network-error') 
    
    session['access_token'] = data['access_token']

    from server.models import insert_or_update
    insert_or_update(data)

    return redirect('/?token=' + data['jwt'])