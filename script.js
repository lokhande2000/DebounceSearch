// Simulated API Call using a mock database with Promises and setTimeout
function simulateApiCall(query) {
    const mockData = ['Apple', 'Apricot', 'Application', 'Banana', 'Berry', 'Cherry'];
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData.filter(item => item.toLowerCase().includes(query.toLowerCase())));
        }, 1000); // Simulate a 1-second delay
    });
}

// Debounce function optimized for clarity and performance
function debounce(callback, delay) {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback(...args), delay);
    };
}

// Optimized function to handle input changes
const handleSearchInput = debounce(async (event) => {
    const query = event.target.value.trim();
    const results = query ? await simulateApiCall(query) : [];
    updateResults(results);
}, 500);

// Optimized function to update the DOM with search results
function updateResults(results) {
    const resultsContainer = document.getElementById('results');
    
    // Create a fragment to minimize reflows and repaints
    const fragment = document.createDocumentFragment();
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result;
        fragment.appendChild(li);
    });

    // Clear the container and append the new results
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(fragment);
}

// Event listener for input with debounced search handling
document.getElementById('searchInput').addEventListener('input', handleSearchInput);
