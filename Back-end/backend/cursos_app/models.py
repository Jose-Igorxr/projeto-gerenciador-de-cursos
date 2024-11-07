from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver


class BaseModelQuerySet(models.QuerySet):
    def delete(self):
        self.update(deleted_at=timezone.now() , is_active=False)

class BaseManager(models.Manager):
    def get_queryset (self):
        return BaseModelQuerySet( self.model, using=self._db).filter( deleted_at__isnull =True, is_active=True)

class BaseModel(models.Model):
    created_at = models.DateTimeField( auto_now_add =True)
    updated_at = models.DateTimeField( auto_now=True)
    deleted_at = models.DateTimeField( editable=False, blank=True, null=True)
    is_active = models.BooleanField( editable=False, default=True)
    
    objects = BaseManager()
    
    class Meta:
        abstract = True
    
    def delete(self, **kwargs):
        self.is_active = False
        self.deleted_at = timezone.now()
        self.save()
        
    def hard_delete (self, **kwargs):
        super(BaseModel, self).delete(**kwargs)

class Curso(BaseModel):
    nome = models.CharField(max_length=200)
    descricao = models.TextField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    quantidades_aulas = models.IntegerField(null=True)
    capa_curso = models.ImageField(upload_to='imagens_curso/', null=True, blank=True)
    
    #para o signal
    created_at = models.DateTimeField(auto_now_add=True)
    pub_date = models.DateTimeField(null=True, blank=True, auto_now_add=True)

class Aula(BaseModel):
    curso = models.ForeignKey(Curso, related_name='aulas', on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)
    duracao = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    capa_aula = models.ImageField(upload_to='imagens_aula/', null=True, blank=True)
    
    #para o signal
    created_at = models.DateTimeField(auto_now_add=True)
    pub_date = models.DateTimeField(null=True, blank=True, auto_now_add=True)

class Estudante(BaseModel):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    cursos = models.ManyToManyField(Curso, related_name='estudantes')
    nome_estudante = models.CharField(max_length=150, null=True)
    idade_estudante = models.IntegerField(null=True)
    foto_estudante = models.ImageField(upload_to='imagens_estudante/', null=True, blank=True)
    
    #para o signal
    created_at = models.DateTimeField(auto_now_add=True)
    pub_date = models.DateTimeField(null=True, blank=True, auto_now_add=True)
    
    
