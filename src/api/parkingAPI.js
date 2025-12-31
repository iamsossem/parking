import supabase from './supabaseClient';

/**
 * 총 주차면수,현재주차수,잔여석
 */
export const getParkingInfo = async ()=>{
  //테이블의 모든 정보를 가져옴.
  const {data,error} = await supabase
    .from('parking_spots')
    .select('*')
    .order('spot_id',{ascending:true})
  if(error){
    throw new Error('테이블 정보 가져오기 에러 :', error);
  }
  return data;
}

//입차 정보를 눌렀을 때 update
export const enterParking = async (carNum,type)=>{
  //1. 빈자리를 찾기 : 주차 공간 확보
  //car_num = null 그리고 type이 일치
  const {data:spots,error:spot_error} = await supabase
    .from('parking_spots')
    .select('spot_id')
    .eq('spot_type',type)
    .is('car_num',null)
    .order('spot_id',{ascending:true})
    .limit(1);
  if( !spots || spots.length<=0 || spot_error ){
    throw new Error('주차 공간이 없습니다') ;
  }
  //2. 공간이 있으면 update 가 발생
  const targetID = spots[0].spot_id;   //배정된 자리ID
  const entryTime = new Date().toISOString();
  const {error} = await supabase
    .from('parking_spots')
    .update({car_num:carNum, entry_time:entryTime})
    .eq('spot_id',targetID);
  if( error ) throw new Error(error);
  return targetID;
}
//출차 처리
export const exitParking = async (carNum) => {
  //1. 차량찾기
  const {data:spot} = await supabase
    .from('parking_spots')
    .select('*')
    .eq('car_num',carNum)
    .single();  //한개만 가져와라
  if( !spot ) throw new Error('주차장에 차가 없습니다');
  //2. 주차한 차를 찾으면, 주차 시간을 계산하기
  const nowTime = new Date();
  const entryTime = new Date(spot.entry_time);  //DB String --> Object
  // 현재시간 - 입차시간
  const diff = nowTime.getTime() - entryTime.getTime();
  console.log( diff );
  //시간주차를 했는지. 1초 이상 1시간
  const registerTime = Math.round(diff/(1000*60*60*9));
  return {registerTime:registerTime, spot_id:spot.spot_id};
}
//출차 확정
export const confirmExit = async (spotId) =>{
  const {error} = await supabase
    .from('parking_spots')
    .update({car_num:null, entry_time:null, is_paid:false})
    .eq('spot_id',spotId);
  if( error ) throw new Error('출차하지 못했습니다');
}
//차량등록
export const registerCar = async (item) => {
  //1. 차량등록된게 있는지 없는 체크
  const {data:existing} = await supabase
    .from('registered')
    .select('*')
    .eq('car_num',item.carNum)
    .maybeSingle();
  if( existing ) throw new Error('이미 등록된 차량입니다');
  //2. 1일권, 1달권 endData 처리
  const stateDate = new Date();
  const endDate = new Date();
  if( item.type === 'VISITOR') {
    //1일권 등록
    endDate.setDate(endDate.getDate()+1);
  } else {
    //1달권 등록
    endDate.setMonth(endDate.getMonth()+1);
  }
  //3. supabase에 insert로 추가
  const {error} = await supabase
    .from('registered')
    .insert({
      car_num : item.carNum,
      owner_name : item.ownerName,
      phone: item.phone,
      type : item.type,
      start_date: stateDate.toISOString(),
      end_date: endDate.toISOString()
    });
  if(error) throw new Error(error);
}
//등록 현황 조회
export const getRegisterList = async ()=>{
  const {data,error} = await supabase
    .from('registered')
    .select('*')
    .order('created_at', {ascending:false});  //최신 등록된 목록
  if( error ) {
    throw new Error('등록 차량 조회 실패');
  }
  return data;
}