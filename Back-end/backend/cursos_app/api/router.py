from rest_framework import routers
from cursos_app.api import viewsets

router = routers.DefaultRouter()
router.register('curso', viewsets.CursoViewSet)
router.register('aula', viewsets.AulaViewSet)
router.register('estudante', viewsets.EstudanteViewSet)
