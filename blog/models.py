from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class Blog(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='blogs/')
    date_of_post = models.DateTimeField(default=now)
    date_of_edit = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blogs')
    content = models.TextField()

    @property
    def username(self):
        return self.user.username

    def __str__(self):
        return self.title


class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    date_of_comment = models.DateTimeField(default=now)

    @property
    def username(self):
        return self.user.username

    def __str__(self):
        return f"Comment by {self.username} on {self.blog.title}"


class Poll(models.Model):
    topic = models.CharField(max_length=255)
    user_created = models.ForeignKey(User, on_delete=models.CASCADE, related_name='polls')
    created_at_date = models.DateTimeField(default=now)
    option1 = models.CharField(max_length=255)
    option2 = models.CharField(max_length=255)
    option3 = models.CharField(max_length=255, blank=True, null=True)
    option4 = models.CharField(max_length=255, blank=True, null=True)
    votes_op1 = models.PositiveIntegerField(default=0)
    votes_op2 = models.PositiveIntegerField(default=0)
    votes_op3 = models.PositiveIntegerField(default=0)
    votes_op4 = models.PositiveIntegerField(default=0)

    @property
    def username(self):
        return self.user_created.username

    def __str__(self):
        return self.topic


class Meme(models.Model):
    topic = models.CharField(max_length=255)
    image = models.ImageField(upload_to='memes/')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='memes')
    content = models.TextField(blank=True, null=True)

    @property
    def username(self):
        return self.user.username

    def __str__(self):
        return self.topic
