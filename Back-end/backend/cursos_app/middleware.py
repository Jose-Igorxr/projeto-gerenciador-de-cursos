import time
from django.utils.deprecation import MiddlewareMixin
from django.http import HttpResponse
from django.conf import settings

class LoggingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        request.start_time = time.time()

    def process_response(self, request, response):
        duration = time.time() - request.start_time
        print(f'Request para {request.path} levaram {duration} segundos')
        return response
    

class MaintenanceModeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if settings.MAINTENANCE_MODE:
            print("Site em Manutenção")
            return HttpResponse("Site em manutenção!", status=503)
        response = self.get_response(request)
        return response