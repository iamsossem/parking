import { useState } from "react"
import { useParking } from "../../contexts/ParkingContext";

const ExitMode = () => {
  const {fetchExitMode} = useParking();
  const [carNum, setCarNum] = useState('');
  const handleExit = (e)=>{
    e.preventDefault();
    fetchExitMode(carNum);
  }
  return (
    <form className="exit-mode" onSubmit={handleExit}>
      <h3>출차</h3>
      <div>
        <input 
          placeholder="차량번호 (예:12가3456)"
          value={carNum}
          onChange={(e)=>{setCarNum(e.target.value)}}
        />
        <button type="submit">정산</button>
      </div>
    </form>
  )
}

export default ExitMode