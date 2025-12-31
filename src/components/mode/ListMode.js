import { useEffect } from "react"
import { useParking } from "../../contexts/ParkingContext";

const ListMode = () => {
  const {registerData,fetchRegisterData} = useParking();
  //컴포넌트가 화면에 보여지는 때 실행
  useEffect(()=>{
    fetchRegisterData();
  },[]);
  return (
    <div className="list-mode">
      {
        registerData.map((item)=>{
          return (
            <div key={item.id}>
              <span>{item.car_num}</span>
              <span>{item.owner_name}</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default ListMode