from django.urls import path
from .views import DocumentManagementView

urlpatterns = [
    path('add/', DocumentManagementView.as_view(), name='add-new-document'),
    path('view/', DocumentManagementView.as_view(), name='view-all-document'),
    path('view/<int:id>/', DocumentManagementView.as_view(), name='view-document'),
    path('update/<int:id>/', DocumentManagementView.as_view(), name='update-document'),
]