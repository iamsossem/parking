import { useState } from "react"
import { useParking } from "../../contexts/ParkingContext";

const EnterMode = () => {
  const {fetchEnterMode} = useParking();
  const [carnum,setCarnum] = useState('');
  const [type,setType] = useState('PUBLIC');
  const handleSubmit = (e)=>{
    e.preventDefault();
    fetchEnterMode(carnum,type);
  }
  return (
    <form className="enter-mode" onSubmit={handleSubmit}>
      <h3>차량입차</h3>
      <div>
        <input 
          placeholder="차량번호 (예:12가3456)"
          value={carnum}
          onChange={(e)=>{setCarnum(e.target.value)}}
        />
        <select
          value={type}
          onChange={(e)=>{setType(e.target.value)}}
        >
          <option value="RESIDENT">입주민 전용</option>
          <option value="PUBLIC">공영 주차</option>
        </select>
        <button type="submit">입차</button>
      </div>
    </form>
  )
}

export default EnterMode