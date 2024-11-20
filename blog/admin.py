from django.contrib import admin
from .models import Blog, Comment, Poll, Meme

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'date_of_post', 'date_of_edit')
    search_fields = ('title', 'user__username')
    list_filter = ('date_of_post', 'date_of_edit')
    ordering = ('-date_of_post',)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('blog', 'user', 'content', 'date_of_comment')
    search_fields = ('blog__title', 'user__username', 'content')
    list_filter = ('date_of_comment',)
    ordering = ('-date_of_comment',)


@admin.register(Poll)
class PollAdmin(admin.ModelAdmin):
    list_display = ('topic', 'user_created', 'created_at_date', 'option1', 'option2')
    search_fields = ('topic', 'user_created__username')
    list_filter = ('created_at_date',)
    ordering = ('-created_at_date',)


@admin.register(Meme)
class MemeAdmin(admin.ModelAdmin):
    list_display = ('topic', 'user', 'image')
    search_fields = ('topic', 'user__username')
    list_filter = ('user',)
    ordering = ('-id',)
