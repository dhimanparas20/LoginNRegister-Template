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
    // renderBlogPosts();
    $.ajax({
        url: `${baseUrl}/api/blogs/`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-CSRFToken': csrftoken // CSRF Token for safety
        },
        success: function(data) {
            spinner(0)
            console.log("----------------------------")
            console.log(data)
            renderBlogPosts(data);

            // Fill in user data in the HTML
            // $('#username').text(`Username: ${data.username}`);
            // $('#fullname').text(`Full Name: ${data.first_name} ${data.last_name}`);
            // $('#email').text(`Email: ${data.email}`);
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
    console.log("1----------------------------")
    console.log(accessToken)
    lucide.createIcons();

    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', toggleDarkMode);

    const menuToggle = document.getElementById('menuToggle');
    menuToggle.addEventListener('click', toggleMobileMenu);

    lucide.createIcons();
    
    // Mock data for blog posts
    // const blogPosts = [
    //     {
    //         id: 1,
    //         title: "The Future Guidance",
    //         image: "https://picsum.photos/seed/picsum/400/600",
    //         username: "Sandeep Sir",
    //         date: "2023-05-15",
    //     },
    //     {
    //         id: 2,
    //         title: "The Untold Stories",
    //         image: "https://picsum.photos/seed/picsum/400/600",
    //         username: "Aryan",
    //         date: "2023-05-14",
    //     },
    //     {
    //         id: 3,
    //         title: "directorate meeting",
    //         image: "https://picsum.photos/seed/picsum/400/600",
    //         username: "anonymous",
    //         date: "2023-05-13",
    //     },
    //     {
    //         id: 4,
    //         title: "The future Councelligs",
    //         image: "https://picsum.photos/seed/picsum/400/600",
    //         username: "Dr. Sanjay kalta",
    //         date: "2023-05-12",
    //     },
    //     {
    //         id: 5,
    //         title: "Visit to IIT mandi",
    //         image: "https://picsum.photos/seed/picsum/400/600",
    //         username: "shutterbug",
    //         date: "2023-05-11",
    //     },
    //     {
    //         id: 6,
    //         title: "The Impact of Social Media on Society",
    //         image: "https://picsum.photos/picsum/400/600",
    //         username: "socialite",
    //         date: "2023-05-10",
    //     },
    // ];

    // Function to create blog post cards
    function createBlogPostCard(post) {
        console.log("2----------------------------");
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
            <a href="http://localhost:5000/api/read?id=${post.id}">
                <img src="${post.image}" alt="${post.title}">
            </a>
            <div class="blog-card-content">
                <h2>${post.title}</h2>
                <div class="blog-card-meta">
                    <span>${post.username}</span>
                    <span>${post.date_of_post}</span>
                </div>
            </div>
        `;
        return card;
    }
    console.log("2------------------------------")

    // Function to render blog posts
    function renderBlogPosts(blogPosts) {
        console.log("3----------------------------")

        const blogGrid = document.getElementById('blogGrid');
        blogPosts.forEach(post => {
            const card = createBlogPostCard(post);
            blogGrid.appendChild(card);
        });
    }

    // Toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark');
        document.body.classList.toggle('light'); // Add a light class for light mode
        const darkModeToggle = document.getElementById('darkModeToggle');
        const icon = darkModeToggle.querySelector('i');
        
        if (document.body.classList.contains('dark')) {
            icon.setAttribute('data-lucide', 'sun');
            document.documentElement.style.setProperty('--text-color', '#ffffff'); // Set font color to white
        } else {
            icon.setAttribute('data-lucide', 'moon');
            document.documentElement.style.setProperty('--text-color', '#000000'); // Set font color to black
        }
        
        lucide.createIcons();
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.toggle('active');
        const menuToggle = document.getElementById('menuToggle');
        const icon = menuToggle.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    }

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
