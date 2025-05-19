import React, { useState, useEffect, useRef } from 'react';
import { IconChevronLeft, IconChevronRight, IconPlane, IconCalendar } from '@tabler/icons-react';
import paris from '../images/paris.jpg';
import amsterdam from '../images/amsterdam.jpg';
import zurich from '../images/zurich.jpg';
import barcelona from '../images/barcelona.jpeg';
import london from '../images/london.jpg';
import rome from '../images/rome.jpg';
import beijing from '../images/beijing.jpg';
import osaka from '../images/osaka.jpg';
import bangkok from '../images/bangkok.jpg';
import tokyo from '../images/tokyo.jpg';
import singapore from '../images/singapore.jpeg';
import seoul from '../images/seoul.jpeg';
import newYork from '../images/ny.jpg';
import chicago from '../images/chicago.jpeg';
import salvador from '../images/salvador.jpg';
import losAngeles from '../images/los-angeles.jpg';
import miami from '../images/miami.jpg';
import toronto from '../images/toronto.jpg';

const DestinationCarousel = () => {
    const destinations = {
        EUROPE: [
            { name: 'PARIS', image: paris, price: '26.99', code: 'CDG' },
            { name: 'AMSTERDAM', image: amsterdam, price: '26.99', code: 'AMS' },
            { name: 'ZURICH', image: zurich, price: '26.99', code: 'ZRH' },
            { name: 'BARCELONA', image: barcelona, price: '29.99', code: 'BCN' },
            { name: 'LONDON', image: london, price: '34.99', code: 'LHR' },
            { name: 'ROME', image: rome, price: '31.99', code: 'FCO' }
        ],
        ASIA: [
            { name: 'BEIJING', image: beijing, price: '26.99', code: 'PEK' },
            { name: 'OSAKA', image: osaka, price: '26.99', code: 'KIX' },
            { name: 'BANGKOK', image: bangkok, price: '26.99', code: 'BKK' },
            { name: 'TOKYO', image: tokyo, price: '39.99', code: 'NRT' },
            { name: 'SINGAPORE', image: singapore, price: '45.99', code: 'SIN' },
            { name: 'SEOUL', image: seoul, price: '36.99', code: 'ICN' }
        ],
        AMERICA: [
            { name: 'NEW YORK', image: newYork, price: '26.99', code: 'JFK' },
            { name: 'CHICAGO', image: chicago, price: '26.99', code: 'ORD' },
            { name: 'SALVADOR', image: salvador, price: '26.99', code: 'SSA' },
            { name: 'LOS ANGELES', image: losAngeles, price: '39.99', code: 'LAX' },
            { name: 'MIAMI', image: miami, price: '34.99', code: 'MIA' },
            { name: 'TORONTO', image: toronto, price: '32.99', code: 'YYZ' }
        ]
    };

    // State for tracking active indexes, animation, and visible items
    const [carouselState, setCarouselState] = useState({
        EUROPE: { activeIndex: 0, isAnimating: false, isScrolling: false },
        ASIA: { activeIndex: 0, isAnimating: false, isScrolling: false },
        AMERICA: { activeIndex: 0, isAnimating: false, isScrolling: false }
    });
    
    // Refs for each carousel track
    const trackRefs = {
        EUROPE: useRef(null),
        ASIA: useRef(null),
        AMERICA: useRef(null)
    };
    
    // Simple function to handle carousel navigation with no animations
    const handleScroll = (continent, direction) => {
        // Prevent rapid clicking
        if (carouselState[continent].isAnimating) return;
        
        const continentDestinations = destinations[continent];
        const currentIndex = carouselState[continent].activeIndex;
        
        // Calculate the new index based on direction
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 3) % continentDestinations.length;
        } else {
            newIndex = (currentIndex - 3 + continentDestinations.length) % continentDestinations.length;
        }
        
        // Set a brief animation lock to prevent rapid clicking
        setCarouselState(prevState => ({
            ...prevState,
            [continent]: {
                ...prevState[continent],
                isAnimating: true
            }
        }));
        
        // Update the index immediately
        setTimeout(() => {
            setCarouselState(prevState => ({
                ...prevState,
                [continent]: {
                    activeIndex: newIndex,
                    isAnimating: false
                }
            }));
        }, 200); // Short delay to prevent rapid clicking
    };
    
    // Function to jump to a specific page (for pagination dots)
    const jumpToPage = (continent, pageIndex) => {
        if (carouselState[continent].isAnimating) return;
        
        setCarouselState(prevState => ({
            ...prevState,
            [continent]: {
                ...prevState[continent],
                activeIndex: pageIndex * 3
            }
        }));
    };

    // Render a continent's carousel
    const renderDestinationContainer = (continent) => {
        const continentDestinations = destinations[continent];
        const { activeIndex, isAnimating, isScrolling, scrollDirection } = carouselState[continent];
        
        // Always show a consistent number of items (3 visible items)
        const getVisibleItems = () => {
            // Always show exactly 3 items based on the current activeIndex
            const items = [];
            for (let i = 0; i < 3; i++) {
                const index = (activeIndex + i) % continentDestinations.length;
                items.push({
                    ...continentDestinations[index],
                    key: `${continent}-${index}-${i}`
                });
            }
            return items;
        };
        
        const visibleItems = getVisibleItems();
        
        // Calculate animation classes
        const getTrackClassName = () => {
            let className = "destination-carousel-track";
            if (isScrolling) {
                className += " scrolling";
                className += scrollDirection === 'next' ? " scrolling-next" : " scrolling-prev";
            }
            return className;
        };

        return (
            <div className="destination-carousel-container">
                <div className="destination-carousel-header">
                    <span>{continent}</span>
                    <div className="destination-carousel-dots">
                        {Array.from({ length: Math.ceil(continentDestinations.length / 3) }).map((_, i) => (
                            <span 
                                key={`${continent}-dot-${i}`} 
                                className={`destination-carousel-dot ${Math.floor(activeIndex / 3) === i ? 'active' : ''}`}
                                onClick={() => jumpToPage(continent, i)}
                            />
                        ))}
                    </div>
                </div>
                
                <div className="destination-carousel-wrapper">
                    <button 
                        className="destination-carousel-nav destination-carousel-nav-prev" 
                        onClick={() => handleScroll(continent, 'prev')}
                        disabled={isAnimating}
                        aria-label="Previous destinations"
                    >
                        <IconChevronLeft size={35} stroke={2} />
                    </button>
                    
                    <div 
                        className={getTrackClassName()}
                        ref={trackRefs[continent]}
                        style={{
                            // Use a single transform animation without the jump
                            transform: 'translateX(0)'
                        }}
                    >
                        {visibleItems.map((destination, index) => (
                            <div 
                                key={destination.key} 
                                className={`destination-carousel-item ${destination.name.replace(/\s+/g, '').toLowerCase()}`}
                                style={{ 
                                    backgroundImage: `url(${destination.image})`,
                                    '--item-index': index % 3
                                }}
                            >
                                <div className="destination-carousel-badge">
                                    <IconPlane size={16} />
                                    <span>DIRECT FLIGHT</span>
                                </div>
                                
                                <div className="destination-carousel-gradient"></div>
                                
                                <div className="destination-carousel-overlay">
                                    <div className="destination-carousel-content">
                                        <div className={`destination-carousel-title ${destination.name.length > 8 ? 'mid' : 'large'}`}>
                                            {destination.name}
                                        </div>
                                        <div className="destination-carousel-code">{destination.code}</div>
                                        <div className="destination-carousel-price">from €{destination.price}</div>
                                    </div>
                                    
                                    <button className="destination-carousel-book">
                                        <IconCalendar size={18} />
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button 
                        className="destination-carousel-nav destination-carousel-nav-next" 
                        onClick={() => handleScroll(continent, 'next')}
                        disabled={isAnimating}
                        aria-label="Next destinations"
                    >
                        <IconChevronRight size={35} stroke={2} />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="destination-carousel">
            {renderDestinationContainer('EUROPE')}
            {renderDestinationContainer('ASIA')}
            {renderDestinationContainer('AMERICA')}
        </div>
    );
};

export default DestinationCarousel;
