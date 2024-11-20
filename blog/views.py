from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from .models import Blog, Comment, Poll, Meme
from .serializers import BlogSerializer, CommentSerializer, PollSerializer, MemeSerializer
from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here. 
def PollsView(request): 
      
    # render function takes argument  - request 
    # and return HTML as response 
    return render(request, "polls.html") 

# Create your views here. 
def MemeView(request): 
      
    # render function takes argument  - request 
    # and return HTML as response 
    return render(request, "meme.html")


def read_blog(request):
    blog_id = request.GET.get('id')  # Get the `id` from the query string
    if not blog_id:
        return render(request, 'error.html', {'message': 'Blog ID not provided.'})
    
    # Example: Fetch the blog data from the database (replace with your model)
    # Assuming a Blog model exists
    try:
        blog = Blog.objects.get(id=blog_id)
    except Blog.DoesNotExist:
        return render(request, 'error.html', {'message': 'Blog not found.'})

    # Render the template with the blog data
    return render(request, 'read.html', {'blog': blog})

class BlogViewSet(ModelViewSet):
    queryset = Blog.objects.all().order_by('-date_of_post')
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PollViewSet(ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user_created=self.request.user)


class MemeViewSet(ModelViewSet):
    queryset = Meme.objects.all()
    serializer_class = MemeSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
