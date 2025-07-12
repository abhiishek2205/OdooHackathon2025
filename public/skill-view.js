document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters to load specific user data
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    
    // If we have a user ID, load that user's data
    if (userId) {
        loadUserData(userId);
    } else {
        // For demo purposes, we'll use the default data already in the HTML
        console.log('No user ID provided, using default data');
    }
    
    // Initialize action buttons
    initActionButtons();
});

// Load user data from API or localStorage (mock implementation)
function loadUserData(userId) {
    // In a real application, this would be an API call
    // For demo purposes, we'll use mock data
    
    // This is just a simulation - in a real app you would fetch from a server
    const mockUsers = {
        '1': {
            name: 'Aarav Sharma',
            location: 'Mumbai, India',
            skillsOffered: ['React', 'JavaScript', 'Node.js', 'HTML', 'CSS'],
            skillsWanted: ['Docker', 'TypeScript', 'GraphQL'],
            availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
            rating: 4.8,
            reviewCount: 24,
            profileImage: 'https://randomuser.me/api/portraits/men/44.jpg'
        },
        '2': {
            name: 'Ishita Verma',
            location: 'Bangalore, India',
            skillsOffered: ['Python', 'Flask', 'SQL', 'Git'],
            skillsWanted: ['React Native', 'AWS', 'MongoDB'],
            availability: ['Monday', 'Wednesday', 'Friday'],
            rating: 4.2,
            reviewCount: 18,
            profileImage: 'https://randomuser.me/api/portraits/women/32.jpg'
        },
        '3': {
            name: 'Rohan Desai',
            location: 'Delhi, India',
            skillsOffered: ['Java', 'Spring Boot', 'MySQL', 'REST APIs'],
            skillsWanted: ['Kubernetes', 'JavaScript', 'Tailwind CSS'],
            availability: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
            rating: 3.9,
            reviewCount: 12,
            profileImage: 'https://randomuser.me/api/portraits/men/68.jpg'
        },
        '4': {
            name: 'Meera Nair',
            location: 'Chennai, India',
            skillsOffered: ['C++', 'Data Structures', 'Algorithms', 'Competitive Programming'],
            skillsWanted: ['Web Development', 'Django', 'GitHub Actions'],
            availability: ['Monday', 'Tuesday', 'Wednesday'],
            rating: 4.5,
            reviewCount: 15,
            profileImage: 'https://randomuser.me/api/portraits/women/45.jpg'
        },
        '5': {
            name: 'Vikram Joshi',
            location: 'Hyderabad, India',
            skillsOffered: ['Android', 'Kotlin', 'Firebase', 'Figma'],
            skillsWanted: ['React', 'Redux', 'Docker'],
            availability: ['Wednesday', 'Thursday', 'Friday'],
            rating: 4.7,
            reviewCount: 22,
            profileImage: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
        '6': {
            name: 'Nikita Rao',
            location: 'Pune, India',
            skillsOffered: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
            skillsWanted: ['TypeScript', 'Next.js', 'Firebase'],
            availability: ['Monday', 'Thursday', 'Friday', 'Saturday'],
            rating: 4.3,
            reviewCount: 19,
            profileImage: 'https://randomuser.me/api/portraits/women/76.jpg'
        },
        '7': {
            name: 'Karan Malhotra',
            location: 'Kolkata, India',
            skillsOffered: ['DevOps', 'CI/CD', 'AWS', 'Terraform'],
            skillsWanted: ['Go', 'System Design', 'Java'],
            availability: ['Tuesday', 'Wednesday', 'Saturday'],
            rating: 4.9,
            reviewCount: 27,
            profileImage: 'https://randomuser.me/api/portraits/men/54.jpg'
        },
        '8': {
            name: 'Priya Kapoor',
            location: 'Ahmedabad, India',
            skillsOffered: ['Swift', 'iOS Development', 'UI/UX Design', 'Xcode'],
            skillsWanted: ['Backend Development', 'Node.js', 'MongoDB'],
            availability: ['Monday', 'Friday', 'Saturday', 'Sunday'],
            rating: 4.1,
            reviewCount: 14,
            profileImage: 'https://randomuser.me/api/portraits/women/28.jpg'
        }
    };
    
    // Get the user data
    const userData = mockUsers[userId];
    
    if (userData) {
        // Update the UI with the user data
        updateUserInterface(userData);
    } else {
        console.error('User not found');
    }
}

// Update the UI with user data
function updateUserInterface(userData) {
    // Update name and location
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('user-location').textContent = userData.location;
    
    // Update profile image
    document.getElementById('profile-image').src = userData.profileImage;
    
    // Update skills offered
    const skillsOfferedContainer = document.querySelector('.skills-offered .skill-tags');
    skillsOfferedContainer.innerHTML = '';
    userData.skillsOffered.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.classList.add('skill-tag');
        skillTag.textContent = skill;
        skillsOfferedContainer.appendChild(skillTag);
    });
    
    // Update skills wanted
    const skillsWantedContainer = document.querySelector('.skills-wanted .skill-tags');
    skillsWantedContainer.innerHTML = '';
    userData.skillsWanted.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.classList.add('skill-tag');
        skillTag.textContent = skill;
        skillsWantedContainer.appendChild(skillTag);
    });
    
    // Update availability
    const availabilityContainer = document.querySelector('.availability-days');
    availabilityContainer.innerHTML = '';
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    days.forEach((day, index) => {
        const dayElement = document.createElement('span');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        
        // Check if the user is available on this day
        if (userData.availability.includes(fullDays[index])) {
            dayElement.classList.add('available');
        }
        
        availabilityContainer.appendChild(dayElement);
    });
    
    // Update rating
    document.querySelector('.rating-score').textContent = userData.rating;
    document.querySelector('.rating-count').textContent = `Based on ${userData.reviewCount} reviews`;
    
    // Update stars based on rating
    updateStars(userData.rating);
}

// Update star display based on rating
function updateStars(rating) {
    const starsContainer = document.querySelector('.rating-stars');
    starsContainer.innerHTML = '';
    
    // Create full stars
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
        const star = document.createElement('i');
        star.classList.add('fas', 'fa-star');
        starsContainer.appendChild(star);
    }
    
    // Create half star if needed
    if (rating % 1 >= 0.5) {
        const halfStar = document.createElement('i');
        halfStar.classList.add('fas', 'fa-star-half-alt');
        starsContainer.appendChild(halfStar);
    }
    
    // Create empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        const emptyStar = document.createElement('i');
        emptyStar.classList.add('far', 'fa-star');
        starsContainer.appendChild(emptyStar);
    }
}

// Initialize action buttons
function initActionButtons() {
    const requestBtn = document.querySelector('.request-btn');
    const messageBtn = document.querySelector('.message-btn');
    
    if (requestBtn) {
        requestBtn.addEventListener('click', function() {
            // Get the user ID from the URL
            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get('id');
            
            // Navigate to the choose-skill page with the user ID
            window.location.href = `choose-skill.html?id=${userId}`;
        });
    }
    
    if (messageBtn) {
        messageBtn.addEventListener('click', function() {
            alert('Message feature coming soon!');
        });
    }
} 