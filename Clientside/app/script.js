// script.js

// Helper function to fetch active fundraisers and render them on the page
function fetchActiveFundraisers() {
    fetch('/fundraisers')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('fundraiser-list');
            if (list) {
                list.innerHTML = ''; // Clear any existing content
                data.forEach(fundraiser => {
                    const item = document.createElement('div');
                    item.className = 'fundraiser';
                    item.innerHTML = `
            <h3>${fundraiser.CAPTION}</h3>
            <p>Organizer: ${fundraiser.ORGANIZER}</p>
            <p>Target: $${fundraiser.TARGET_FUNDING}</p>
            <a href="fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">View Details</a>
          `;
                    list.appendChild(item);
                });
            }
        })
        .catch(err => console.error('Error fetching active fundraisers:', err));
}

// Function to handle search form submission
function searchFundraisers() {
    const organizer = document.getElementById('organizer').value;
    const city = document.getElementById('city').value;
    const category = document.getElementById('category').value;

    if (!organizer && !city && !category) {
        alert('Please select at least one criteria.');
        return;
    }

    const query = `/search?organizer=${organizer}&city=${city}&category=${category}`;
    fetch(query)
        .then(response => response.json())
        .then(data => {
            const results = document.getElementById('search-results');
            results.innerHTML = '';
            if (data.length === 0) {
                results.innerHTML = '<p style="color:red; font-weight:bold;">No fundraisers found.</p>';
            } else {
                data.forEach(fundraiser => {
                    const item = document.createElement('div');
                    item.innerHTML = `
            <a href="fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">${fundraiser.CAPTION}</a>
          `;
                    results.appendChild(item);
                });
            }
        })
        .catch(err => console.error('Error searching fundraisers:', err));
}

// Function to clear search criteria
function clearCheckboxes() {
    document.getElementById('organizer').value = '';
    document.getElementById('city').value = '';
    document.getElementById('category').value = '';
}

// Function to fetch and display fundraiser details on the fundraiser details page
function fetchFundraiserDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const fundraiserId = urlParams.get('id');

    if (fundraiserId) {
        fetch(`/fundraiser/${fundraiserId}`)
            .then(response => response.json())
            .then(data => {
                const details = document.getElementById('fundraiser-details');
                if (details) {
                    details.innerHTML = `
            <h2>${data.CAPTION}</h2>
            <p>Organizer: ${data.ORGANIZER}</p>
            <p>City: ${data.CITY}</p>
            <p>Target: $${data.TARGET_FUNDING}</p>
            <p>Current: $${data.CURRENT_FUNDING}</p>
            <p>Category: ${data.CATEGORY_NAME || 'None'}</p>
          `;
                }
            })
            .catch(err => console.error('Error fetching fundraiser details:', err));
    }
}

// Function to handle donation button click
function donate() {
    alert('This feature is under construction');
}

// On page load, determine which functions to call based on the page
document.addEventListener('DOMContentLoaded', () => {
    // If the home page is loaded, fetch and display active fundraisers
    if (document.getElementById('fundraiser-list')) {
        fetchActiveFundraisers();
    }

    // If the fundraiser details page is loaded, fetch and display the fundraiser details
    if (document.getElementById('fundraiser-details')) {
        fetchFundraiserDetails();
    }

    // Attach event listeners for search page
    if (document.getElementById('search-form')) {
        document.getElementById('search-form').addEventListener('submit', (e) => {
            e.preventDefault();
            searchFundraisers();
        });

        document.getElementById('clear-button').addEventListener('click', clearCheckboxes);
    }
});
