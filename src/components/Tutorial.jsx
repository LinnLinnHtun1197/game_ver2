import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../..z/bg';
// import './style.css';
const style = () => {
    return {
        title:{
            textAlign: 'center'
        },
        menu: {
            
        },
        resppag: {
            width: '85%',
            maxWidth: '800px',
            margin: '0 auto'
        },
        link: {
            textAlign: 'center',
            color:'orange',
            textDecoration: 'none',
            marginBottom: 100 +'px'

        },
        span:{
            color: '#821616'
        }
    };
};

const Tutorial = () => {
    const {menu, title, link,span,resppag} = style();
    
    return (
        <div style={menu}>
            {/* <img src={'../../public/bg.jpg'} alt="af"/> */}
            <h1 style={title}>Welcome To <span style={span}>First Wave - Skill Future</span></h1>
            <div style={link}>
                <Link to="/game">
                    Game
                </Link>
            </div>
            <div style={resppag}>
            <p><b>Step:1</b> <br />
                How to Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br />
                Nesciunt illum delectus neque! Minus obcaecati eius corporis voluptate inventore vel nisi vitae,<br />
                qui consequuntur ex beatae sapiente ducimus neque delectus ratione?
            </p>

            <p><b>Step:2</b> <br />
                How to Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br />
                Nesciunt illum delectus neque! Minus obcaecati eius corporis voluptate inventore vel nisi vitae,<br />
                qui consequuntur ex beatae sapiente ducimus neque delectus ratione?
            </p>

            <p><b>Step:3</b> <br />
                How to Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br />
                Nesciunt illum delectus neque! Minus obcaecati eius corporis voluptate inventore vel nisi vitae,<br />
                qui consequuntur ex beatae sapiente ducimus neque delectus ratione?
            </p>
            </div>
        </div>
    );
};

export default Tutorial;