import CinemaSeatBooking from "./CinemaSeatBooking"


function QuesOne() {
    return (
        <>
            <h1 className="text-3xl text-center underline text-red-900">Q1. Cinema Seat Booking question UI</h1>
            <CinemaSeatBooking bookedSeats={['C2', 'C3', 'C6']} onBookingComplete={(booking) => {
                console.log(booking)
            }} />
        </>
    )
}

export default QuesOne
