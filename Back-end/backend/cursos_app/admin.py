from django.contrib import admin
from .models import Curso, Aula, Estudante

# Register your models here.
admin.site.register(Curso)
admin.site.register(Aula)
admin.site.register(Estudante)