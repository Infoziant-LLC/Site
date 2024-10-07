const serviceItems = [
    { id: 1, title: "Dashboard", image: "./assets/images/slide-1.png", content: "Get a comprehensive overview of your application's security status with real-time metrics and insights. Easily track ongoing scans and vulnerability trends at a glance.", backgroundColor: "#85EBF9" },
    { id: 2, title: "Scanning", image: "./assets/images/slide-2.png", content: "Our DAST tool performs automated, deep scans across your applications to uncover potential vulnerabilities. Monitor the scanning progress in real-time for complete visibility.", backgroundColor: "#FFCE83" },
    { id: 3, title: "Vulnerabilities", image: "./assets/images/slide-3.png", content: "Identify and prioritize security vulnerabilities with detailed risk assessments. Each issue is categorized by severity, helping you focus on the most critical threats.", backgroundColor: "#B8FE97" },
    { id: 4, title: "Report", image: "./assets/images/slide-4.png", content: "Generate in-depth, customizable security reports with actionable insights. Our reports provide clear recommendations to remediate vulnerabilities and strengthen your defenses.", backgroundColor: "#77E9F8" },
];

let currentIndex = 0;
let isInView = false;

const serviceImage = document.getElementById('service-image');
const serviceText = document.getElementById('service-text');
const itemId = document.getElementById('item-id');
const servicesSection = document.getElementById('services-section');

// Function to update the service being displayed
function updateService() {
    const currentService = serviceItems[currentIndex];
    
    serviceImage.src = currentService.image;
    serviceImage.alt = currentService.title;
    
    serviceText.innerHTML = `
        <h3>${currentService.title}</h3>
        <p>${currentService.content}</p>
    `;
    
    itemId.textContent = currentService.id;
    itemId.style.backgroundColor = currentService.backgroundColor;
}

// Handle the scroll event
function handleScroll(event) {
    if (!isInView) return; // Exit if the services section is not in view

    // Prevent default scrolling when cycling through the services
    event.preventDefault();

    if (event.deltaY > 0) {
        // Scroll down through the service items
        if (currentIndex < serviceItems.length - 1) {
            currentIndex++;
            updateService();
        } else {
            // Re-enable normal scrolling when reaching the last item
            window.removeEventListener('wheel', handleScroll);
        }
    } else {
        // Scroll up through the service items
        if (currentIndex > 0) {
            currentIndex--;
            updateService();
        } else {
            // Re-enable normal scrolling when reaching the first item
            window.removeEventListener('wheel', handleScroll);
        }
    }
}

// Intersection observer to detect if services section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            isInView = true;
            // Add event listener for scroll when services section is in view
            window.addEventListener('wheel', handleScroll, { passive: false });
        } else {
            isInView = false;
            // Remove event listener when services section is out of view
            window.removeEventListener('wheel', handleScroll);
        }
    });
}, { threshold: 0.5 }); // Set threshold to determine when to trigger

observer.observe(servicesSection);
