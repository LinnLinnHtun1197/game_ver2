import React, { Component, PropTypes } from 'react';
import { Square } from 'components';

class Helper extends Component {
    componentDidUpdate() {
        const { size, playerPosition, info: { top, left }} = this.props;
        
        if ( playerPosition.left < (left + size) && 
             playerPosition.top  < (top + size)  &&
            (playerPosition.left + size) > left &&
            (playerPosition.top  + size) > top) {
            this.props.onCollide()
        }
    }
    // componentDidMount(){
    //         this.props.onCollide()

    // }

    render() {
        const { size, info: { top, left }} = this.props;
        const value = 10;
        
        return (
            <Square 
                size={size}
                position={{ top, left }}
                color='green'/>
                // <img src={'../../public/robot.png'} alt="robot" width="100px" height="100px"/>
            
        );
    }
}

Helper.propTypes = {
    size: PropTypes.number.isRequired,
    info: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        dir: PropTypes.string.isRequired
    }),
    playerPosition: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
    }),
    onCollide: PropTypes.func.isRequired
};

export default Helper;