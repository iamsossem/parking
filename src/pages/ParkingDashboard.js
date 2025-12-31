import Clock from "../components/Clock"
import ParkingGrid from "../components/ParkingGrid";
import ParkingInfo from "../components/ParkingInfo";
import SystemController from "../components/SystemController";
import { useParking } from "../contexts/ParkingContext"
const ParkingDashboard = () => {
  const {parkingData} = useParking();
  return (
    <div className="dashboard">
      <h1>통합 주차장</h1>
      <Clock />
      <SystemController />
      <ParkingInfo data={parkingData} />
      <ParkingGrid data={parkingData} />
    </div>
  )
}

export default ParkingDashboard