import React, { Component, PropTypes } from 'react';
import { Square } from 'components';

class Enemy extends Component {
    
    // componentWillMount() {
    //     const { size, playerPosition, info: { top, left }} = this.props;
        
    //     if ( playerPosition.left < (left + size) && 
    //          playerPosition.top  < (top + size)  &&
    //         (playerPosition.left + size) > left &&
    //         (playerPosition.top  + size) > top) {
    //         this.props.onCollide()
    //         console.log("touched enemy")
    //     }
    // }
    
    componentDidUpdate(){
        const { size, playerPosition, info: { top, left}} = this.props;
            if ( playerPosition.left < (left + size) && 
             playerPosition.top  < (top + size)  &&
            (playerPosition.left + size) > left &&
            (playerPosition.top  + size) > top) {
            this.props.onCollide()
            // console.log(this.props.onCollide())
            // if(this.props.onCollide){
            //     console.log('exit oncolo')
            //     return 
            // }
            // console.log("touched enemy")
        }
        
    }
    
    
    render() {
        const { size, info: { top, left },enemyValue} = this.props;
        // console.log(enemyValue)
        return (
                <Square 
                size={size}
                position={{ top, left }}
                color='red'
                />
        );
    }

}

Enemy.propTypes = {
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

export default Enemy;