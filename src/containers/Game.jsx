import React, { Component } from 'react';
import axios from 'axios';
import { GameInfo, Board, Player, Enemy, DebugState, Helper,Data} from 'components';
import { UP, DOWN, LEFT, RIGHT } from 'helpers/constants';
import { pluck } from 'helpers/utils';
import { Link } from 'react-router-dom';
/*
    Since my api key is not publicly available,
    cloned versions will lack the ability to post
    new high scores.
*/
// import url from 'api';

const getDefaultState = ({ boardSize, playerSize, highScore = 0 }) => {
    const half = Math.floor(boardSize / 2) * playerSize;
    // const bottom = Math.floor(boardSize/199) * playerSize;
    // console.log(boardSize);
    return {
        size: {
            board: boardSize,
            player: playerSize,
            maxDim: boardSize * playerSize
        },
        positions: {
            player: {
                top: 760,
                left: half
            },
            enemies: [],
            helpers: [],
            data_analysis: [],
            finance: [],
            advance_manu: [],
            urban_solution: [],
            cyber_security: [],
            tech_service: []
        },
        itemName: '',
        itemScore: '',
        playerScore: 0,
        baseScore: 10,
        highScore,
        timeElapsed: 0,

        enemySpeed: 3,
        enemyIndex: 0,
        activeEnemies: 1,
        enemyValue: true,
        enemyScore: 0,
        
        helperSpeed: 1,
        helperIndex: 0,
        activeHelpers: 1,
        helperValue: 0,
        helperScore: 0,

        dataSpeed: 2,
        dataIndex: 0,
        activeData: 1,
        dataValue: 0,
        dataScore: 0,
        
    }
};

// const getAfterEnemy = ({ timeElapsed, playerSize}) => {
//     return {
//         timeElapsed: timeElapsed,
//         playerSize: playerSize,
//     }
// };
// const getAfterHelper = ({ timeElapsed, playerSize}) => {
//     return {
//         timeElapsed: timeElapsed,
//         playerSize: playerSize
//     }
// };

export default class Game extends Component {
    constructor(props) {
        // console.log(props)
        super(props);
        const half = Math.floor(props.boardSize / 2) * props.playerSize;
        const { boardSize, playerSize } = props;
        this.state = getDefaultState({ boardSize, playerSize })
    }

    placeEnemy = () => {
        // console.log(this.state.positions)
        // enemies always launch at player
        const { player, maxDim } = this.state.size;
        const { player: playerPos } = this.state.positions;
        const enemyValue = this.state.enemyValue;
        const itemName = this.state.itemName;
        const itemValue = this.state.itemValue;

        // console.log(playerPos);

        // assign to a random side
        // const side = pluck([UP, DOWN, LEFT, RIGHT]);
        const side = pluck([DOWN]);

        // generate enemy object
        const newEnemy = this.generateNewEnemy(playerPos, side, enemyValue,itemName,itemValue);
        // add new enemy to state
        this.setState({
            positions: {
                ...this.state.positions,
                enemies: [...this.state.positions.enemies].concat(newEnemy)
            }
        });
    }

    generateNewEnemy = (position, side, enemyValue,itemName,itemValue) => {
        this.setState({
            enemyIndex: this.state.enemyIndex + 2
        });

        const newEnemy = { key: this.state.enemyIndex, dir: side, enemyValue: enemyValue,itemName:itemName,itemValue:itemValue };
        const { maxDim, player } = this.state.size;

        switch(side) {
            case UP:
                newEnemy.top = maxDim;
                newEnemy.left = position.left+100;
                break;
            case DOWN:
                newEnemy.top = 0 - player;
                newEnemy.left = position.left+100;
                break;
            case LEFT:
                newEnemy.top = position.top;
                newEnemy.left = maxDim;
                break;
            case RIGHT:
                newEnemy.top = position.top;
                newEnemy.left = 0 - player;
                break;
        }

        return newEnemy;
    }

// Helper Start

