from django.contrib import admin
from .models import DalUser, Chaplain

# Register your models here.
@admin.register(DalUser)
class DalUserAdmin(admin.ModelAdmin):
    list_select_related = ['user']
    list_per_page = 10
    ordering = ['user__first_name', 'user__last_name']

@admin.register(Chaplain)
class ChaplainAdmin(admin.ModelAdmin):
    list_select_related = ['user']
    list_per_page = 10
    ordering = ['user__first_name', 'user__last_name']