from django.db import models
from django.contrib.auth.models import User


class Code(models.Model):
    code = models.CharField(max_length=150, null=True, blank=True)
    is_used = models.BooleanField(default=False)
