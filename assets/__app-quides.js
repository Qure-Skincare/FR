document.addEventListener('DOMContentLoaded', () => {
    // IDs of elements to handle click events
    const elementIds = ['hs_1', 'hs_2', 'hs_3', 'hs_4', 'hsm_1', 'hsm_2', 'hsm_3', 'hsm_4'];

    // Function to handle click events
    const handleElementClick = (event) => {
    event.preventDefault(); // Prevent default action (e.g., link navigation)

    const targetElement = event.currentTarget; // The element that triggered the event
    const sectionValue = targetElement.getAttribute('href')?.split('#')[1]; // Extract the value after #

    if (!sectionValue) {
        console.error('Failed to extract value after # in href.');
        return;
    }

    // Find the link with the corresponding data-section and trigger a click
    const targetLink = document.querySelector(`a[data-section="${sectionValue}"]`);
        if (targetLink) {
            console.log(`Clicking link with data-section="${sectionValue}"`);
            targetLink.click();
        } else {
            console.error(`Link with data-section="${sectionValue}" not found.`);
        }
    };

    // Function to check the URL for a hash parameter on page load
    const checkUrlForSection = () => {
    const hash = window.location.hash.slice(1); // Get the value after # in the URL
        if (hash) {
            console.log(`Checking URL hash: "${hash}"`);
            const targetLink = document.querySelector(`a[data-section="${hash}"]`);
            if (targetLink) {
                console.log(`Clicking link with data-section="${hash}" from URL.`);
                targetLink.click();
            } else {
                console.error(`Link with data-section="${hash}" from URL not found.`);
            }
        }
    };

    // Add click event listeners to all elements in the array
    elementIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            console.log(`Adding click listener to element with id="${id}"`);
            element.addEventListener('click', handleElementClick);
        } else {
            console.warn(`Element with id="${id}" not found.`);
        }
    });

    // Check the URL for a hash parameter when the page loads
    setTimeout(() => {
        checkUrlForSection();
    }, 600);
});