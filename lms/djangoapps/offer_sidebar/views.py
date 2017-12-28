""" Views for IBM cloud offer sidebar. """

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django_countries import countries
from django.views.decorators.csrf import ensure_csrf_cookie

from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.http import Http404, HttpResponse, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
import json
import requests
import logging

log = logging.getLogger(__name__)

@login_required
@ensure_csrf_cookie
@require_http_methods(['GET'])
def get_offer_code(request):

    access_token = get_access_token()

    url = "%s/offers/%s/codes/claim" % (settings.CF_PLATFORM_API, settings.CF_PLATFORM_CURRENT_OFFER)
    payload = {
        "ownerId": request.user.username
    }
    headers = {
        'content-type': "application/json",
        'authorization': "Bearer "+access_token
        }
    try:
        response = requests.request("PUT", url, data=json.dumps(payload), headers=headers)
        response_json = response.json()
        success = response_json["success"]
        if (success == True):
            code = response_json["code"]
            return HttpResponse(code)
        else:
            return get_claimed_code_for_user_with_token(request.user.username, access_token)
    except:
        log.exception("Failed to get offer code for user %s", request.user.username)
        return HttpResponseBadRequest()

@login_required
@ensure_csrf_cookie
@require_http_methods(['GET'])
def get_claimed_code_for_user(request):

    access_token = get_access_token()
    return get_claimed_code_for_user_with_token(request.user.username, access_token)

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
    url = "%s/offers/%s/codes" % (settings.CF_PLATFORM_API, settings.CF_PLATFORM_CURRENT_OFFER)
    querystring = {"ownerId":username}
    headers = {
        'authorization': "Bearer "+access_token
        }
    response = requests.request("GET", url, headers=headers, params=querystring)
    response_json = response.json()
    try:
        if (response_json["success"] == False):
            return HttpResponse("null")
        code = response_json["code"]
        return HttpResponse(code)
    except:
        log.exception("Failed to get claimed code for user %s", username)
        return HttpResponseBadRequest()
