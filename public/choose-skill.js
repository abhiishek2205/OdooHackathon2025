document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const partnerId = urlParams.get('id');
    
    // Mock data for current user (in a real app, this would come from a logged-in user session)
    const currentUser = {
        id: 'current-user',
        name: 'Your Name',
        skillsOffered: ['Web Development', 'JavaScript', 'React', 'Node.js', 'UI/UX Design'],
        skillsWanted: ['Python', 'Data Analysis', 'Digital Marketing']
    };
    
    // Mock data for partner users (in a real app, this would come from an API)
    const partnerUsers = {
        '1': {
            id: '1',
            name: 'Aarav Sharma',
            skillsOffered: ['React', 'JavaScript', 'Node.js', 'HTML', 'CSS'],
            skillsWanted: ['Docker', 'TypeScript', 'GraphQL']
        },
        '2': {
            id: '2',
            name: 'Ishita Verma',
            skillsOffered: ['Python', 'Flask', 'SQL', 'Git'],
            skillsWanted: ['React Native', 'AWS', 'MongoDB']
        },
        '3': {
            id: '3',
            name: 'Rohan Desai',
            skillsOffered: ['Java', 'Spring Boot', 'MySQL', 'REST APIs'],
            skillsWanted: ['Kubernetes', 'JavaScript', 'Tailwind CSS']
        },
        '4': {
            id: '4',
            name: 'Meera Nair',
            skillsOffered: ['C++', 'Data Structures', 'Algorithms', 'Competitive Programming'],
            skillsWanted: ['Web Development', 'Django', 'GitHub Actions']
        },
        '5': {
            id: '5',
            name: 'Vikram Joshi',
            skillsOffered: ['Android', 'Kotlin', 'Firebase', 'Figma'],
            skillsWanted: ['React', 'Redux', 'Docker']
        },
        '6': {
            id: '6',
            name: 'Nikita Rao',
            skillsOffered: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
            skillsWanted: ['TypeScript', 'Next.js', 'Firebase']
        },
        '7': {
            id: '7',
            name: 'Karan Malhotra',
            skillsOffered: ['DevOps', 'CI/CD', 'AWS', 'Terraform'],
            skillsWanted: ['Go', 'System Design', 'Java']
        },
        '8': {
            id: '8',
            name: 'Priya Kapoor',
            skillsOffered: ['Swift', 'iOS Development', 'UI/UX Design', 'Xcode'],
            skillsWanted: ['Backend Development', 'Node.js', 'MongoDB']
        }
    };
    
    // Get the partner data
    const partnerUser = partnerUsers[partnerId] || {
        id: 'unknown',
        name: 'Unknown User',
        skillsOffered: [],
        skillsWanted: []
    };
    
    // Update partner name in the UI
    document.getElementById('partner-name').textContent = partnerUser.name;
    
    // Populate the dropdown menus
    populateDropdown('offered-skill', currentUser.skillsOffered);
    populateDropdown('wanted-skill', partnerUser.skillsOffered);
    
    // Set up form submission
    setupFormSubmission(currentUser, partnerUser);
});

// Populate a dropdown with options
function populateDropdown(selectId, skills) {
    const select = document.getElementById(selectId);
    
    // Clear existing options except the first one (placeholder)
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    // Add skills as options
    skills.forEach(skill => {
        const option = document.createElement('option');
        option.value = skill;
        option.textContent = skill;
        select.appendChild(option);
    });
}

// Set up form submission
function setupFormSubmission(currentUser, partnerUser) {
    const form = document.getElementById('skill-swap-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const offeredSkill = document.getElementById('offered-skill').value;
        const wantedSkill = document.getElementById('wanted-skill').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!offeredSkill || !wantedSkill) {
            alert('Please select both skills for the swap.');
            return;
        }
        
        // Create swap request object (in a real app, this would be sent to a server)
        const swapRequest = {
            requesterId: currentUser.id,
            requesterName: currentUser.name,
            recipientId: partnerUser.id,
            recipientName: partnerUser.name,
            offeredSkill: offeredSkill,
            wantedSkill: wantedSkill,
            message: message,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };
        
        // For demo purposes, log the request and show a success message
        console.log('Swap request created:', swapRequest);
        
        // Show success message and redirect
        alert(`Skill swap request sent to ${partnerUser.name}!`);
        window.location.href = 'index.html';
    });
} 