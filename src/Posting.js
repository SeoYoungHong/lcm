import React, { useEffect } from "react";

function Posting(props){
    useEffect(()=>{
        props.setusenav(0)
    },[])
    function setparam(){
        props.setusenav(1)
        props.settitle('홈')
    }
    return(
        <div>
            <header>posting: {props.titles}</header>
            
            <button onClick={()=>setparam()}>뒤로가기</button>
        </div>
    )
}

export default Posting