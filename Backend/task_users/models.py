from django.db import models
from django.contrib.auth.models import AbstractUser
from PIL import Image

class CustomUser(AbstractUser):
    username = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    birth_date = models.DateField(null=True, blank=True, verbose_name="Date of birth")
    address = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to="user_images", default="default.png")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self) -> str:
        return f"{self.username}'s profile"
    
    # Specify unique related names for the conflicting fields
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        related_name='custom_user_groups'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        related_name='custom_user_permissions'
    )
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        try:
            img = Image.open(self.image.path)
            max_size = (300, 300)
            
            if img.height > max_size[1] or img.width > max_size[0]:
                img.thumbnail(max_size)
                img.save(self.image.path)
                
        except Exception as e:
            print("Error occurred while resizing image!", e)

    