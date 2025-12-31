import { useState } from "react"
import EnterMode from "./mode/EnterMode";
import ExitMode from "./mode/ExitMode";
import RegisterMode from "./mode/RegisterMode";
import ListMode from "./mode/ListMode";

const SystemController = () => {
  const [mode,setMode] = useState('ENTER');
  return (
    <div className="controller">
      <div className="btn-wrap">
        <button onClick={()=>{setMode('ENTER')}}>입차</button>
        <button onClick={()=>{setMode('EXIT')}}>출차</button>
        <button onClick={()=>{setMode('REGISTER')}}>등록</button>
        <button onClick={()=>{setMode('LIST')}}>현황</button>
      </div>
      <div className="mode-content">
        { mode === 'ENTER' && <EnterMode />}
        { mode === 'EXIT' && <ExitMode />}
        { mode === 'REGISTER' && <RegisterMode />}
        { mode === 'LIST' && <ListMode />}
      </div>
    </div>
  )
}

export default SystemController