    placeHelper = () => {
        // console.log(this.state.helperValue);
        const { player, maxDim } = this.state.size;
        const { player: playerPos } = this.state.positions;
        const side = pluck([DOWN]);
        const helperValue = this.state.helperValue;
        
        const newHelper = this.generateNewHelper(playerPos, side, helperValue);
        this.setState({
            positions: {
                ...this.state.positions,
                helpers: [...this.state.positions.helpers].concat(newHelper),
            }
        });
    }

    generateNewHelper = (position, side, helperValue) => {
        this.setState({
            helperIndex: this.state.helperIndex + 1
        });
        const newHelper = { key: this.state.helperIndex, dir: side, helperValue: helperValue };
        const { maxDim, player } = this.state.size;

        switch(side) {
            case UP:
                newHelper.top = maxDim;
                newHelper.left = position.left-200;
                break;
            case DOWN:
                newHelper.top = 0 - player;
                newHelper.left = position.left-200;
                break;
            case LEFT:
                newHelper.top = position.top;
                newHelper.left = maxDim;
                break;
            case RIGHT:
                newHelper.top = position.top;
                newHelper.left = 0 - player;
                break;
        }

        return newHelper;
    }
// End Helper

// Data Start

placeData = () => {
    // console.log(this.state.helperValue);
    const { player, maxDim } = this.state.size;
    const { player: playerPos } = this.state.positions;
    const side = pluck([DOWN]);
    const dataValue = this.state.dataValue;
    const newData = this.generateNewData(playerPos, side, dataValue);
    this.setState({
        positions: {
            ...this.state.positions,
            data_analysis: [...this.state.positions.data_analysis].concat(newData),
        }
    });
}

generateNewData = (position, side, dataValue) => {
    this.setState({
        dataIndex: this.state.dataIndex + 1
    });
    const newData = { key: this.state.dataIndex, dir: side, dataValue: dataValue };
    const { maxDim, player } = this.state.size;

    switch(side) {
        case UP:
            newData.top = maxDim;
            newData.left = position.left;
            break;
        case DOWN:
            newData.top = 0 - player;
            newData.left = position.left;
            break;
        case LEFT:
            newData.top = position.top;
            newData.left = maxDim;
            break;
        case RIGHT:
            newData.top = position.top;
            newData.left = 0 - player;
            break;
    }

    return newData;
}
// End Data


    handlePlayerMovement = (dirObj) => {
        const { top, left } = this.state.positions.player;
        const { player, maxDim } = this.state.size;

        // check walls
        switch (dirObj.dir) {
            case UP:
                if (top === 0) return;
                break;
            case DOWN:
                if (top === maxDim - player) return;
                break;
            case LEFT:
                if (left === 0) return;
                break;
            case RIGHT:
                if (left === maxDim - player) return;
                break;
        }

        this.setState({
            positions: {
                ...this.state.positions,
                player: {
                    top: top + (player * dirObj.top),
                    left: left + (player * dirObj.left)
                }
            }
        });
    }

    // handlePlayerCollision = () => {
    //     this.enemyscore();
    // }

    startGame = () => {
        this.enemyInterval = setInterval(this.updateEnemyPositions, 50);
        this.helperInterval = setInterval(this.updateHelperPositions, 50);
        // this.dataInterval = setInterval(this.dataIntervalPositions, 50);
        // this.timeInterval = setInterval(this.updateGame, 1000);
        this.timeInterval = setInterval(this.updateGame, 700);
        this.gameInterval = setInterval(this.updateEnemiesInPlay, 250);
        this.gameInterval1 = setInterval(this.updateHelpersInPlay, 250);
        // this.gameInterval2 = setInterval(this.updateDataInPlay, 250);
    }

