const SpotCard = ({data}) => {
  const isCarnum = data.car_num ? true : false;
  const isResident = data.spot_type === 'RESIDENT';
  return (
    <div 
      className={`spot-card ${isResident?'resident':'public'} ${isCarnum ? 'carnum' : ''}`}
    >
      <p>{data.spot_id}</p>
      <p>{isResident ? "입주민" : "공영"}</p>
      <p>{data.car_num}</p>
    </div>
  )
}

export default SpotCard