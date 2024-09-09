# Django REST Authentication Template

This project is a **Django REST Framework**-based authentication template that provides a simple login and registration system using **Simple JWT** for token-based authentication. It is designed to be integrated into any future projects, allowing developers to have pre-built authentication functionality.

## Features

- **User Registration**: Users can sign up with a username, email, and password.
- **User Login**: Users can log in and receive an access token for authenticated requests.
- **JWT Token Authentication**: Uses Simple JWT for token-based authentication, providing access and refresh tokens.
- **Token Refresh**: Refresh tokens can be used to obtain new access tokens without re-login.
- **Logout**: Blacklists the token upon logout.
  
## Installation and Setup

### Prerequisites

- Docker installed on your machine
- Python 3.x
- Django 4.x
- Django REST Framework

### Running the Project

1. Clone this repository:
    ```bash
    git clone https://github.com/dhimanparas20/LoginNRegister-Template
    cd LoginNRegister-Template
    ```

2. Build and run the project using Docker:
    ```bash
    sudo docker compose up --build
    ```

This will start the Django server inside a Docker container, and the application will be accessible at `http://localhost:80/`.

### Endpoints

- **Register a new user**: `/api/register/`  
  Send a POST request with the following fields:
  ```json
  {
    "first_name": "<first_name>",
    "last_name": "<last_name>",
    "username": "<username>",
    "email": "<email>",
    "password": "<password>"
  }
  ```

-  **Login a User**: `/api/token/`  
  Send a POST request with the following fields:
  ```json
  {
  "username": "<username>",
  "password": "<password>"
  }
  ```
  ```json
  Response
  {
    "access": "<access-token>",
    "refresh": "<refresh-token>"
  }
  ```

-  **Refresh Token**: `/api/token/refresh/`  
  Send a POST request with the following fields:
  ```json
  {
  "refresh": "<refresh_token>"
  }
  ```

-  **Logout a user**: `/api/token/blacklist/`  
  Send a POST request with the following fields:
  ```json
  {
  "refresh": "<refresh_token>"
  }
  ```

## Authentication
- All secure endpoints require a valid JWT `access` token in the `Authorization` header:  
- Read [Documentaion]("https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html") for more details.

```json
Authorization: Bearer <access-token>
```

## Token Blacklisting
- The logout functionality blacklists the JWT token to ensure it cannot be reused after the user logs out.

## Customization
- Feel free to customize this template for your own needs. You can extend the user model, modify views, or enhance authentication mechanisms as needed.

## Further Development
- Add email verification on signup.
- Add social media login integration (Google, Facebook, etc.).
- Implement password reset functionality.

### License
 - This project is licensed under the [MIT License](https://opensource.org/license/mit). See the [LICENSE](LICENSE) file for details.

### Contact
- For any questions or issues, please open an issue on the GitHub repository.

