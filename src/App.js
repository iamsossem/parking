import "./App.css"
import ParkingProvider from "./contexts/ParkingContext"
import ParkingDashboard from "./pages/ParkingDashboard"

const App = () => {
  return (
    <ParkingProvider>
      <ParkingDashboard />
    </ParkingProvider>
  )
}

export default App