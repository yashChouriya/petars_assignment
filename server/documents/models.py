from django.db import models
from accounts.models import User

# DOCUMENT MODEL
class Document(models.Model):
    text = models.TextField()
    context = models.TextField()
    host = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="text_created_by",
        blank=True,
        null=True
    )
    modified_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="text_updated_by",
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text

    def save(self, *args, **kwargs):
        if self.pk:  
            original_host = Document.objects.get(pk=self.pk).host
            self.host = original_host
        super().save(*args, **kwargs)

