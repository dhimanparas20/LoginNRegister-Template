from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogViewSet, CommentViewSet, PollViewSet, MemeViewSet,read_blog,PollsView,MemeView

router = DefaultRouter()
router.register(r'blogs', BlogViewSet, basename='blog')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'polls', PollViewSet, basename='poll')
router.register(r'memes', MemeViewSet, basename='meme')

urlpatterns = [
    path('', include(router.urls)),
    path('read/', read_blog, name='read_blog'),
    path('poll/', PollsView, name='polls'),
    path('meme/', MemeView, name='memes'),
]
