import React, { useEffect, useState } from "react";
import {API} from 'aws-amplify'
import {withAuthenticator} from "@aws-amplify/ui-react"



function Posting(props){
    const [value, setvalue] = useState(0)
    useEffect(()=>{
        props.setusenav(0)
        fetchdata()
    },[])
    function setparam(){
        props.setusenav(1)
        props.settitle('홈')
    }
    function putdata(event){
        let inputValue = document.getElementById(props.titles).value;
        setvalue(inputValue)
        console.log(value)
    }
    async function fetchdata(){
        const data =await API.get('manjilapi', '/data')
            .then(data => console.log(data))
            .catch(err=>console.log(err))
    }

    return(
        <div>
            <header>posting: {props.titles}</header>
            <button onClick={()=>setparam()}>뒤로가기</button>
            <div>
                <h5>{props.titles} 입력란</h5>
                <input
                    name = {props.titles}
                    id = {props.titles}
                    placeholder={0}
                />
                <button onClick={putdata}>저장</button>
            </div>
            
        </div>
    )
}

export default withAuthenticator(Posting)