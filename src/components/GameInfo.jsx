import React, { PropTypes } from 'react';
// import '../../public/style.css'
const style = () => {
    return {
        h1:{
            fontSize: 3 + 'rem',
        },
        h3: {
            fontSize: 2 + 'rem'
        },
        container: {
            textAlign: 'center',
            color: 'white',
        },
        info: {
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-around',
            fontSize: 2 + 'rem'

        }
    };
};

const GameInfo = ({
    timeElapsed,
    playerScore,
    highScore,
    globalHighScore = 'Loading...'
}) => {
    const { container, info,h1,h3 } = style();
    return (
        <div style={container} className="gameInfo">
            <h1 style={h1}>Skill Future</h1>
            <h3 style={h3}>Use arrows to move the Player.</h3>
            <div style={info}>
                <p>Player</p>
                <p>Time: {timeElapsed}</p>
                <p>Score: {playerScore}</p>
            </div>
            <div style={info}>
                {/* <p>High Score: {highScore}</p> */}
                {/* <p>Global High Score: {globalHighScore}</p> */}
            </div>
        </div>
    )
}

GameInfo.propTypes = {
    timeElapsed: PropTypes.number.isRequired,
    playerScore: PropTypes.number.isRequired,
    highScore: PropTypes.number.isRequired,
    // globalHighScore: PropTypes.number
};

export default GameInfo;