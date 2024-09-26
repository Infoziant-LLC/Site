import './About.css';
import React, { useEffect, useRef, useState } from 'react';

export default function About() {
    const icons = [
        { id: 1, image: '/assets/google.png', alt: 'Google' },
        { id: 2, image: '/assets/microsoft.png', alt: 'Microsoft' },
        { id: 3, image: '/assets/dell.png', alt: 'Dell' },
        { id: 4, image: '/assets/sony.png', alt: 'Sony' },
        { id: 5, image: '/assets/wu.png', alt: 'Western Union' },
        { id: 6, image: '/assets/blackberry.png', alt: 'BlackBerry' },
        { id: 7, image: '/assets/invision.svg', alt: 'Invision' },
        { id: 8, image: '/assets/chalk.svg', alt: 'Chalk' },
        { id: 9, image: '/assets/issuu.png', alt: 'Issuu' },
        { id: 10, image: '/assets/sap.png', alt: 'SAP' },
        { id: 11, image: '/assets/fastmail.png', alt: 'Fastmail' },
        { id: 12, image: '/assets/world.png', alt: 'UN' },
    ];
    const Carousel = () => {
        const carouselRef = useRef(null);
        const [isDragging, setIsDragging] = useState(false);
        const [startX, setStartX] = useState(0);
        const [scrollLeft, setScrollLeft] = useState(0);
        const [autoScrollInterval, setAutoScrollInterval] = useState(null);
        const speed = 2; // Speed of auto-scroll
        const images = [
            '/assets/h1.jpg',
            '/assets/h2.jpg',
            '/assets/h3.jpg',
            '/assets/h4.jpg',
            '/assets/nh5.jpg',
            '/assets/nh6.jpg'
        ];

        useEffect(() => {
            startAutoScroll();
            return () => clearInterval(autoScrollInterval); // Clean up the interval on component unmount
        }, []);

        const startAutoScroll = () => {
            const interval = setInterval(() => {
                if (carouselRef.current) {
                    carouselRef.current.scrollLeft += speed;
                    // If we've scrolled to the end of the carousel, reset to the start
                    if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth) {
                        carouselRef.current.scrollLeft = 0; // Loop back to the beginning
                    }
                }
            }, 10);
            setAutoScrollInterval(interval);
        };

        const toggleCardSize = (card) => {
            const isEnlarged = card.classList.toggle('enlarged');
            if (isEnlarged) {
                clearInterval(autoScrollInterval); // Stop auto-scrolling when a card is enlarged
            } else {
                startAutoScroll();
            }
        };

        const handleCardClick = (e) => {
            toggleCardSize(e.currentTarget);
            e.stopPropagation(); // Prevent the click from bubbling up
        };

        const handleMouseDown = (e) => {
            setIsDragging(true);
            setStartX(e.pageX - carouselRef.current.offsetLeft);
            setScrollLeft(carouselRef.current.scrollLeft);
            clearInterval(autoScrollInterval); // Stop auto-scrolling when user drags manually
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - carouselRef.current.offsetLeft;
            const walk = (x - startX) * 2; // Calculate how far the mouse has moved
            carouselRef.current.scrollLeft = scrollLeft - walk;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            startAutoScroll(); // Resume auto-scrolling after drag
        };

        const handleMouseLeave = () => {
            setIsDragging(false);
            startAutoScroll(); // Resume auto-scrolling after drag
        };

        const handleTouchStart = (e) => {
            setIsDragging(true);
            setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
            setScrollLeft(carouselRef.current.scrollLeft);
            clearInterval(autoScrollInterval); // Stop auto-scrolling when user drags manually
        };

        const handleTouchMove = (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
            const walk = (x - startX) * 2;
            carouselRef.current.scrollLeft = scrollLeft - walk;
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
            startAutoScroll(); // Resume auto-scrolling after drag
        };

        return (
            <div className="wrapper">
                <i id="left" className="fa-solid fas fa-angle-left" onClick={() => carouselRef.current.scrollLeft -= 200}></i>
                <ul
                    className="carousel"
                    ref={carouselRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {images.map((src, index) => (
                        <li key={index} className="card" onClick={handleCardClick}>
                            <div className="img">
                                <img src={src} alt={`Slide ${index + 1}`} draggable="false" />
                            </div>
                        </li>
                    ))}
                </ul>
                <i id="right" className="fa-solid fas fa-angle-right" onClick={() => carouselRef.current.scrollLeft += 200}></i>
            </div>
        );
    };

    return (
        <div className="App">
            <div className="about-container">
                <header className="about-header">
                    <h1>About Infoziant Security</h1>
                    <p>
                        Infoziant Security (Infoziant IT Solutions Inc) is founded in 2015 by security experts from Symantec, McAfee, EMC Corporation with the vision to create a Secure Software Development environment for the Technology Companies.
                        Infoziant has experience working with financial/insurance companies, e-commerce/ healthcare applications, as well as educational or job portals. Our corporate offices are in California USA, Dubai UAE and Chennai India.
                        Founded in 2015 by security experts from Symantec, McAfee, and EMC – RSA Security, Infoziant Security offers comprehensive Information Security Services to protect applications from security threats.
                    </p>
                </header>

                <div className="flex-container">
                    <div className="left-column">
                        <section className="section">
                            <h2>Our Services</h2>
                            <div className="section-content">
                                <p>
                                    Infoziant provides end-to-end security services including security consulting,
                                    managed security services, vulnerability assessment, penetration testing,
                                    and security configuration/compliance to a range of domains and organizations in the
                                    USA, Singapore, Dubai, and India. As the company is located across different time zones,
                                    our team works round the clock in identifying new security threats.
                                </p>
                            </div>
                        </section>

                        <section className="section">
                            <h2>Domain Expertise</h2>
                            <div className="section-content">
                                <p>
                                    The Infoziant team possesses extensive experience in protecting financial organizations,
                                    insurance companies, e-governance applications, e-commerce applications, IoT–embedded applications,
                                    hospital management systems, job portals, and educational institutions. Our team is capable of
                                    handling cloud systems, web applications, mobile applications, and standalone applications.
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className="right-column">
                        <section className="section">
                            <h2>Global Presence</h2>
                            <div className="section-content">
                                <p>
                                    With a global footprint, Infoziant has established a strong presence in key markets including
                                    the USA, Singapore, Dubai, and India. Our strategically located teams ensure that we are
                                    well-positioned to respond to security threats in real-time and provide effective solutions
                                    tailored to our clients' needs.
                                </p>
                            </div>
                        </section>

                        <section className="section">
                            <h2>Our Methodology</h2>
                            <div className="section-content">
                                <p>
                                    Our security methodology is based on continuous monitoring and assessment. We believe in
                                    proactive security measures that identify potential threats before they can impact our clients.
                                    Through rigorous testing, vulnerability assessments, and compliance checks, we ensure that our
                                    clients' systems are fortified against cyber threats.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* 2nd section  */}

            <div className="flipper-card">
                <div className="left-section">
                    <img src="./assets/Office-image.jpg" alt="Astra Display" className="image-display" />
                </div>
                <div className="right-section">
                    <h1 className="mission">Our Mission</h1>
                    <ul className="mission-list">
                        <li>Recently saved up to 12.7 Million USD for a leading insurance solution provider.</li>
                        <li>Awarded on vulnerability assessment from 45 out of the top 100 global Fortune companies.</li>
                        <li>Following an agile methodology, with weekly progress reports, to keep you fully aware.</li>
                        <li>Currently protecting enterprises of all sizes, across domains, in USA, UK, Dubai, and India.</li>
                    </ul>
                </div>
            </div>



            {/* Carousel Section */}
            <div className="carousel-section">
                <h2>Awards</h2>
                <Carousel />
            </div>

            {/* 3 rd section key solution solution cards */}
            <h1 className="animated-heading"><b>Infoziant Security</b> <span>KEY SOLUTIONS</span></h1>
            <div className="cards-container">
                <div className="key network">
                    <h3><b>AI</b></h3>
                    <p>Artificial Intelligence based threat detection</p>
                </div>
                <div className="key siem">
                    <h3><b>SIEM</b></h3>
                    <p>Security Information and Event Management</p>
                </div>
                <div className="key vapt">
                    <h3><b>VAPT</b></h3>
                    <p>Vulnerability Assessment and Penetration Testing</p>
                </div>
                <div className="key infrastructure">
                    <h3><b>INFRASTRUCTURE</b></h3>
                    <p>Infrastructure Desktop Security Management</p>
                </div>
                <div className="key network">
                    <h3><b>NETWORK</b></h3>
                    <p>Network Security Configuration</p>
                </div>
            </div>


            <section className="appr-main">
                <h1>We are Appreciated by</h1>
                <p className="appr-intro">
                    Infoziant: A Cybersecurity powerhouse, lauded by fortune 500 giants, excelling
                    globally with tailored solutions, earning 65+ accolades and setting the standard
                    in cybersecurity excellence.
                </p>
                <div className="appr-logo-div">
                    {icons.map(icon => (
                        <div key={icon.id}>
                            <img
                                className={`appr-logo ${['Google', 'Microsoft', 'Sony', 'Fastmail', 'BlackBerry', 'Invision', 'Western Union'].includes(icon.alt) ? 'big-logo' : ''}`}
                                src={icon.image}
                                alt={icon.alt}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
