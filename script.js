document.addEventListener('DOMContentLoaded', () => {
    const mapDisplay = document.getElementById('map-display');
    const locationLinks = document.querySelectorAll('.nav-link');
    const defaultMap = 'Main_Gate';
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    // Function to fetch and display an SVG map
    async function loadMap(mapName) {
        mapDisplay.innerHTML = `<p class="p-8 text-center text-gray-500">Loading map for ${mapName.replace('_', ' ')}...</p>`;
        try {
            const response = await fetch(`./${mapName}.svg`); 
            if (!response.ok) {
                throw new Error(`Map not found: ${mapName}.svg.`);
            }
            const svgData = await response.text();
            mapDisplay.innerHTML = svgData;

            // On mobile, hide sidebar after loading a map
            if (window.innerWidth < 768) { // Check if it's a mobile screen
                hideSidebar();
            }

        } catch (error) {
            console.error('Error loading map:', error);
            mapDisplay.innerHTML = `<p class="p-8 text-center text-red-500">Error: Could not load map. ${error.message}</p>`;
        }
    }

    // Function to handle the "active" state for navigation links
    function setActiveLink(activeLink) {
        locationLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // Function to show the sidebar
    function showSidebar() {
        sidebar.classList.remove('sidebar-hidden');
        sidebar.classList.add('sidebar-visible');
    }

    // Function to hide the sidebar
    function hideSidebar() {
        sidebar.classList.remove('sidebar-visible');
        sidebar.classList.add('sidebar-hidden');
    }

    // Toggle sidebar on button click
    sidebarToggle.addEventListener('click', () => {
        if (sidebar.classList.contains('sidebar-hidden')) {
            showSidebar();
        } else {
            hideSidebar();
        }
    });

    // Add click event listeners to all navigation links
    locationLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const mapTarget = link.getAttribute('data-target');
            loadMap(mapTarget);
            setActiveLink(link);
        });
    });

    // --- Initial Load ---
    function initialize() {
        const defaultLink = document.querySelector(`.nav-link[data-target="${defaultMap}"]`);
        if (defaultLink) {
            setActiveLink(defaultLink);
            loadMap(defaultMap);
        }

        // On initial load, if on mobile, hide sidebar. If desktop, show.
        if (window.innerWidth < 768) {
            hideSidebar(); // Start hidden on mobile
        } else {
            showSidebar(); // Start visible on desktop
        }
    }
    initialize();
});