    updateGame = () => {
        // console.log(this.state)
        const { timeElapsed } = this.state;

        this.updateTimeAndScore();

        if (timeElapsed > 0) {

            // increment enemy speed
            if (timeElapsed % 2 === 0) {
                this.incrementEnemySpeed();
            }
            // increment helper speed
            if (timeElapsed % 2 === 0) {
                this.incrementHelperSpeed();
            }
            // increment data speed
            if (timeElapsed % 4 === 0) {
                this.incrementDataSpeed();
            }

            // increment max active enemies every 10 seconds
            if (timeElapsed % 10 === 0) {
                this.incrementActiveEnemies();
            }

            // increment max active helpers every 10 seconds
            if (timeElapsed % 10 === 0) {
                this.incrementActiveHelpers();
            }

            // increment max active data every 10 seconds
            if (timeElapsed % 10 === 0) {
                this.incrementActiveData();
            }
        }
    }

    updateEnemyPositions = () => {
        // console.log(this.state.enemies)
        const { enemySpeed, positions: { enemies }, size: { player, maxDim }} = this.state;

        this.setState({
            positions: {
                ...this.state.positions,
                enemies: enemies.filter(enemy => !enemy.remove).map(enemy => {
                    if (enemy.top < (0 - player) ||
                        enemy.top > maxDim + player ||
                        enemy.left < (1 - player) ||
                        enemy.left > maxDim + player ) {
                        enemy.remove = true;
                        return enemy;
                    }

                    // based on direction, increment the correct value (top / left)
                    switch(enemy.dir) {
                        case UP:
                            enemy.top -= enemySpeed;
                            break;
                        case DOWN:
                            enemy.top += enemySpeed;
                            break;
                        case LEFT:
                            enemy.left -= enemySpeed;
                            break;
                        case RIGHT:
                            enemy.left += enemySpeed;
                            break;
                    }

                    return enemy;
                })
            }
        });
    }

    updateHelperPositions = () => {
        const { helperSpeed, positions: { helpers }, size: { player, maxDim }} = this.state;

        this.setState({
            positions: {
                ...this.state.positions,
                helpers: helpers.filter(helper => !helper.remove).map(helper => {
                    if (helper.top < (0 - player) ||
                        helper.top > maxDim + player ||
                        helper.left < (0 - player) ||
                        helper.left > maxDim + player ) {
                        helper.remove = true;
                        return helper;
                    }

                    switch(helper.dir) {
                        case UP:
                            helper.top -= helperSpeed;
                            break;
                        case DOWN:
                            helper.top += helperSpeed;
                            break;
                        case LEFT:
                            helper.left -= helperSpeed;
                            break;
                        case RIGHT:
                            helper.left += helperSpeed;
                            break;
                    }

                    return helper;
                })
            }
        });
    }

    updateDataPositions = () => {
        const { dataSpeed, positions: { data_analysis }, size: { player, maxDim }} = this.state;

        this.setState({
            positions: {
                ...this.state.positions,
                data_analysis: data_analysis.filter(data => !data.remove).map(data => {
                    if (data.top < (0 - player) ||
                        data.top > maxDim + player ||
                        data.left < (0 - player) ||
                        data.left > maxDim + player ) {
                        data.remove = true;
                        return data;
                    }

                    switch(data.dir) {
                        case UP:
                            data.top -= dataSpeed;
                            break;
                        case DOWN:
                            data.top += dataSpeed;
                            break;
                        case LEFT:
                            data.left -= dataSpeed;
                            break;
                        case RIGHT:
                            data.left += dataSpeed;
                            break;
                    }

                    return data;
                })
            }
        });
    }

    updateEnemiesInPlay = () => {
        const { activeEnemies } = this.state;
        const { enemies } = this.state.positions;

        if (enemies.length < activeEnemies) {
            this.placeEnemy();
        }
    }

    updateHelpersInPlay = () => {
        const { activeHelpers } = this.state;
        const { helpers } = this.state.positions;

        if (helpers.length < activeHelpers) {
            this.placeHelper();
        }
    }

