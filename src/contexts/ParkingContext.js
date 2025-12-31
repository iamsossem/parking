import { createContext, useContext, useEffect, useState } from "react";
import { enterParking, getParkingInfo,exitParking, confirmExit , registerCar, getRegisterList} from "../api/parkingAPI";

//1.context 채널이 만들기
const ParkingContext = createContext(null);
//2. context를 이용할 범위 설정
const ParkingProvider = ({children})=>{
  //주차장지도 정보에 대한 상태관리
  const [parkingData,setParkingData] = useState([]);
  //등록 차량 리스트 관리
  const [registerData, setRegisterData] = useState([]);
  //주차장 지도 데이터를 get
  const fetchParkingData = async ()=>{
    try{
      const data = await getParkingInfo();
      setParkingData(data);
    } catch(e){ console.error(e);}
  }
  const fetchRegisterData = async ()=>{
    try{
      const data = await getRegisterList();
      setRegisterData(data);
    } catch(e){ console.error(e); }
  }
  const fetchEnterMode = async (carNum,type)=>{
    try{
      //api 에 있는  update  처리
      const targetID = await enterParking(carNum,type);
      const typeName = (type === 'PUBLIC' ? "공영" : "입주민");
      alert(`[${typeName}입차성공] ${targetID}에 주차되었습니다`);
      await fetchParkingData();   //주차지도가 업데이트가 됨.
    } catch(e){ console.error(e); }
  }
  //출차 확인
  const fetchExitMode = async (carNum)=>{
    try{
      //출차처리
      const {registerTime,spot_id} = await exitParking(carNum);
      const result = window.confirm(`주차시간 : ${registerTime}`);
      if(result) {
        //확인버튼 : 출차를 하겠음
        await confirmExit(spot_id);
        alert("안녕히 가세요!");
        await fetchParkingData();   //주차지도가 업데이트가 됨.
      }
    } catch(e){ console.log(e); }
  }
  //차량등록
  const fetchRegisger = async (item)=>{
    try{
      //api값을 가지고 와서 처리
      await registerCar(item);
    }catch(e){ console.log(e)}
  }
  //컴포넌트가 화면에 보여지는 시점
  useEffect(()=>{
    fetchParkingData();
  },[]);
  //value를 객체로 만듦
  const value={
    parkingData,
    registerData,
    fetchEnterMode,  //입차시스템
    fetchExitMode,  //출차시간 확인
    fetchRegisger,
    fetchRegisterData
  }
  return (
    <ParkingContext.Provider value={value}>
      {children}
    </ParkingContext.Provider>
  )
}
export default ParkingProvider;

export const useParking = ()=>{
  return useContext(ParkingContext);
}