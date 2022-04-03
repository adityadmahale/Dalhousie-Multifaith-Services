from django.db import models
from django.contrib.auth.models import (
    AbstractUser,
    UserManager as BaseUserManager,
)
from django.utils.translation import gettext_lazy as _


# https://www.pygopar.com/how-to-remove-username-from-django-user-model
# Inherit from the django authentication module
class UserManager(BaseUserManager):
    """User Manager that knows how to create
    users via email instead of username"""

    def _create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email


# Location for uploading profile images
def upload_location(instance, filename):
    filebase, extension = filename.split(".")
    return "profile/images/%s.%s" % (instance.user.id, extension)


# User image model
class UserImage(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="image"
    )
    image = models.ImageField(upload_to=upload_location)
