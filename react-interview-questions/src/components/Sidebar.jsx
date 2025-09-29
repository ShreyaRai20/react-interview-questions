import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {

    const links = [{
        id: '1',
        name: 'Cinema Seat Booking',
        to: 'cinema-seat-booking'
    },
    {
        id: '2',
        name: 'File Explorer',
        to: 'file-explorer'
    },
    {
        id: '3',
        name: 'Pagination',
        to: 'pagination'
    },
    {
        id: '4',
        name: 'Memory Game',
        to: 'memory-game'
    },
    {
        id: '5',
        name: 'Progress Bar',
        to: 'progress-bar'
    },
    {
        id: '6',
        name: 'Grid Lights',
        to: 'grid-lights'
    },
    {
        id: '7',
        name: 'Tic Tac Toe',
        to: 'tic-tac-toe'
    }
    ]
    return (
        <div className=''>
            <ul>
                {links.map(({ name, id, to }) => (
                    <li key={id} >
                        <Link to={to} >{name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
