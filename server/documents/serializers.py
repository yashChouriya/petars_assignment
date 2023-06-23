from .models import Document
from accounts.models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model


# Fetching user model from accounts
User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name')


class DocumentSerializer(serializers.ModelSerializer):
    host_email = serializers.CharField(source="host.email", required=False)
    host_first_name = serializers.CharField(source="host.first_name", required=False)
    host_last_name = serializers.CharField(source="host.last_name", required=False)
    modified_by_email = serializers.CharField(source="modified_by.email", required=False)
    modified_by_first_name = serializers.CharField(source="modified_by.first_name", required=False)
    modified_by_last_name = serializers.CharField(source="modified_by.last_name", required=False)
    
    class Meta:
        model = Document
        fields = (
            "text",
            "context",
            "host",
            "host_email",
            "host_first_name",
            "host_last_name",
            "modified_by",
            "modified_by_email",
            "modified_by_first_name",
            "modified_by_last_name",
            "created_at",
            "updated_at",
        )
