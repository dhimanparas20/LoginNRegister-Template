from rest_framework import serializers
from .models import Blog, Comment, Poll, Meme


class BlogSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Blog
        fields = ['id', 'title', 'image', 'date_of_post', 'date_of_edit', 'user', 'username', 'content']


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Comment
        fields = ['id', 'blog', 'user', 'username', 'content', 'date_of_comment']


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = [
            'id', 'topic', 'user_created', 'created_at_date',
            'option1', 'option2', 'option3', 'option4',
            'votes_op1', 'votes_op2', 'votes_op3', 'votes_op4'
        ]


class MemeSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Meme
        fields = ['id', 'topic', 'image', 'user', 'username', 'content']
