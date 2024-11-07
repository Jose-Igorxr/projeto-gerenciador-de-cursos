from rest_framework import viewsets, permissions
from cursos_app import models
from cursos_app.api import serializers
# from cursos_app.api.permissions import IsInSpecificGroup
import logging

logger = logging.getLogger('custom')

#Viewsets
class CursoViewSet(viewsets.ModelViewSet):
    queryset = models.Curso.objects.all()
    serializer_class = serializers.CursoSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        logger.info(f'Novo curso criado: {self.request.data["nome"]}')
        serializer.save()
        
    def perform_update(self, serializer):
        logger.info(f'Curso atualizado: {self.request.data["nome"]}')
        serializer.save()
    
    def perform_destroy(self, instance):
        nome_curso = instance.nome  
        logger.warning(f'Curso excluído: {nome_curso}')
        instance.delete()
        
        

class AulaViewSet(viewsets.ModelViewSet):
    queryset = models.Aula.objects.all()
    serializer_class = serializers.AulaSerializer
    
    def perform_create(self, serializer):
        logger.info(f'Nova Aula criada: {self.request.data["nome"]}')
        serializer.save()
    
    def perform_update(self, serializer):
        logger.info(f'Aula atualizado: {self.request.data["nome"]}')
        serializer.save()
        
    def perform_destroy(self, instance):
        nome_aula = instance.nome  
        logger.warning(f'Aula excluída: {nome_aula}')
        instance.delete()
    
    
    
class EstudanteViewSet(viewsets.ModelViewSet):
    queryset = models.Estudante.objects.all()
    serializer_class = serializers.EstudanteSerializer
    
    def perform_create(self, serializer):
        logger.info(f'Novo estudante criado: {self.request.data["nome"]}')
        serializer.save()
        
    def perform_update(self, serializer):
        logger.info(f'Estudante atualizado: {self.request.data["nome"]}')
        serializer.save()
        
    def perform_destroy(self, instance):
        nome_estudante = instance.nome  
        logger.warning(f'Estudante excluído: {nome_estudante}')
        instance.delete()