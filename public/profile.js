document.addEventListener('DOMContentLoaded', function() {
    // Tag input functionality for skills
    initTagInput('skills-offered');
    initTagInput('skills-wanted');
    
    // Profile picture functionality
    initProfilePicture();
    
    // Availability quick select buttons
    initAvailabilityButtons();
    
    // Real-time name and location update
    initRealTimeUpdates();
    
    // Form submission
    initFormSubmission();
});

// Initialize tag input functionality
function initTagInput(inputId) {
    const input = document.getElementById(inputId);
    const tagsContainer = document.getElementById(`${inputId}-tags`);
    
    if (!input || !tagsContainer) return;
    
    // Add tag when Enter is pressed
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            const value = this.value.trim();
            if (value) {
                addTag(value, tagsContainer, inputId);
                this.value = '';
            }
        }
    });
}

// Add a new tag
function addTag(text, container, inputId) {
    const tag = document.createElement('div');
    tag.classList.add('tag');
    
    const tagText = document.createElement('span');
    tagText.textContent = text;
    
    const removeBtn = document.createElement('span');
    removeBtn.classList.add('tag-remove');
    removeBtn.innerHTML = '&times;';
    removeBtn.addEventListener('click', function() {
        container.removeChild(tag);
    });
    
    tag.appendChild(tagText);
    tag.appendChild(removeBtn);
    container.appendChild(tag);
    
    // Add hidden input for form submission
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = `${inputId}[]`;
    hiddenInput.value = text;
    tag.appendChild(hiddenInput);
}

// Initialize profile picture functionality
function initProfilePicture() {
    const profilePicture = document.querySelector('.profile-picture');
    const fileInput = document.getElementById('profile-picture-input');
    const uploadBtn = document.getElementById('upload-picture');
    const removeBtn = document.getElementById('remove-picture');
    const profileImage = document.getElementById('profile-image');
    
    if (!profilePicture || !fileInput || !uploadBtn || !removeBtn || !profileImage) return;
    
    // Open file dialog when clicking on the profile picture or upload button
    profilePicture.addEventListener('click', function() {
        fileInput.click();
    });
    
    uploadBtn.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Handle file selection
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                profileImage.src = e.target.result;
            };
            
            reader.readAsDataURL(this.files[0]);
        }
    });
    
    // Remove profile picture
    removeBtn.addEventListener('click', function() {
        profileImage.src = 'media/default-profile.jpg';
        fileInput.value = '';
    });
}

// Initialize availability quick select buttons
function initAvailabilityButtons() {
    const weekdaysBtn = document.getElementById('select-weekdays');
    const weekendsBtn = document.getElementById('select-weekends');
    const everydayBtn = document.getElementById('select-everyday');
    const clearBtn = document.getElementById('clear-days');
    
    const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const weekends = ['saturday', 'sunday'];
    const allDays = [...weekdays, ...weekends];
    
    if (!weekdaysBtn || !weekendsBtn || !everydayBtn || !clearBtn) return;
    
    // Select weekdays
    weekdaysBtn.addEventListener('click', function() {
        setCheckboxes(weekdays, true);
        setCheckboxes(weekends, false);
    });
    
    // Select weekends
    weekendsBtn.addEventListener('click', function() {
        setCheckboxes(weekends, true);
        setCheckboxes(weekdays, false);
    });
    
    // Select all days
    everydayBtn.addEventListener('click', function() {
        setCheckboxes(allDays, true);
    });
    
    // Clear all days
    clearBtn.addEventListener('click', function() {
        setCheckboxes(allDays, false);
    });
}

// Helper function to set checkbox states
function setCheckboxes(days, checked) {
    days.forEach(day => {
        const checkbox = document.getElementById(day);
        if (checkbox) {
            checkbox.checked = checked;
        }
    });
}

// Initialize form submission
function initFormSubmission() {
    const form = document.getElementById('profile-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(this);
        
        // Get skills
        const skillsOffered = Array.from(document.querySelectorAll('#skills-offered-tags .tag'))
            .map(tag => tag.querySelector('span').textContent);
        
        const skillsWanted = Array.from(document.querySelectorAll('#skills-wanted-tags .tag'))
            .map(tag => tag.querySelector('span').textContent);
        
        // Get availability
        const availability = Array.from(document.querySelectorAll('input[name="days"]:checked'))
            .map(checkbox => checkbox.value);
        
        // Get profile visibility
        const visibility = document.querySelector('input[name="visibility"]:checked').value;
        
        // Save name and location to localStorage
        const fullname = formData.get('fullname');
        const location = formData.get('location');
        
        if (fullname) {
            localStorage.setItem('profile_name', fullname);
        } else {
            localStorage.removeItem('profile_name');
        }
        
        if (location) {
            localStorage.setItem('profile_location', location);
        } else {
            localStorage.removeItem('profile_location');
        }
        
        // For demo purposes, just show the collected data
        console.log({
            fullname,
            location,
            skillsOffered,
            skillsWanted,
            availability,
            visibility
        });
        
        // Show success message
        showMessage('Profile updated successfully!', 'success');
    });
}

// Initialize real-time updates for name and location
function initRealTimeUpdates() {
    const fullnameInput = document.getElementById('fullname');
    const locationInput = document.getElementById('location');
    const displayName = document.getElementById('display-name');
    const displayLocation = document.getElementById('display-location');
    
    if (!fullnameInput || !locationInput || !displayName || !displayLocation) return;
    
    // Update name in real-time as user types with GitHub-style behavior
    fullnameInput.addEventListener('input', function() {
        const value = this.value.trim();
        
        if (value) {
            displayName.textContent = value;
            displayName.classList.add('has-content');
        } else {
            displayName.textContent = 'Your Name';
            displayName.classList.remove('has-content');
        }
        
        // Add subtle animation effect
        displayName.classList.add('updating');
        setTimeout(() => {
            displayName.classList.remove('updating');
        }, 300);
    });
    
    // Update location in real-time as user types
    locationInput.addEventListener('input', function() {
        const value = this.value.trim();
        
        if (value) {
            displayLocation.textContent = value;
            displayLocation.parentElement.classList.add('has-content');
        } else {
            displayLocation.textContent = 'Your Location';
            displayLocation.parentElement.classList.remove('has-content');
        }
    });
    
    // Set initial values if they exist in localStorage
    const savedName = localStorage.getItem('profile_name');
    const savedLocation = localStorage.getItem('profile_location');
    
    if (savedName) {
        fullnameInput.value = savedName;
        displayName.textContent = savedName;
        displayName.classList.add('has-content');
    }
    
    if (savedLocation) {
        locationInput.value = savedLocation;
        displayLocation.textContent = savedLocation;
        displayLocation.parentElement.classList.add('has-content');
    }
}

// Show message function
function showMessage(message, type = 'info') {
    // Check if a message container already exists
    let messageContainer = document.querySelector('.message-container');
    
    // If not, create one
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container');
        document.querySelector('.profile-header').appendChild(messageContainer);
    }
    
    // Create the message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.classList.add('message-close');
    closeBtn.addEventListener('click', function() {
        messageContainer.removeChild(messageElement);
    });
    
    messageElement.appendChild(closeBtn);
    messageContainer.appendChild(messageElement);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageContainer.removeChild(messageElement);
        }
    }, 5000);
} 