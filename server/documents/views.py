# IMPORTS
from .models import Document
from .serializers import DocumentSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.contrib.auth import get_user_model


class DocumentManagementView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        data = {
            "text": request.data.get("text"),
            "context": request.data.get("context"),
            "host": request.user.id,
            "modified_by": request.user.id,
        }

        serializer = DocumentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # View by ID or ALL
    def get(self, request, id=None, *args, **kwargs):
        try:
            if id is not None:
                payload = Document.objects.filter(id=id).values().first()
                if payload:
                    return Response(payload, status=status.HTTP_200_OK)
                else:
                    return Response(
                        {"error": "Document not found."},
                        status=status.HTTP_404_NOT_FOUND,
                    )
            else:
                payload = Document.objects.all().order_by("-created_at").values()
                return Response(payload, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # Update
    def put(self, request, id, *args, **kwargs):
        try:
            queryset = Document.objects.get(id=id)
        except Document.DoesNotExist:
            return Response(
                {"error": "Document not found."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = DocumentSerializer(queryset, data=request.data)
        if serializer.is_valid():
            User = get_user_model()
            user = request.user
            if not isinstance(user, User):
                user = None
            # Updating the "modified_by" with the user details
            # who is modifying the document
            serializer.save(modified_by=user)

            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