    updateDataInPlay = () => {
        const { activeData } = this.state;
        const { data_analysis } = this.state.positions;

        if (data_analysis.length < activeData) {
            this.placeData();
        }
    }

    updateTimeAndScore = () => {
        // console.log(this.state);
        const { timeElapsed, playerScore, baseScore } = this.state;

        this.setState({
            timeElapsed: timeElapsed + 1,
            playerScore: playerScore,
        });
    }

    incrementEnemySpeed = () => {
        const { enemySpeed } = this.state;

        this.setState({
            enemySpeed: parseFloat((enemySpeed + 0.15).toFixed(2))
        });
    }
    incrementHelperSpeed = () => {
        const { helperSpeed } = this.state;

        this.setState({
            helperSpeed: parseFloat((helperSpeed + 0.15).toFixed(2))
        });
    }
    incrementDataSpeed = () => {
        const { dataSpeed } = this.state;

        this.setState({
            dataSpeed: parseFloat((dataSpeed + 0.15).toFixed(2))
        });
    }

    incrementActiveEnemies = () => {
        this.setState({
            activeEnemies: this.state.activeEnemies + 1
        });
    }

    incrementActiveHelpers = () => {
        this.setState({
            activeHelpers: this.state.activeHelpers + 1
        });
    }
    incrementActiveData = () => {
        this.setState({
            activeData: this.state.activeData + 1
        });
    }

    // enemy reduce score
    enemyscore = () => {
        // console.log(this.state.positions.enemies)
        // const { timeElapsed, playerSize } = this.state;
        // const { playerScore, highScore, globalHighScore, debug } = this.state;
        this.state.playerScore = this.state.playerScore - 1;
        this.state.itemName = "Cyber Security";
        this.state.itemValue = "-31";
        // this.setState({
        //     ...getAfterEnemy({ timeElapsed, playerSize }),
        //     debug,
        //     highScore: playerScore > highScore ? playerScore : highScore,
        //     playerScore: reduceScore,
        //     enemyValue: false

        // });
        // this.startGame();
    }

    // helper reduce score
    helperscore = () => {
        const { timeElapsed, playerSize } = this.state;
        const { playerScore, highScore, globalHighScore, debug } = this.state;
        this.state.playerScore = playerScore + 10;
        this.state.itemName = "Data Science";
        this.state.itemValue = "+500";
        // const { timeElapsed, playerSize } = this.state;
        // const { playerScore, highScore, globalHighScore, debug } = this.state;

        // const plusScore = playerScore + 10;
        // this.setState({
        //     ...getAfterHelper({ timeElapsed, playerSize }),
        //     debug,
        //     highScore: playerScore > highScore ? playerScore : highScore,
        //     playerScore: plusScore,
        // });
    }

    datascore = () => {
        const { timeElapsed, playerSize } = this.state;
        const { playerScore, highScore, globalHighScore, debug } = this.state;
        this.state.playerScore = playerScore + 20;
        // const { timeElapsed, playerSize } = this.state;
        // const { playerScore, highScore, globalHighScore, debug } = this.state;

        // const plusScore = playerScore + 10;
        // this.setState({
        //     ...getAfterHelper({ timeElapsed, playerSize }),
        //     debug,
        //     highScore: playerScore > highScore ? playerScore : highScore,
        //     playerScore: plusScore,
        // });
    }

    resetGame = () => {
        const { boardSize, playerSize } = this.props;
        const { timeElapsed, playerScore, highScore, globalHighScore, debug } = this.state;

        // clear intervals
        clearInterval(this.gameInterval);
        clearInterval(this.gameInterval1);
        clearInterval(this.enemyInterval);
        clearInterval(this.helperInterval);
        clearInterval(this.timeInterval);

        // if high score is higher than global high score, update it
        if (playerScore > globalHighScore) {
            this.updateGlobalHighScore(playerScore);
        }

        // reset state
        this.setState({
            ...getDefaultState({ boardSize, playerSize, highScore }),
            // persist debug state and high scores
            debug,
            highScore: playerScore > highScore ? playerScore : highScore,
            globalHighScore
        });
        // restart game
        this.startGame();
    }

