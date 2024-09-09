// Initialize variables
const csrftoken = getCookie('csrftoken');
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
const baseUrl = window.location.origin;

// Don't open page if there is no token
if (!accessToken || !refreshToken) {
    window.location.href = "/login/";
} else {
    // Fetch user data from /
    spinner(1)
    $.ajax({
        url: `${baseUrl}/`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-CSRFToken': csrftoken // CSRF Token for safety
        },
        success: function(data) {
            spinner(0)
            // Fill in user data in the HTML
            $('#username').text(`Username: ${data.username}`);
            $('#fullname').text(`Full Name: ${data.first_name} ${data.last_name}`);
            $('#email').text(`Email: ${data.email}`);
        },
        error: function(xhr) {
            spinner(0)
            try {
                // Parse the responseText to JSON
                const response = JSON.parse(xhr.responseText);
        
                // Log the whole error response
                console.error('Error fetching user data:', response);
        
                //Refresh the token if it expires.
                if (response.code === "token_not_valid") { 
                    console.error('Error code:', response.code);
                   
                    // Send a request to refresh the token
                    spinner(1)
                    $.ajax({
                        url: `${baseUrl}/api/token/refresh/`,
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            refresh: refreshToken
                        }),
                        success: function(data) {
                            spinner(0)
                            // console.log('Token refreshed successfully:', data);
                            // Save the new access token in localStorage
                            localStorage.setItem('accessToken', data.access);
                            location.reload(); 

                        },
                        error: function(xhr) {
                            spinner(0)
                            console.error('Error refreshing token:', xhr.responseText);
                            // Handle token refresh failure (e.g., redirect to login)
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                            window.location.href = '/login/';
                        }
                    });
                }    
    
        
            } catch (e) {
                // In case the response is not in JSON format
                console.error('Error parsing response:', e);
            }
        }
    });
}

$(document).ready(function() {
    $('#logoutButton').on('click', function() {
        spinner(1)
        $.ajax({
            url: `${baseUrl}/api/token/blacklist/`,
            type: 'POST',
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-CSRFToken': csrftoken
            },
            data: JSON.stringify({ "refresh": refreshToken }),
            success: function (response) {
                // console.log(response);
                // Optionally, clear tokens and redirect to login page
                spinner(0)
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login/';
            },
            error: function (error) {
                spinner(0)
                console.log('Error:', error);
                alert('Logout failed. Please try again.');
            }
        });
    });
});

// Get CSRF Token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function spinner(value) {
    if (value === 1) {
        $('.loader').removeClass('hidden');
    } else if (value === 0) {
        $('.loader').addClass('hidden');
    }
}