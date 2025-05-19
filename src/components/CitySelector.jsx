import React, { useState, useEffect, useRef } from 'react';
import { IconX, IconSearch, IconMapPin, IconPlane, IconHeart } from '@tabler/icons-react';

const CitySelector = ({ cities, onCitySelect, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [animateItems, setAnimateItems] = useState(false);
    const searchInputRef = useRef(null);

    // Focus search input on mount
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
        // Trigger animation after component mounts
        setTimeout(() => setAnimateItems(true), 100);
    }, []);

    // Filter cities based on search term and category
    const filteredCities = cities.filter(city => {
        const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             city.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || 
                               (city.category && city.category === selectedCategory);
        return matchesSearch && matchesCategory;
    });

    // Categories for filtering (assuming cities might have categories like 'popular', 'beach', etc.)
    // If your cities don't have categories, you can remove this feature
    const categories = [
        { id: 'all', label: 'All Destinations', icon: <IconPlane size={18} /> },
        { id: 'popular', label: 'Popular', icon: <IconHeart size={18} /> },
        // Add more categories as needed
    ];

    // Handle escape key to close
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [onClose]);

    return (
        <div className="city-selector-overlay" onClick={(e) => {
            // Close when clicking the overlay (outside the container)
            if (e.target === e.currentTarget) onClose();
        }}>
            <div className="city-selector-container">
                <div className="city-selector-header">
                    <h2><IconMapPin size={28} /> Destination Finder</h2>
                    <button 
                        className="city-selector-close"
                        onClick={onClose}
                        aria-label="Close destination finder"
                    >
                        <IconX size={24} />
                    </button>
                </div>
                
                <div className="city-selector-search">
                    <IconSearch size={20} />
                    <input 
                        ref={searchInputRef}
                        type="text" 
                        placeholder="Search by city name or airport code..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search destinations"
                    />
                    {searchTerm && (
                        <button 
                            className="city-selector-clear-search" 
                            onClick={() => setSearchTerm('')}
                            aria-label="Clear search"
                        >
                            <IconX size={16} />
                        </button>
                    )}
                </div>

                <div className="city-selector-categories">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`city-selector-category ${selectedCategory === category.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            {category.icon}
                            <span>{category.label}</span>
                        </button>
                    ))}
                </div>

                {filteredCities.length === 0 ? (
                    <div className="city-selector-no-results">
                        <p>No destinations found matching your search.</p>
                        <button onClick={() => setSearchTerm('')}>Clear Search</button>
                    </div>
                ) : (
                    <div className="city-selector-grid">
                        {filteredCities.map((city, index) => (
                            <div 
                                key={city.name} 
                                className={`city-selector-item ${animateItems ? 'animate' : ''}`}
                                onClick={() => onCitySelect(city)}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div 
                                    className="city-selector-image" 
                                    style={{ backgroundImage: `url(${city.image})` }}
                                >
                                    <div className="city-selector-overlay-gradient"></div>
                                    <div className="city-selector-overlay-content">
                                        <span className="city-selector-name">{city.name}</span>
                                        <span className="city-selector-code">{city.code}</span>
                                        {city.price && (
                                            <span className="city-selector-price">From €{city.price}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="city-selector-footer">
                    <p>Showing {filteredCities.length} of {cities.length} destinations</p>
                </div>
            </div>
        </div>
    );
};

export default CitySelector;
