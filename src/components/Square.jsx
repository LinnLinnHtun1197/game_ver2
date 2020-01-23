import React from 'react';

const style = ({ size, position, color,display }) => {
    const dim = size +'px';
    return {
        width: dim,
        height: dim,
        borderRadius: 50+'%',
        backgroundColor: color,
        background: '../../public/robot.png',
        position: 'absolute',
        top: position.top + 'px',
        left: position.left + 'px',
        transition: 'all 0.1s ease',
        display: display,
    };
};

export default (props) => <div style={style(props)}/>