const baseURL = window.location.origin + '/';
$(document).ready(function () {
    spinner(0)
    // Toggle between login and register forms
    $('#loginTab').click(function () {
        $('#loginForm').addClass('active');
        $('#registerForm').removeClass('active');
        $('#loginTab').addClass('active');
        $('#registerTab').removeClass('active');
    });

    $('#registerTab').click(function () {
        $('#registerForm').addClass('active');
        $('#loginForm').removeClass('active');
        $('#registerTab').addClass('active');
        $('#loginTab').removeClass('active');
    });

    // AJAX for login
    $('#loginForm').submit(function (e) {
        e.preventDefault();
        const loginData = {
            username: $('#loginUsername').val(),
            password: $('#loginPassword').val(),
        };
        spinner(1)
        $.ajax({
            type: 'POST',
            url: `${baseURL}api/token/`,
            contentType: 'application/json',
            data: JSON.stringify(loginData),
            success: function (response) {
                spinner(0)
                console.log('Login success:', response);
                localStorage.setItem('accessToken', response.access);
                localStorage.setItem('refreshToken', response.refresh);
                window.location.href = `/`; 
            },
            error: function (error) {
                spinner(0)
                console.log('Login error:', error);
            }
        });
    });

    // AJAX for register
    $('#registerForm').submit(function (e) {
        e.preventDefault();
        const registerData = {
            first_name: $('#firstName').val(),
            last_name: $('#lastName').val(),
            email: $('#email').val(),
            username: $('#registerUsername').val(),
            password: $('#registerPassword').val(),
        };
        spinner(1)

        $.ajax({
            type: 'POST',
            url: '/register/',
            contentType: 'application/json',
            data: JSON.stringify(registerData),
            success: function (response) {
                spinner(0)
                // console.log('Registration success:', response);
                alert('Registration success');
                location.reload(); 

            },
            error: function (error) {
                spinner(0)
                console.log('Registration error:', error);
            }
        });
    });
});

function spinner(value) {
    if (value === 1) {
        $('.loader').removeClass('hidden');
    } else if (value === 0) {
        $('.loader').addClass('hidden');
    }
}
