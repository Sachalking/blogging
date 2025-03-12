document.addEventListener('DOMContentLoaded', () => {
    const postsPerPage = 5;
    const posts = document.querySelectorAll('.blog-post');
    const totalPages = Math.ceil(posts.length / postsPerPage);
    let currentPage = 1;

    function showPage(pageNum) {
        // Hide all posts
        posts.forEach(post => post.style.display = 'none');
        
        // Show posts for current page
        const start = (pageNum - 1) * postsPerPage;
        const end = start + postsPerPage;
        
        for (let i = start; i < end && i < posts.length; i++) {
            posts[i].style.display = 'block';
        }

        // Update pagination buttons
        updatePaginationButtons(pageNum);
    }

    function updatePaginationButtons(currentPage) {
        const paginationDiv = document.querySelector('.pagination');
        paginationDiv.innerHTML = `
            <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
                    onclick="return false;" id="prevBtn">
                Previous
            </button>
            <button class="pagination-btn page-number ${currentPage === 1 ? 'active' : ''}" 
                    onclick="return false;">1</button>
            <button class="pagination-btn page-number ${currentPage === 2 ? 'active' : ''}" 
                    onclick="return false;">2</button>
            <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
                    onclick="return false;" id="nextBtn">
                Next
            </button>
        `;
    }

    // Initial page load
    showPage(1);

    // Event listeners for pagination
    document.querySelector('.pagination').addEventListener('click', (e) => {
        if (e.target.classList.contains('disabled')) return;

        if (e.target.id === 'prevBtn' && currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        } 
        else if (e.target.id === 'nextBtn' && currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
        else if (e.target.classList.contains('page-number')) {
            currentPage = parseInt(e.target.textContent);
            showPage(currentPage);
        }

        // Scroll to top of blog section
        window.scrollTo({ top: document.querySelector('.blog-post').offsetTop - 100, behavior: 'smooth' });
    });
}); 