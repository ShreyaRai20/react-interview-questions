import React, { useMemo, useState } from 'react'

function CinemaSeatBooking({
    layout = {
        rows: 8,
        seatsPerRow: 16,
        aislePosition: 8
    },
    seatTypes = {
        regular: { name: "regular", price: 150, rows: [0, 1, 2] },
        premium: { name: "premium", price: 250, rows: [3, 4, 5] },
        vip: { name: "vip", price: 350, rows: [6, 7] }
    },
    bookedSeats = [],
    currency = 'Rs',
    onBookingComplete = () => { },
    title = "Cinema Hall Booking",
    subTitle = "Select your preferred seats"
}) {

    const [selectedSeats, setSelectedSeats] = useState([])
    const colors = [
        'blue',
        'purple',
        'yellow',
        'gray',
        'pink',
        'indigo'
    ]

    const getSeatType = (row) => {
        const seatTypesEntries = Object.entries(seatTypes)

        for (let i = 0; i < seatTypesEntries.length; i++) {
            const [type, config] = seatTypesEntries[i]

            if (config.rows.includes(row)) {
                const color = colors[i % colors.length]
                return { type, color, ...config }
            }
        }

        const [firstType, firstConfig] = seatTypesEntries[0]
        return { type: firstType, color: colors[0], ...firstConfig }

    }

    const initializeSeats = useMemo(() => {
        const seats = []
        for (let row = 0; row < layout.rows; row++) {
            const seatRow = []
            const seatTypeInfo = getSeatType(row)

            for (let seat = 0; seat < layout.seatsPerRow; seat++) {
                const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`

                seatRow.push({
                    id: seatId,
                    row,
                    seat,
                    type: seatTypeInfo?.type || 'regular',
                    price: seatTypeInfo?.price || 150,
                    color: seatTypeInfo?.color || 'blue',
                    status: bookedSeats.includes(seatId) ? 'booked' : 'available',
                    selected: false
                })
            }

            seats.push(seatRow)
        }
        return seats

    }, [layout, seatTypes, bookedSeats])

    const getColorClass = (seatColor) => {
        const colorMap = {
            blue: 'blue-100 border-blue-300 text-blue-800 hover:bg-blue-200',
            purple: 'purple-100 border-purple-300 text-purple-800 hover:bg-purple-200',
            yellow: 'yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200',
            green: 'green-100 border-green-300 text-green-800 hover:bg-green-200',
            red: 'red-100 border-red-300 text-red-800 hover:bg-red-200',
            indigo: 'red-100 border-red-300 text-red-800 hover:bg-red-200',
            pink: 'red-100 border-red-300 text-red-800 hover:bg-red-200',
            gray: 'red-100 border-red-300 text-red-800 hover:bg-red-200'
        }

        return colorMap[seatColor] || colorMap.blue
    }

    const getSeatClassName = (seat) => {
        const baseClass = " w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 m-1 rounded-t-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs sm:text-sm font-bold border-blue-200 text-blue-800"

        if (seat.status === 'booked') {
            return `${baseClass} bg-gray-400 boder-gray-500 text-gray-600 cursor-not-allowed`
        }

        if (seat.selected) {
            return `${baseClass} bg-green-400 boder-green-500 text-white transform sclae-110`
        }

        return `${baseClass} ${getColorClass(seat.color)}`
    }

    const handleSeatClick = (rowIndex, seatIndex) => {
        const seat = seats[rowIndex][seatIndex]

        if (seat.status === 'booked') return

        const isCurrentlySelected = seat.selected

        setSeats((prevSeats) => {
            return prevSeats.map((row, rIdx) => row.map((s, sIdx) => {
                if (rIdx === rowIndex && sIdx === seatIndex) {
                    return { ...s, selected: !s.selected }
                }
                return s;
            })
            )
        })

        if (isCurrentlySelected) {
            setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id))
        } else {
            setSelectedSeats((prev) => [...prev, seat])
        }
    }

    const renderSeatSection = (seatRow, startIndex, endIndex) => {
        return (
            <div className='flex'>
                {seatRow.slice(startIndex, endIndex).map((seat, index) => {
                    return <div
                        key={seat.id}
                        className={getSeatClassName(seat)}
                        title={`${seat.id} - ${getSeatType(seat.row)?.name || 'regular'} - ${currency}${seat.price}`}
                        onClick={() => handleSeatClick(seat.row, startIndex + index)}
                    >
                        {startIndex + index + 1}
                    </div>
                })}
            </div>
        )
    }

    const [seats, setSeats] = useState(initializeSeats)

    const uniqueSeatTypes = Object.entries(seatTypes).map(
        ([type, config], index) => {
            return {
                type,
                color: colors[index % colors.length],
                ...config
            }
        }
    )

    const getTotalPrice = () => {
        return selectedSeats.reduce((total, seat) => total + seat.price, 0)
    }

    const handleBooking = () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat")
            return
        }

        setSeats((prevSeats) => {
            return prevSeats.map((row) => row.map((seat) => {
                if (selectedSeats.some((selected) => selected.id === seat.id)) {
                    return { ...seat, status: 'booked', selected: false }
                }
                return seat;
            })
            )
        })

        onBookingComplete({
            seats: selectedSeats,
            totalPrice: getTotalPrice(),
            seatIds: selectedSeats.map((seat) => seat.id)
        })

        alert("booked")
        setSelectedSeats([])

    }

    return (
        <div className='w-full min-h-screen bg-gray-50 p-4'>
            {/* title  */}
            <div className='max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6'>
                <h1 className='text-2xl lg:text-3xl font-bold text-center mb-2 text-gray-800'>{title}</h1>
                <p className='text-center mb-6 text-gray-600'>{subTitle}</p>

                {/* screen */}
                <div className='mb-8'>
                    <div className=' w-full lg:h-4 h-2 bg-gradient-to-r from-gray-300 via-gray-600 to-gray-300 mb-2 shadow-inner rounded-lg' />
                    <p className='text-center text-sm text-gray-500 font-medium'>SCREEN</p>
                </div>
                {/* seats */}
                <div className='mb-6 overflow-x-auto'>
                    <div className='flex flex-col items-center min-w-max'>
                        {
                            seats.map((row, rowIndex) => {
                                return (
                                    <div key={rowIndex} className='flex items-center mb-2'>
                                        <span className='w-8 text-center font-bold text-gray-600 mr-4'>
                                            {String.fromCharCode(65 + rowIndex)}
                                        </span>
                                        {renderSeatSection(row, 0, layout.aislePosition)}
                                        {/* aisle */}
                                        <div className='w-8' />
                                        {renderSeatSection(row, layout.aislePosition, layout.seatsPerRow)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* legend */}
                <div className='flex flex-wrap justify-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg'>
                    {uniqueSeatTypes.map((seatType) => {
                        return (
                            <div key={seatType.type} className='flex items-center'>
                                <div className={`w-6 h-6 border-2 rounded-t-lg mr-2 ${getColorClass(seatType.color) || 'bg-blue-200 border-blue-300'}`} />
                                <span className='text-sm'>
                                    {seatType.name} ({currency}{seatType.price})
                                </span>
                            </div>
                        )
                    })}
                    <div className='flex items-center'>
                        <div className='w-6 h-6 border-2 rounded-t-lg mr-2 border-green-600' />
                        <span>Selected</span>
                    </div>
                    <div className='flex items-center'>
                        <div className='w-6 h-6 border-2 rounded-t-lg mr-2 border-gray-500 bg-gray-400' />
                        <span>Booked</span>
                    </div>

                </div>

                {/* booking summary */}
                <div className='bg-gray-50 rounded-lg p-4 mb-4'>
                    <h3 className='font-bold text-lg mb-2'>Booking Summary</h3>
                    {selectedSeats.length > 0 ? (
                        <div>
                            <p className='mb-2'>
                                Selected Seats : {" "}
                                <span className='font-medium'>
                                    {selectedSeats.map((s) => s.id).join(', ')}
                                </span>
                            </p>
                            <p className='mb-2'>
                                No of Seats : {" "}
                                <span className='font-medium'>
                                    {selectedSeats.length}
                                </span>
                            </p>
                            <p className='text-xl font-bold text-green-600'>
                                Total : {currency}
                                {getTotalPrice()}
                            </p>
                        </div>
                    ) : (
                        <p>
                            No seats booked
                        </p>
                    )}
                </div>
                {/* book button */}
                <button
                    onClick={handleBooking}
                    disabled={selectedSeats === 0}
                    className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${selectedSeats.length > 0 ? " bg-green-500 hover:bg-green-600 text-white transform hover:scale-105 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                    Book Seats - {currency}{getTotalPrice()}
                </button>
            </div>

        </div >
    )
}

export default CinemaSeatBooking
