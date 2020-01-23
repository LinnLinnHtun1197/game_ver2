import React from 'react';
import { Link } from 'react-router-dom';
// import './style.css';
const style = () => {
    return {
        title:{
            textAlign: 'center'
        },
        menu: {
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
    };
};

const Finish = () => {
    const {menu, title, link} = style();
    return (
        <div style={menu}>
            <h1 style={title}>Your Final Page</h1>
            <div style={link}>
                <Link to="/">
                    Tutorial Page
                </Link>
            </div>
            
            <p><b>Finished Your game</b> <br />
                How to Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br />
                Nesciunt illum delectus neque! Minus obcaecati eius corporis voluptate inventore vel nisi vitae,<br />
                qui consequuntur ex beatae sapiente ducimus neque delectus ratione?
            </p>
        </div>
    );
};

export default Finish;