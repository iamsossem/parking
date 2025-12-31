import SpotCard from "./SpotCard"

const ParkingGrid = ({data}) => {
  return (
    <div className="parking-grid">
      {
        data.map((item)=>{
          return <SpotCard key={item.spot_id} data={item}/>
        })
      }
    </div>
  )
}

export default ParkingGrid