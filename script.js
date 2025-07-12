document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '1rem 5%';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.borderBottom = '1px solid rgba(230, 230, 230, 0.9)';
        } else {
            header.style.padding = '1.5rem 5%';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
            header.style.borderBottom = '1px solid rgba(230, 230, 230, 0.7)';
        }
    });
    
    // Toggle dropdown on mobile
    const filterBtn = document.querySelector('.filter-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    // For mobile devices, handle click instead of hover
    if (window.innerWidth <= 768) {
        filterBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            dropdownContent.style.display = 'none';
        });
    }
    
    // Request button click animation
    const requestBtns = document.querySelectorAll('.request-btn');
    requestBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.textContent = 'Requested';
            this.style.backgroundColor = '#28a745';
            this.disabled = true;
            
            // Reset after 3 seconds for demo purposes
            setTimeout(() => {
                this.textContent = 'Request';
                this.style.backgroundColor = '#4a6bff';
                this.disabled = false;
            }, 3000);
        });
    });
    
    // Search functionality (basic implementation)
    const searchInput = document.querySelector('.search-input');
    const cards = document.querySelectorAll('.card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const skills = card.querySelectorAll('.skill-tag');
            let skillsText = '';
            
            skills.forEach(skill => {
                skillsText += skill.textContent.toLowerCase() + ' ';
            });
            
            if (name.includes(searchTerm) || skillsText.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}); 