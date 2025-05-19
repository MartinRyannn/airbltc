import React, { useState, useEffect } from 'react';
import '../styles/main-styles.scss';
import logo from '../images/airLogo.png'

const Header = () => {
    return(
        <>
        <div className="headerBar">
                <img className='headerLogo' src={logo} alt="" />
                <div className="headerNavCont"></div>
        </div>
        </>
    );
};

export default Header