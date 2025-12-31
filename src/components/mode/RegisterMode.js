import { useState } from "react"
import { useParking } from "../../contexts/ParkingContext";

const RegisterMode = () => {
  // const [carNum, setCarNum] = useState('');
  // const [ownerName, setOwnerName] = useState('');
  // const [phone, setPhone] = useState('');
  // const [type, setType] = useState('VISITOR');
  const {fetchRegisger} = useParking();
  const [form, setForm] = useState({
    carNum:'',
    ownerName:'',
    phone: '',
    type: "VISITOR"
  });
  const handleChange = (e)=>{
    const item = {...form, [e.target.name]:e.target.value};
    setForm(item);
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    fetchRegisger(form);
  }
  return (
    <form className="register-mode"  onSubmit={handleSubmit}>
      <h3>차량등록</h3>
      <div>
        <input 
          name="carNum"
          placeholder="차량번호"
          value={form.carNum}
          onChange={handleChange}
        />
        <input
          name="ownerName"
          placeholder="이름"
          value={form.ownerName}
          onChange={handleChange}
        />
        <input 
          name="phone"
          placeholder="연락처"
          value={form.phone}
          onChange={handleChange}
        />
        <select value={form.type} onChange={handleChange} name="type">
          <option value="VISITOR">1일방문</option>
          <option value="SEASON">1개월정기</option>
        </select>
      </div>
      <button type="submit">등록</button>
    </form>
  )
}

export default RegisterMode