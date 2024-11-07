from rest_framework import permissions

class IsInSpecificGroup(permissions.BasePermission):
    nome_do_grupo = 'curso'
    def has_permission (self, request, view):
        return request.user.groups.filter( name=self.nome_do_grupo).exists()