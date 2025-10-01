import { useEffect, useState } from 'react'

function QuesFour() {
    const [gridSize, setGridSize] = useState(4)
    const [cards, setCards] = useState([])

    const [flipped, setFlipped] = useState([])
    const [solved, setSolved] = useState([])
    const [disabled, setDisabled] = useState(false)

    const [won, setWon] = useState(false)
    const [move, setMove] = useState(0)

    const handleGridSizwChange = (e) => {
        const size = parseInt(e.target.value)
        if (size >= 2 && size <= 10) setGridSize(size)
    }

    const initializeGame = () => {

        const totalCards = gridSize * gridSize
        const pairCount = Math.floor(totalCards / 2)
        const numbers = [...Array(pairCount).keys()].map(n => n + 1)
        const shuffledCards = [...numbers, ...numbers]
            .sort(() => Math.random() - 0.5)
            .slice(0, totalCards)
            .map((number, i) => ({ id: i, number }))

        setCards(shuffledCards)
        setFlipped([])
        setSolved([])
        setWon(false)
        setDisabled(false)
        setMove(0)
    }

    useEffect(() => {
        initializeGame()
    }, [gridSize])

    useEffect(() => {
        if (!won && move >= 5) {
            setDisabled(true);  // lock the game
        }
    }, [move, won]);


    useEffect(() => {
        if (cards.length > 0 && solved.length === cards.length) {
            setWon(true)
        }
    }, [solved, cards])

    const checkMatch = (secondId) => {
        const [firstId] = flipped;

        if (cards[firstId].number === cards[secondId].number) {
            setSolved([...solved, firstId, secondId])
            setFlipped([])
            setDisabled(false)
        } else {
            setMove((prev) => {
                const newMove = prev + 1;
                if (newMove <= 5) setDisabled(false);
                return newMove;
            })
            setTimeout(() => {
                setFlipped([])
            }, 1000)
        }


    }

    const handleClick = (id) => {
        if (disabled || won) return

        if (flipped.length === 0) {
            setFlipped([id])
            return
        }
        if (flipped.length === 1) {
            setDisabled(true)
            if (id !== flipped[0]) {
                setFlipped([...flipped, id])
                checkMatch(id)

            } else {
                setFlipped([])
                setDisabled(false)
            }
            return
        }
    }

    const isFlipped = (id) => flipped.includes(id) || solved.includes(id)
    const isSolved = (id) => solved.includes(id)

    return (
        <div className='w-full bg-gray-50 p-4'>
            <h1 className="text-3xl text-center underline text-red-900">Q4. Memory Game</h1>
            <div className='max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6'>
                {/* Input */}
                <div>
                    <label htmlFor='gridSize'> Grid Size: (max:10)</label>
                    <input type='number' id='gridSize' min="2" max="10" value={gridSize} onChange={handleGridSizwChange} />
                </div>
                {/* moves used */}
                <div className=''>Moves left: {move}/5</div>
                {/* Game Board */}
                <div className='flex w-full align-center justify-center'>
                    <div className={`grid grid-cols-4 w-xs gap-1`}
                        style={{
                            gridTemplateColumns: `repeat(${gridSize},minmax(0,1fr))`,
                            width: `min(100%, ${gridSize * 5.5}rem)`
                        }}
                    >
                        {
                            cards.map((card) => {
                                return (
                                    <div
                                        key={card.id}
                                        className={`aspect-square flex items-center justify-center text-xl font-bold cursor-pointer rounded-2xl transition-all duration-300 bg-gray-500 text-gray-950
                                        
                                            ${isFlipped(card.id)
                                                ? isSolved(card.id)
                                                    ? 'bg-green-700 text-white'
                                                    : 'bg-sky-700 text-white'
                                                : 'nbg-gray-300 text-gray-400'}
                                            
                                                `}

                                        onClick={() => handleClick(card.id)}
                                    >
                                        {isFlipped(card.id) ? card.number : '?'}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {/* Result */}
                {won && <div className='text-green-800 text-center text-bold text-5xl m-1.5'> YOU WON!!!</div>}
                {/* Reset Button */}
                <div className='w-full flex justify-center align-center m-5'>
                    {(won || move >= 5) && <button className='bg-blue-950 text-white py-4 px-8 rounded-2xl cursor-pointer' onClick={initializeGame}>reset</button>}
                </div>
            </div>
        </div >
    )
}

export default QuesFour
