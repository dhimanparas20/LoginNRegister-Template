// Initialize lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    });
    
    // Share to WhatsApp functionality
    const shareButton = document.getElementById('shareButton');
    shareButton?.addEventListener('click', () => {
    const blogURL = encodeURIComponent(window.location.href);
    const blogTitle = encodeURIComponent("The Future of Artificial Intelligence");
    const whatsappURL = `https://wa.me/?text=${blogTitle} - Read more at: ${blogURL}`;
    window.open(whatsappURL, '_blank');
    });
    
    // Like button functionality
    const likeButton = document.getElementById('likeButton');
    const likeCount = document.getElementById('likeCount');
    let likes = 0;
    
    likeButton?.addEventListener('click', () => {
    likes++;
    if (likeCount) likeCount.textContent = likes;
    });
    
    // Comment section functionality
    const addCommentButton = document.getElementById('addCommentButton');
    const commentInput = document.getElementById('commentInput');
    const commentList = document.getElementById('commentList');
    
    addCommentButton?.addEventListener('click', () => {
    const commentText = commentInput?.value.trim();
    if (commentText) {
    const comment = document.createElement('div');
    comment.classList.add('comment');
    comment.textContent = commentText;
    commentList?.appendChild(comment);
    commentInput.value = '';
    }
    });
    
    // Display blog data directly from the blog variable
    // document.addEventListener('DOMContentLoaded', () => {
    // const blogContainer = document.getElementById('blogContainer'); // Blog container element
    // if (blogContainer && typeof blog === 'object') {
    // const { title, content } = blog; // Assuming the blog variable contains title and content
    // if (title && content) {
    // blogContainer.innerHTML = `
    // <h1>${title}</h1>
    // <p>${content}</p>
    // `;
    // } else {
    // blogContainer.innerHTML = '<p>No blog content available.</p>';
    // }
    // }
    // });
    
    // Spinner function (to show or hide loader)
    function spinner(show) {
    const spinnerElement = document.getElementById('spinner');
    if (spinnerElement) {
    spinnerElement.style.display = show ? 'block' : 'none';
    }
    }
    
    // Helper function to get CSRF token from cookies
    function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.substring(0, name.length + 1) === (name + '=')) {
    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    break;
    }
    }
    }
    return cookieValue;
    }