    handleDebugToggle = () => {
        this.setState({
            debug: this.debug.checked
        });
    }

    fetchGlobalHighScore = () => {
        // axios.get(url)
        //     .then(data => {
        //         this.setState({
        //             globalHighScore: data.data.fields.global_high_score
        //         })
        //     })
        //     .catch(err => console.warn(err))
    }

    updateGlobalHighScore = (highScore) => {
        // axios.patch(url, {
        //     "fields": {
        //         "global_high_score": highScore
        //     }
        // })
        // .then(data => {
        //     this.setState({
        //         globalHighScore: data.data.fields.global_high_score
        //     });
        // })
        // .catch(err => console.warn(err))
    }

    style = () => {
        return {
            width: '85%',
            maxWidth: '800px',
            margin: '0 auto'
        };
    }

    render() {
        const {
            size: { board, player },
            positions: { player: playerPos },
            playerScore,
            timeElapsed,
            highScore,
            globalHighScore,
        } = this.state;

        return (
            <div>
            <div style={{position:'absolute',marginTop:'-40px'}}>
                <img src={'../../public/b.gif'} alt="af" width="1000vh" height="1750vh"/>
            </div>
            <div style={{position:'relative'}}>
            <div style={this.style()}>
                <GameInfo
                    playerScore={playerScore}
                    timeElapsed={timeElapsed}
                    highScore={highScore}
                    globalHighScore={globalHighScore} />
                <div style={{textAlign:'center',fontSize: 2 + 'rem'}}>
                    <Link to="/finish">
                        Final Page
                    </Link>
                </div>
                <Board dimension={board * player}>
                    <Player
                        size={player}
                        position={playerPos}
                        handlePlayerMovement={this.handlePlayerMovement} />

                    {
                        this.state.positions.enemies.map(enemy =>
                            <Enemy key={enemy.key}
                                size={player}
                                info={enemy}
                                playerPosition={playerPos}
                                onCollide={this.enemyscore}
                                enemyValue={this.state.enemyValue}
                                itemName={this.state.itemName}
                                itemValue={this.state.itemValue} />
                        )

                    }
                    {
                        this.state.positions.helpers.map(helper =>

                            <Helper key={helper.key}
                                size={player}
                                info={helper}
                                playerPosition={playerPos}
                                onCollide={this.helperscore} />
                        )
                    }
                    {/* {
                        this.state.positions.data_analysis.map(data =>

                            <Data key={data.key}
                                size={player}
                                info={data}
                                playerPosition={playerPos}
                                onCollide={this.datascore} />
                        )
                    } */}
                </Board>
                <div style={{marginTop: 200+'px'}}>
                <p style={{fontSize: 2 + 'rem',color: 'white'}}>You touched: {this.state.itemName}</p>
                <p style={{fontSize: 2 + 'rem',color: 'white'}}>Score : {this.state.itemValue}</p>
                </div>
                {false && <p style={{ position: 'fixed', bottom: 0, left: 16 }}>Debug: <input type="checkbox" onChange={this.handleDebugToggle} ref={ n => this.debug = n }/></p>}
                {this.state.debug && <DebugState data={this.state} />}
            </div>
            </div>
            
            </div>
        )
    }

    componentDidMount() {
        this.startGame();
        this.fetchGlobalHighScore();
    }

    componentWillUnmount() {
        clearInterval(this.state.gameInterval);
        clearInterval(this.state.gameInterval1);
        // clearInterval(this.state.gameInterval2);
        clearInterval(this.state.enemyInterval);
        clearInterval(this.state.helperInterval);
        // clearInterval(this.state.dataInterval);
        clearInterval(this.state.timeInterval);
    }
}
