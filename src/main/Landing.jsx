import React, { useState, useEffect, useRef } from 'react';
import '../styles/main-styles.scss';
import Header from '../components/Header.jsx';
import DestinationCarousel from '../components/DestinationCarousel.jsx';
import CitySelector from '../components/CitySelector.jsx'; // New component
import cloud from '../icons/cloud.svg';
import plane from '../images/plane.png';
import { IconRepeat, IconBriefcase2, IconArmchair, IconShieldCheck, IconSalad, IconWeight, IconMotorbike, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

// Import all city images
import riga from '../images/riga.jpg';
import dubai from '../images/dubai.jpg';
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

const Landing = () => {
    const [planePosition, setPlanePosition] = useState(-100);
    const [isPlaneEntered, setIsPlaneEntered] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const containerRef = useRef(null);
    const planeRef = useRef(null);
    const container2Ref = useRef(null);
    const container3Ref = useRef(null);

    // New state for city selection
    const [fromCity, setFromCity] = useState({
        name: 'RIGA',
        code: 'RIX',
        image: riga
    });
    const [toCity, setToCity] = useState({
        name: 'DUBAI',
        code: 'DXB',
        image: dubai
    });
    const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);
    const [currentCitySelector, setCurrentCitySelector] = useState('from');

    const cityList = [
        { name: 'RIGA', code: 'RIX', image: require('../images/riga.jpg') },
        { name: 'DUBAI', code: 'DXB', image: require('../images/dubai.jpg') },
        { name: 'PARIS', code: 'CDG', image: require('../images/paris.jpg') },
        { name: 'AMSTERDAM', code: 'AMS', image: require('../images/amsterdam.jpg') },
        { name: 'ZURICH', code: 'ZRH', image: require('../images/zurich.jpg') },
        { name: 'BARCELONA', code: 'BCN', image: require('../images/barcelona.jpg') },
        { name: 'LONDON', code: 'LHR', image: require('../images/london.jpg') },
        { name: 'ROME', code: 'FCO', image: require('../images/rome.jpg') },
        { name: 'BEIJING', code: 'PEK', image: require('../images/beijing.jpg') },
        { name: 'OSAKA', code: 'KIX', image: require('../images/osaka.jpg') },
        { name: 'BANGKOK', code: 'BKK', image: require('../images/bangkok.jpg') },
        { name: 'TOKYO', code: 'NRT', image: require('../images/tokyo.jpg') },
        { name: 'SINGAPORE', code: 'SIN', image: require('../images/singapore.jpg') },
        { name: 'SEOUL', code: 'ICN', image: require('../images/seoul.jpg') },
        { name: 'NEW YORK', code: 'JFK', image: require('../images/ny.jpg') },
        { name: 'CHICAGO', code: 'ORD', image: require('../images/chicago.jpeg') },
        { name: 'SALVADOR', code: 'SSA', image: require('../images/salvador.jpg') },
        { name: 'LOS ANGELES', code: 'LAX', image: require('../images/los-angeles.jpg') },
        { name: 'MIAMI', code: 'MIA', image: require('../images/miami.jpg') },
        { name: 'TORONTO', code: 'YYZ', image: require('../images/toronto.jpg') }
    ];
    

    const handleSwitchClick = () => {
        // Swap cities and their details
        const tempCity = { ...fromCity };
        setFromCity({ ...toCity });
        setToCity({ ...tempCity });
        setIsRotated(!isRotated);
    };

    const handleCityChange = (city) => {
        if (currentCitySelector === 'from') {
            setFromCity(city);
        } else {
            setToCity(city);
        }
        setIsCitySelectorOpen(false);
    };

    const openCitySelector = (type) => {
        setCurrentCitySelector(type); // Set the current city selector (from or to)
        setIsCitySelectorOpen(true);  // Open the city selector overlay
    };
    
    // This effect will run whenever isCitySelectorOpen changes.
    useEffect(() => {
        console.log(isCitySelectorOpen);  // Log the current value of isCitySelectorOpen
    }, [isCitySelectorOpen]);  // This dependency means it will log whenever isCitySelectorOpen changes
    
    // Rest of the existing code remains the same...
    const scrollToFlights = () => {
        if (container2Ref.current) {
            container2Ref.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const scrollToDestinations = () => {
        if (container3Ref.current) {
            container3Ref.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    useEffect(() => {
        // Fly-in animation
        const flyInTimer = setTimeout(() => {
            setPlanePosition(-8);
            setIsPlaneEntered(true);
        }, 3500);

        // Scroll event handler
        const handleScroll = () => {
            if (!containerRef.current || !isPlaneEntered) return;

            const scrollProgress = window.scrollY / containerRef.current.clientHeight;
            const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);
            
            // Fly out to the right based on scroll progress
            setPlanePosition(clampedProgress * 100 - 8);
        };

        // Add scroll listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(flyInTimer);
        };
    }, [isPlaneEntered]);


    return (
        <div ref={containerRef} className="mainContainer">
            <div className="container1">
                <img src={cloud} alt="Cloud" className="cloud cloud-1" />
                <img src={cloud} alt="Cloud" className="cloud cloud-2" />
                <img src={cloud} alt="Cloud" className="cloud cloud-3" />
                <img src={cloud} alt="Cloud" className="cloud cloud-4" />
                <img src={cloud} alt="Cloud" className="cloud cloud-5" />
                <img src={cloud} alt="Cloud" className="cloud cloud-6" />
                <Header/>
                <div className="mainTextContainer">
                    <div className="mainTextTop">Affordable.</div>
                    <div className="mainTextBot">Comfort.</div>
                    <div className="mainNavButtonCont">
                        <button 
                            className="mainNavBtn blue"
                            onClick={scrollToFlights}
                        >
                            FLIGHTS
                        </button>
                        <button
                            onClick={() => window.location.href = 'https://www.airbnb.com/'}
                            className="mainNavBtn green"
                        >
                            HOTELS
                        </button>
                    </div>
                </div>
                <img 
                    className="mainPlane"
                    src={plane}
                    alt="Plane"
                    style={{
                        left: `${planePosition}%`,
                        opacity: planePosition < 90 ? 1 : 0,
                        transform: 'rotate(10deg)',
                        animation: 'plane-entrance 3s ease-out forwards'
                    }}
                />
            </div>
            <div ref={container2Ref} className="container2">
                <div className="flightsContainer">
                    <div className="flightsContainerTop">
                        <button className="topContainerBtn green blueB">BOOK FLIGHTS</button>
                        <button className="topContainerBtn blue greenB">FLIGHTS + HOTEL</button>
                        <button className="topContainerBtn booking" onClick={() => window.open('https://www.booking.com/', '_blank', 'noopener,noreferrer')}></button>
                        <button className="topContainerBtn airbnb" onClick={() => window.open('https://www.airbnb.com/', '_blank', 'noopener,noreferrer')}></button>
                    </div>
                    <div className="flightsBox">
                        <div className="fromFlight">
                            <div className="flightSelectHeading">
                                <div className="flightHeadingText">FROM</div>
                            </div>
                            <div className={`flightSelectBody ${fromCity.name === 'NEW YORK' ? 'ny' : fromCity.name.toLowerCase().replace(/ /g, '-')}`}>
                                <div className="glassTop">
                                    <div className="flightsSelectTextbox">
                                        <div 
                                            className="flightBodyDestination" 
                                            style={{ fontSize: `${Math.max(6.5 - (fromCity.name.length > 5 ? (fromCity.name.length - 5) * 0.4 : 0), 2.5)}rem` }}
                                        >
                                            {fromCity.name}
                                        </div>
                                        <div className="flightBodyShort">{fromCity.code}</div>
                                    </div>
                                    <button 
                                        className="datesButton"
                                        onClick={() => openCitySelector('from')}
                                    >
                                        CHANGE
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button
                            className={`flightsSwitchBtn ${isRotated ? 'rotated' : ''}`}
                            onClick={handleSwitchClick}
                        >
                            <IconRepeat size={35} stroke={3} color="#CBDB34" />
                        </button>
                        <div className="toFlight">
                            <div className="flightSelectHeading">
                                <div className="flightHeadingText">TO</div>
                            </div>
                            <div className={`flightSelectBody ${toCity.name === 'NEW YORK' ? 'ny' : toCity.name.toLowerCase().replace(/ /g, '-')}`}>
                                <div className="glassTop">
                                    <div className="flightsSelectTextbox">
                                        <div 
                                            className="flightBodyDestination" 
                                            style={{ fontSize: `${Math.max(6.5 - (toCity.name.length > 5 ? (toCity.name.length - 5) * 0.4 : 0), 2.5)}rem` }}
                                        >
                                            {toCity.name}
                                        </div>
                                        <div className="flightBodyShort">{toCity.code}</div>
                                    </div>
                                    <button 
                                        className="datesButton"
                                        onClick={() => openCitySelector('to')}
                                    >
                                        CHANGE
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button className="checkFlights">CHECK FLIGHTS</button>
                    </div>
                </div>
                <button 
                    className="moreFlightsBtn"
                    onClick={scrollToDestinations}
                >
                    SEE DESTINATIONS
                    <div className="moreFlightsBtn-arrow-container">
                        <div className="moreFlightsBtn-arrow"></div>
                    </div>
                </button>
            </div>

            <div ref={container3Ref} className="container3">
                <DestinationCarousel />
            </div>

            <div className="container4">
                <div className="cont4Heading">PERSONALISE YOUR TRAVEL EXPERIENCE</div>
                <div className="cont4Box">
                    <div className="cont4BoxContainer">
                        <div className="exBox">
                            <div className="exBoxIcon">
                                <IconBriefcase2 size={75} stroke={2} />
                            </div>
                            <div className="exBoxTitle">ADD CHECKED BAGGAGE</div>
                            <div className="exBoxDescription">Add baggage to your booking from 19.99 EUR and pack for your trip worry-free!</div>
                        </div>
                        <div className="exBox">
                            <div className="exBoxIcon">
                                <IconArmchair size={75} stroke={2} />
                            </div>
                            <div className="exBoxTitle">CHOOSE YOUR SEAT</div>
                            <div className="exBoxDescription">Love a good sky view ? Pick your favourite seat and get comfy on board!</div>
                        </div>
                        <div className="exBox">
                            <div className="exBoxIcon">
                                <IconShieldCheck size={75} stroke={2} />
                            </div>
                            <div className="exBoxTitle">PROTECT YOUR TRIP</div>
                            <div className="exBoxDescription">Enjoy a worry-free journey with travel insurance that includes trip cancellation!</div>
                        </div>
                        <div className="exBox">
                            <div className="exBoxIcon">
                                <IconSalad size={75} stroke={2} />
                            </div>
                            <div className="exBoxTitle">ENJOY DINNER IN THE SKY</div>
                            <div className="exBoxDescription">Pre-order your meal cooked from the finest ingredients shortly before your flight!</div>
                        </div>
                        <div className="exBox">
                            <div className="exBoxIcon">
                                <IconWeight size={75} stroke={2} />
                            </div>
                            <div className="exBoxTitle">GO HEAVY ON BOARD</div>
                            <div className="exBoxDescription">No more queuing at the bag carousel - upgrade your hand baggage from 8kg to 12kg!</div>
                        </div>
                        <div className="exBox">
                            <div className="exBoxIcon">
                                <IconMotorbike size={75} stroke={2} />
                            </div>
                            <div className="exBoxTitle">BRING YOUR OWN GEAR</div>
                            <div className="exBoxDescription">There's nothing like having your own equipment when you head on your next adventure!</div>
                        </div>
                    </div>
                    <div className="cont4ButtonContainer">
                        <button className="learnMoreButton">LEARN MORE</button>
                    </div>
                </div>
            </div>

            <div className="container5">
                <div className="cont4Heading">FOR YOUR INSPIRATION</div>
                <div className="inspirationBox sea">
                    <div className="inspirationGlass ">
                        <div className="inspirationTheme">SUN AND SEA</div>
                        <button className="inspirationButton">SEE DESTINATIONS</button>
                    </div>
                </div>

                <div className="inspirationBox shopping">
                    <div className="inspirationGlass ">
                        <div className="inspirationTheme">SHOPPING</div>
                        <button className="inspirationButton">SEE DESTINATIONS</button>
                    </div>
                </div>

                <div className="inspirationBox romantic">
                    <div className="inspirationGlass ">
                        <div className="inspirationTheme">ROMANTIC</div>
                        <button className="inspirationButton">SEE DESTINATIONS</button>
                    </div>
                </div>

                <div className="inspirationBox party">
                    <div className="inspirationGlass ">
                        <div className="inspirationTheme">PARTY</div>
                        <button className="inspirationButton">SEE DESTINATIONS</button>
                    </div>
                </div>

            </div>
                    {isCitySelectorOpen && (
            <CitySelector 
                cities={cityList} 
                onCitySelect={handleCityChange} 
                onClose={() => setIsCitySelectorOpen(false)}
            />
        )}

        </div>
    );
};

export default Landing;