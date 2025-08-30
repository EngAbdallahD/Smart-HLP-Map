document.addEventListener('DOMContentLoaded', () => {
    const mapDisplay = document.getElementById('map-display');
    const locationLinks = document.querySelectorAll('.nav-link');
    const defaultMap = 'Main_Gate';

    // Function to fetch and display an SVG map
    async function loadMap(mapName) {
        // Show a loading message
        mapDisplay.innerHTML = `<p class="p-8 text-center text-gray-500">Loading map for ${mapName.replace('_', ' ')}...</p>`;

        try {
            // This line is now corrected to use "Maps" with a capital M
            const response = await fetch(`./Maps/${mapName}.svg`); 
            if (!response.ok) {
                throw new Error(`Map not found: ${mapName}.svg. Please check the file name and path.`);
            }
            const svgData = await response.text();
            mapDisplay.innerHTML = svgData;
        } catch (error) {
            console.error('Error loading map:', error);
            mapDisplay.innerHTML = `<p class="p-8 text-center text-red-500">Error: Could not load map. ${error.message}</p>`;
        }
    }

    // Function to handle the "active" state for navigation links
    function setActiveLink(activeLink) {
        // Remove 'active' class from all links
        locationLinks.forEach(link => {
            link.classList.remove('active');
        });
        // Add 'active' class to the clicked link
        activeLink.classList.add('active');
    }

    // Add click event listeners to all navigation links
    locationLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the link from navigating
            const mapTarget = link.getAttribute('data-target');
            
            // Load the map and set the active link
            loadMap(mapTarget);
            setActiveLink(link);
        });
    });

    // --- Initial Load ---
    // Function to initialize the map on page load
    function initialize() {
        // Find the default link to make it active
        const defaultLink = document.querySelector(`.nav-link[data-target="${defaultMap}"]`);
        if (defaultLink) {
            setActiveLink(defaultLink);
            loadMap(defaultMap);
        } else {
            console.error('Default map link not found.');
            mapDisplay.innerHTML = `<p class="p-8 text-center text-gray-500">Welcome! Please select a location to begin.</p>`;
        }
    }

    initialize();
});
