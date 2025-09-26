import { useEffect, useState } from "react"


function QuesSix() {
    const [clicked, setClicked] = useState([])
    const config = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ]

    const handleClick = (index) => {
        setClicked((prev) => [...prev, index])
    }

    const isClicked = (index) => clicked.includes(index)



    useEffect(() => {
        if (clicked.length === 8) {
            for (let i = 0; i < 8; i++)
                setTimeout(() => {
                    setClicked((prev) => {
                        if (prev.length === 0) return []
                        return prev.slice(0, -1)
                    })
                }, 300 * i)
        }

    }, [clicked])

    return (
        <div className='w-full bg-gray-50 p-4'>
            <h1 className="text-3xl text-center underline text-red-900">Q6. Grid Lights</h1>
            <div className='max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 flex justify-center align center'>
                <div className="grid grid-cols-3 w-[250px] gap-2">
                    {config.flat(1).map((row, index) => {
                        if (row) {
                            return (
                                <div key={index} className={` cursor-pointer border-2 rounded-xl h-20 w-20 ${isClicked(index) ? "bg-green-600" : "border-black"
                                    }`} onClick={() => handleClick(index)} />
                            )
                        } else {
                            return (
                                <div key={index} className={`bg-white border-2 border-white h-20 w-20 disabled`} />
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default QuesSix
