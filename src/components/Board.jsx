import React from 'react';

const style = (dimension) => {
    const dim = dimension + 'px';
    return {
        width: dim,
        height: dim,
        border: '5px solid #20002b',
        position: 'relative',
        margin: '25px auto',
        overflow: 'hidden'
    };
};

export default ({ dimension, children }) => (
    <div style={style(dimension)}>
        {children}
    </div>
)