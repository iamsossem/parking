const ParkingInfo = ({data}) => {
  //총 주차대수
  const total = data.length;
  const spots = data.filter(item=>item.car_num).length;
  const empty = total - spots;
  return (
    <div>
      <p>총 주차면수 : {total}</p>
      <p>현재 주차 : {spots}</p>
      <p>잔여석 : {empty}</p>
    </div>
  )
}

export default ParkingInfo