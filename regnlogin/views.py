from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from django.shortcuts import render
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

#Register new user to DB
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

#Login the user to generate the access token manually 
class LoginView(generics.GenericAPIView):
    def get(self, request):
        return render(request, 'login.html')
    
    # Manual way of login and returning token and userdata
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user).data  # Serialize user data
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_data,  # Include user details
            })
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)    

#Render Dashboard and user details
class HomeView(APIView):
    def get(self, request, *args, **kwargs):
        # No authentication required for GET request, just render the home page
        return render(request, 'home.html')

    def post(self, request, *args, **kwargs):
        # Apply JWTAuthentication and permission checks only for POST requests
        self.authentication_classes = [JWTAuthentication]
        self.permission_classes = [IsAuthenticated]

        # Manually check authentication and permission for POST
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

        # If authenticated, return user data
        user_data = {
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email
        }
        return Response(user_data)

# Manually delete the token
class LogoutView(generics.GenericAPIView):
    def post(self, request):
        # Extract the refresh token from the request body
        refresh_token = request.data.get('refresh')
        print(refresh_token)
        if not refresh_token:
            return Response({'error': 'Refresh token is missing'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Check if the token exists in OutstandingToken
            token_obj = OutstandingToken.objects.get(token=refresh_token)
            
            # Check if the token is already blacklisted
            if BlacklistedToken.objects.filter(token=token_obj).exists():
                token_obj.delete()
                return Response({'error': 'Token has already been blacklisted'}, status=status.HTTP_400_BAD_REQUEST)

            # Blacklist the token
            BlacklistedToken.objects.create(token=token_obj)

            # Delete the token from OutstandingToken
            token_obj.delete()

            return Response({'success': 'Token has been blacklisted and deleted'}, status=status.HTTP_205_RESET_CONTENT)
        
        except OutstandingToken.DoesNotExist:
            return Response({'error': 'Token does not exist or has already been blacklisted'}, status=status.HTTP_400_BAD_REQUEST)
        except TokenError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

# For testing/learning purposes only 
# class Home(APIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         content = {'message': 'Hello, World!'}
#         return Response(content)        