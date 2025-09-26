import { useEffect, useState } from "react"
import ProgressBar from "./ProgressBar"


function QuestionFive() {
    const [value, setValue] = useState(0)
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        setInterval(() => {
            setValue(val => val + 1)
        }, 100)
    }, [setValue])
    return (
        <div className='w-full bg-gray-50 p-4'>
            <h1 className="text-3xl text-center underline text-red-900">Q5. Progress Bar</h1>
            <div className='max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 flex justify-center align-items-center'>
                <div className="app">
                    <ProgressBar value={value} onComplete={() => { setSuccess(true) }} />
                    <div>{success ? 'complete' : 'loading...'}</div>

                </div>
            </div>
        </div>
    )
}

export default QuestionFive
