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

    url = "https://platform-staging.cognitivefaculty.com/api/offers/5a2efc57bb8046001f6fcba8/codes/claim"
    payload = "{\n\t\"ownerId\": \"%s\"\n}" % (username)
    headers = {
        'content-type': "application/json",
        'authorization': "Bearer "+access_token,
        'cache-control': "no-cache",
        'postman-token': "baecdee8-fe53-a5ef-a70b-8e3e8919c979"
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
    url = "https://accounts.cognitivefaculty.com/auth/realms/master/protocol/openid-connect/token"
    payload = "client_id=cognitive-faculty-platform-api&client_secret=1c87cba6-79e7-43ee-882a-5993a6cbae5f&username=xu.ji%40ibm.com&password=t6rQhJE4*C4f&grant_type=password"
    headers = {
        'content-type': "application/x-www-form-urlencoded",
        'cache-control': "no-cache",
        'postman-token': "f2f77bec-7243-2548-9469-1359ecc394b4"
        }     
    response = requests.request("POST", url, data=payload, headers=headers)
    response_json = response.json()
    access_token = response_json["access_token"]
    return access_token

def get_claimed_code_for_user_with_token(username, access_token):
    url = "https://platform-staging.cognitivefaculty.com/api/offers/5a2efc57bb8046001f6fcba8/codes"
    querystring = {"ownerId":username}
    headers = {
        'authorization': "Bearer "+access_token,
        'cache-control': "no-cache",
        'postman-token': "e4dde515-e073-3438-d142-02757ae8e237"
        }
    response = requests.request("GET", url, headers=headers, params=querystring)
    response_json = response.json()
    code = response_json["code"]
    return HttpResponse(code)