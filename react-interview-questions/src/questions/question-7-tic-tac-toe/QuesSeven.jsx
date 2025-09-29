import { useEffect, useState } from "react"


function QuesSeven() {
    const [grid, setGrid] = useState(3)
    const [board, setBoard] = useState(Array.from({ length: grid }, () => Array(grid).fill(0)))
    const [player, setPlayer] = useState(true)
    const [won, setWon] = useState(null)

    console.log(board)

    const initialiseGame = (grid) => {
        setBoard(Array.from({ length: grid }, () => Array(grid).fill(null)))
        setPlayer(true)
        setWon(null)
    }

    const checkWinner = (board) => {
        const n = board.length

        // row

        for (let i = 0; i < n; i++) {
            if (board[i][0] && board[i].every(cell => cell === board[i][0])) return board[i][0]
        }

        // col
        for (let j = 0; j < n; j++) {
            const col = board.map(row => row[j])
            if (col[0] && col.every(cell => cell === col[0])) return col[0]

        }

        // l-r diagonal
        if (board[0][0] && board.every((row, index) => row[index] === board[0][0])) return board[0][0]

        // r-l diagonal
        if (board[0][n - 1] && board.every((row, index) => row[n - 1 - index] === board[0][n - 1])) return board[0][n - 1]

        return null
    }

    const handleClick = (i, j) => {
        setBoard((prev) => {
            const newBoard = prev.map(row => [...row])
            console.log(newBoard)
            if (player === true) {
                newBoard[i][j] = 'X'
                return newBoard
            }
            newBoard[i][j] = 'O'
            return newBoard
        })
        setPlayer(prev => !prev)
        console.log(player)
    }


    useEffect(() => {
        initialiseGame(grid)
    }, [grid])

    useEffect(() => {
        const result = checkWinner(board)
        if (result) setWon(result)
    }, [board])

    return (
        <div className='w-full bg-gray-50 p-4 '>
            <h1 className="text-3xl text-center underline text-red-900">Q7. Tic-Tac-Toe</h1>
            <div className='max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 flex-col justify-center items-center'>

                <div className="text-center">
                    <input type="number" value={grid} min={3} max={10} onChange={(e) => setGrid(parseInt(e.target.value))} />
                </div>
                <div className="text-center m-4">
                    <button className="bg-blue-800 text-white rounded-xl py-2 px-4" onClick={() => initialiseGame(grid)}>
                        Reset
                    </button>
                </div>
                {/* board */}
                <div className="flex justify-center align-center">
                    <div className={`grid grid-cols-${grid} gap-1.5`}>
                        {board.map((el, i) => {
                            return (<>
                                {el.map((ele, j) => {
                                    return (
                                        <div key={Math.random()} className={`w-15 h-15  flex justify-center align-center rounded-lg ${(ele === 'X' || ele === 'O' || won) && 'pointer-events-none'} 
                                            ${won
                                                ? 'bg-gray-500'
                                                : ele === 'X'
                                                    ? 'bg-sky-500'
                                                    : ele === 'O'
                                                        ? 'bg-red-500'
                                                        : 'border-2 border-black'
                                            }

                                            
                                            
                                                //     ? 'bg-green-500'
                                                //         ? ele === 'X'
                                                //             ? 'bg-sky-500'
                                                //             : ele === 'O'
                                                //                 ? 'bg-red-500' : 'border-2 border-black' }

                                                `} onClick={() => { handleClick(i, j) }}>{ele}</div>
                                    )
                                })}
                            </>)
                        })}
                    </div>
                </div>
                <div className="text-center m-10 text-green-950 font-bold text-5xl ">
                    {won && <div> {won} Won!! </div>}

                </div>
            </div>
        </div>
    )
}

export default QuesSeven
