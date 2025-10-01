import React, { useEffect, useState } from 'react'
import './styles.css'
import { MAX, MIN } from './constants'

function ProgressBar({ value = 0, onComplete }) {
    // const [percent, setPercent] = useState(value)
    // useEffect(() => {
    //     setPercent(Math.min(MAX, Math.max(MIN, value)))

    //     if (value >= MAX) {
    //         onComplete()
    //     }
    // }, [value])

    const [percent, setPercent] = useState(value);

    useEffect(() => {
        setPercent(Math.min(Math.max(value, MIN), MAX));

        if (value >= MAX) {
            onComplete();
        }
    }, [value]);
    return (
        // <div className='progress'>
        //     <span style={{ color: percent > 49 ? 'white' : 'black' }}>{percent.toFixed()}%</span>

        //     <div
        //         // style={{
        //         //     transform: `scaleX(${percent / MAX})`,
        //         //     transformOrigin: 'left',
        //         // }}
        //         style={{ width: `${percent}%` }}
        //         role='progressbar' aria-valuemax={MAX} aria-valuemin={MIN} aria-valuenow={percent} />
        // </div>
        <div className="progress">
            <span
                style={{
                    color: percent > 49 ? "white" : "black"
                }}
            >
                {percent.toFixed()}%
            </span>
            <div
                // style={{ width: `${percent}%` }}
                style={{
                    transform: `scaleX(${percent / MAX})`,
                    transformOrigin: "left"
                }}
                aria-valuemin={MIN}
                aria-valuemax={MAX}
                aria-valuenow={percent}
                role="progressbar"
            />
        </div>
    )
}

export default ProgressBar
