""" Views for IBM cloud offer sidebar. """

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django_countries import countries

from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.http import Http404, HttpResponse
from django.views.decorators.http import require_http_methods
import json
import requests

@login_required
@require_http_methods(['GET'])
def get_offer_code(request, username):
    
    access_token = get_access_token()

    url = "%s/offers/%s/codes/claim" % (settings.CF_PLATFORM_API, settings.CF_PLATFORM_CURRENT_OFFER)
    payload = "{\n\t\"ownerId\": \"%s\"\n}" % (username)
    headers = {
        'content-type': "application/json",
        'authorization': "Bearer "+access_token
        }
    response = requests.request("PUT", url, data=payload, headers=headers)
    response_json = response.json()
    success = response_json["success"]
    code = response_json["code"]
    if (success == True):
        return HttpResponse(code)
    else:
        return get_claimed_code_for_user_with_token(username, access_token)

@login_required
@require_http_methods(['GET'])
def get_claimed_code_for_user(request, username):

    access_token = get_access_token()
    return get_claimed_code_for_user_with_token(username, access_token)

def get_access_token():
    url = settings.CF_PLATFORM_TOKEN_ENDPOINT
    payload = {
        "client_id": settings.CF_PLATFORM_CLIENT_ID,
        "client_secret": settings.CF_PLATFORM_CLIENT_SECRET,
        "username": settings.CF_PLATFORM_USERNAME,
        "password": settings.CF_PLATFORM_PASSWORD,
        "grant_type": "password"
    }
    headers = {
        'content-type': "application/x-www-form-urlencoded"
        }     
    response = requests.request("POST", url, data=payload, headers=headers)
    response_json = response.json()
    access_token = response_json["access_token"]
    return access_token

def get_claimed_code_for_user_with_token(username, access_token):
    url = "%s/api/offers/%s/codes" % (settings.CF_PLATFORM_API, settings.CF_PLATFORM_CURRENT_OFFER)
    querystring = {"ownerId":username}
    headers = {
        'authorization': "Bearer "+access_token
        }
    response = requests.request("GET", url, headers=headers, params=querystring)
    response_json = response.json()
    code = response_json["code"]
    return HttpResponse(code)