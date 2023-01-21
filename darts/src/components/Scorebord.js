import React, { useState, useEffect } from 'react'

function Scorebord() {

    const [scores, setScores] = useState({});
    const [players, setPlayers] = useState([]);
    const [lastActions, setLastActions] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        initScores(players);
    }, [players]);

    const initScores = (players) => {
        let initialScores = {};
        players.forEach((player) => {
            initialScores[player] = {
                score: 0,
                closed: {
                    15: 0,
                    16: 0,
                    17: 0,
                    18: 0,
                    19: 0,
                    20: 0,
                    25: 0,
                },
            };
        });
        setScores(initialScores);
    };

    const updateScore = (player, score) => {
        const updatedScores = { ...scores };
        if (score === 15 && updatedScores[player].closed[15] < 3) updatedScores[player].closed[15]++;
        else if (score === 16 && updatedScores[player].closed[16] < 3) updatedScores[player].closed[16]++;
        else if (score === 17 && updatedScores[player].closed[17] < 3) updatedScores[player].closed[17]++;
        else if (score === 18 && updatedScores[player].closed[18] < 3) updatedScores[player].closed[18]++;
        else if (score === 19 && updatedScores[player].closed[19] < 3) updatedScores[player].closed[19]++;
        else if (score === 20 && updatedScores[player].closed[20] < 3) updatedScores[player].closed[20]++;
        else if (score === 25 && updatedScores[player].closed[25] < 3) updatedScores[player].closed[25]++;
        else updatedScores[player].score += score;
        setScores(updatedScores);
    };

    const closeTarget = (player, target) => {
        setScores((prevScores) => {
            const newScores = { ...prevScores };
            newScores[player].closed[target] = true;
            return newScores;
        });
    };

    const checkWin = (player) => {
        const closedTargets = Object.values(scores[player].closed);
        return closedTargets.every((target) => target === true);
    };
    const checkClosedScore = () => {
        let allClosed = true;
        Object.entries(scores).forEach(([player, score]) => {
            if (!score.closed['15'] || !score.closed['16'] || !score.closed['17'] || !score.closed['18'] || !score.closed['19'] || !score.closed['20'] || !score.closed['Bull']) {
                allClosed = false;
            }
        });
        return allClosed;
    }

    const handleClick = (e, player) => {
        const value = player;
        const target = Number(e.target.name);        

        updateScore(player, target);
        if (value === 0) {
            closeTarget(player, target);
        }
        if (checkWin(player)) {
            alert(`Player ${player} wins!`);
        }
        setLastActions([...lastActions, { player, score: e.target.name }]);
        if (checkClosedScore()) {
            e.currentTarget.disabled = true;
        }
    };

    const undo = () => {
        //Undo last action
        if (lastActions.length === 0) return;
        const { player, score } = lastActions[lastActions.length - 1];
        let newScores = { ...scores };
        if (newScores[player].score > 0) {
            newScores[player].score -= Number(score);
        }
        else { newScores[player].closed[score]--; }

        setScores(newScores);
        setLastActions(lastActions.slice(0, -1));
    }

    const handleAddPlayer = () => {
        const newPlayerName = window.prompt("Enter the name of the new player:");
        if (newPlayerName) {
            const confirm = window.confirm("Are you sure you want to add " + newPlayerName + " ?")
            if (confirm)
                setPlayers([...players, newPlayerName]);
        }
    }

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }
    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-4  text-center text-3xl mb-5">
                {players.length === 0 ?
                    <p>There are no players</p> :
                    <div className="flex justify-between items-center text-center">
                        {Object.entries(scores).map(([player, score]) => (
                            <div className="flex flex-col  mx-auto " key={player}>
                                <span className="text-gray-600 mb-3">{player}</span>
                                <span className="text-4xl font-bold">{score.score}</span>
                            </div>
                        ))}
                    </div>
                }
            </div>

            <div className='flex flex-row items-center '>
                <div className=' flex-1 h-full'>
                    <h1 className="text-3xl font-bold text-center text-white">20</h1>
                    <h1 className="text-3xl font-bold text-center text-white">19</h1>
                    <h1 className="text-3xl font-bold text-center text-white">18</h1>
                    <h1 className="text-3xl font-bold text-center text-white">17</h1>
                    <h1 className="text-3xl font-bold text-center text-white">16</h1>
                    <h1 className="text-3xl font-bold text-center text-white">15</h1>
                    <h1 className="text-3xl font-bold text-center text-white">Bull</h1>
                </div>

                {Object.entries(scores).map(([player, score]) => (
                    <div className=' flex-1' key={player}>
                        <img src={score.closed['20'] + ".png"} alt="darts" className="w-auto h-auto" name="20" onClick={(e) => handleClick(e, player)} />
                        <img src={score.closed['19'] + ".png"} alt="darts" className="w-auto h-auto" name="19" onClick={(e) => handleClick(e, player)} />
                        <img src={score.closed['18'] + ".png"} alt="darts" className="w-auto h-auto" name="18" onClick={(e) => handleClick(e, player)} />
                        <img src={score.closed['17'] + ".png"} alt="darts" className="w-auto h-auto" name="17" onClick={(e) => handleClick(e, player)} />
                        <img src={score.closed['16'] + ".png"} alt="darts" className="w-auto h-auto" name="16" onClick={(e) => handleClick(e, player)} />
                        <img src={score.closed['15'] + ".png"} alt="darts" className="w-auto h-auto" name="15" onClick={(e) => handleClick(e, player)} />
                        <img src={score.closed['25'] + ".png"} alt="darts" className="w-auto h-auto" name="25" onClick={(e) => handleClick(e, player)} />
                    </div>
                ))}
            </div>
            {players.length === 0 ?
                <p></p> :
                <button className="bg-white text-black font-bold py-2 px-4 rounded-full" onClick={undo}>Undo</button>
            }

            {isVisible ? (
                <div className="flex justify-center items-center pt-11">
                    <button onClick={handleAddPlayer} class="inline-flex items-center justify-center w-10 h-10   bg-green-500 rounded-lg">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                    </button>
                    <button class="ml-2 h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full" onClick={toggleVisibility}>Start</button>
                </div>
            ) : null}
        </>
    )
}

export default Scorebord