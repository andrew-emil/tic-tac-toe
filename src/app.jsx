import React, { useEffect, useState } from 'react';

import "./app.css"

const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]


const App = () => {

    const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
    const [go , setGo] = useState("circle")
    const [winnigMessage, setMessage] = useState("")

    useEffect(() => {
        winningCombos.forEach((combo) => {
            const circleWins = combo.every((cell) => cells[cell] === "circle")
            const crossWins = combo.every((cell) => cells[cell] === "cross")
            if (circleWins) {
                setMessage("cirlce Wins! 🥳");
            }else if(crossWins){
                setMessage("cross Wins! 🥳");
            }else if(cells.every((cell) => cell !== "" && winnigMessage === "")){
                setMessage("Draw!")
            }
        })

        

    }, [cells, winnigMessage])

    const handleClick = (index) => {
        if(winnigMessage === ""){
            let newCell = [...cells];
            if (newCell[index] === "") {
                newCell[index] = go;
                setGo(go === "circle" ? "cross" : "circle");
                setCells(newCell);
            }
        }
    }

    return (
			<div className="app">
				<div className="gameBoard">
					{cells.map((cell, index) => (
						<div
							className={winnigMessage === "" ? "cell" : "gameOver"}
							key={index}
							onClick={() => handleClick(index)}>
							<div className={cell}>
								{cell === "circle" ? "O" : cell === "cross" ? "X" : ""}
							</div>
						</div>
					))}
				</div>
				<p className="winner">{winnigMessage}</p>
				{!winnigMessage && <p className="gameResult">it's now {go}'s turn</p>}
			</div>
		);
}

export default App