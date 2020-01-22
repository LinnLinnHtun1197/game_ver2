import React from 'react';
import { Link } from 'react-router-dom';
// import './style.css';
const style = () => {
    return {
        title:{
            textAlign: 'center'
        },
        menu: {
            
        },
        link: {
            textAlign: 'center',
            color:'orange',
            textDecoration: 'none'
        }
    };
};

const Tutorial = () => {
    const {menu, title, link} = style();
    return (
        <div style={menu}>
            <h1 style={title}>Welcome To First Wave</h1>
            <Link to="/game" style={link}>
                Game
            </Link>
            <p><b>Step:1</b> <br />
                How to 
            </p>
        </div>
    );
};

export default Tutorial;