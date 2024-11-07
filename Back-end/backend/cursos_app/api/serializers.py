from rest_framework import serializers
from cursos_app import models

#Serializers
class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Curso
        fields = '__all__'

class AulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Aula
        fields = '__all__'

class EstudanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Estudante
        fields = '__all__'