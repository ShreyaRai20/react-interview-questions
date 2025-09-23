import CinemaSeatBooking from "./components/CinemaSeatBooking"


function App() {


  return (
    <div>
      <CinemaSeatBooking bookedSeats={['C2', 'C3', 'C6']} onBookingComplete={(booking) => {
        console.log(booking)
      }} />
    </div>
  )
}

export default App
