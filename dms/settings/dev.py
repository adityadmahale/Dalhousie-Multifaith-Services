from .common import *  # NOQA

DEBUG = True

SECRET_KEY = (
    "django-insecure-v0q%9hsdzu$yj@2zq&%*x$(ti+ob7vbml=ykl2ft^z=-_yb9g+"
)


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",  # NOQA
    }
}
