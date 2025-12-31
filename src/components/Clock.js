import { useEffect, useState } from "react"

const Clock = () => {
  // 현재 시간을 관리할 state
  const [time,setTime] = useState(new Date());
  useEffect(()=>{
    const timeID = setInterval(()=>{
      setTime(new Date());  //1초마다 시간 갱신
    },1000);
    // 컴포넌트가 화면에서 사라질 때 타이머 중지
    return ()=>{ clearInterval(timeID) };
  },[]);
  return (
    <div className="clock">
      <p>현재시간 : {time.toLocaleTimeString()}</p>
    </div>
  )
}

export default Clock