# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from django.db.models.signals import Signal
# from .models import Curso, Aula, Estudante


# @receiver(post_save, sender=Curso)
# def update_pub_date (sender, instance, created, **kwargs):
#     print("Criando novo curso")
#     if created:
#         instance.pub_date = instance.created_at
#         instance.save(update_fields=['pub_date'])
#     print("ID do novo curso criado:" + instance.id)