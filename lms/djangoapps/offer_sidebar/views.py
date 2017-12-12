""" Views for IBM cloud offer sidebar. """

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django_countries import countries

from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.http import Http404, HttpResponse
from django.views.decorators.http import require_http_methods
import json

@login_required
@require_http_methods(['GET'])
def get_offer_code(request, username):
    print username
    return HttpResponse("success")

