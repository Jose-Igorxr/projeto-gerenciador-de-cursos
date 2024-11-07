from django.test import TestCase
from django.contrib.auth.models import User
from .models import Curso, Aula, Estudante

class ModelsTestCase(TestCase):

    def setUp(self):
        # Cria um usuário para associar ao Estudante
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        
        # Cria um curso para associar à Aula e ao Estudante
        self.curso = Curso.objects.create(
            nome='Curso de Python',
            descricao='Curso completo de Python',
            preco=199.99
        )

    def test_create_curso(self):
        curso = Curso.objects.create(
            nome='Curso de Django',
            descricao='Aprenda Django passo a passo',
            preco=299.99
        )
        self.assertEqual(curso.nome, 'Curso de Django')
        self.assertEqual(curso.descricao, 'Aprenda Django passo a passo')
        self.assertEqual(curso.preco, 299.99)

    def test_create_aula(self):
        aula = Aula.objects.create(
            curso=self.curso,
            titulo='Introdução ao Python'
        )
        self.assertEqual(aula.curso, self.curso)
        self.assertEqual(aula.titulo, 'Introdução ao Python')

    def test_create_estudante(self):
        estudante = Estudante.objects.create(usuario=self.user)
        estudante.cursos.add(self.curso)
        self.assertEqual(estudante.usuario, self.user)
        self.assertIn(self.curso, estudante.cursos.all())
