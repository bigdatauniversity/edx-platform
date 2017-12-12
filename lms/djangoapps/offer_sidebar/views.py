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
    url = "https://accounts.cognitivefaculty.com/auth/realms/master/protocol/openid-connect/token"
    payload = "client_id=cognitive-faculty-platform-api&client_secret=1c87cba6-79e7-43ee-882a-5993a6cbae5f&username=xu.ji%40ibm.com&password=t6rQhJE4*C4f&grant_type=password"
    headers = {
        'content-type': "application/x-www-form-urlencoded",
        'cache-control': "no-cache",
        'postman-token': "f2f77bec-7243-2548-9469-1359ecc394b4"
        }     
    response = requests.request("POST", url, data=payload, headers=headers)
    return HttpResponse(response["access_token"])

