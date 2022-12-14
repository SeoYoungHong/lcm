import React, {useEffect, useState} from "react";
import {createBloodS, deleteBloodS, listBloodS } from "./graphql";
import {Auth, API} from 'aws-amplify'
import './css/HomeBS.css'
import homeimg from './icons/homeimg.png'
import blankimg from './icons/blankimg.png'
import getdate from "./functions/date";

function HomeBP(props){

    const initialinput = {gc:''}
    const [user, setuser] = useState(null)
    const [input, setinput] = useState(initialinput)
    const [fetcheddata, setfetcheddata] = useState()
    var date = getdate().split('T')[0]
    var time = getdate().split('T')[1]
    useEffect(()=>{
        Auth.currentAuthenticatedUser()
        .then(user=>setuser(user.username))
        .catch((e)=>console.log(e))
        fetchdata()
    },[])


    async function createdata(){
        var filter={date:{eq: date}}
        if(input){ const newTodo = await API.graphql({ 
            query: createBloodS, 
            variables: {input: {...input, name: user, date:date, time:time}, filter:filter},
        })}
        console.log('createdata')
        setinput(null)
        fetchdata()
    }
    async function fetchdata(){
        //혈당에서는 혈당에 대한 정보만 뜨게함
        const data =await API.graphql({query: listBloodS})
            .then(data => setfetcheddata(data))
            .catch(err=>console.log(err))
        console.log("datafetch success")
    }
    async function deldata(id){
        console.log('deldata')
        await API.graphql({query: deleteBloodS, variables: {input: {id:id}}})
        fetchdata()
    }
    async function put(){
        let gc = await document.getElementById('gc').value;
        setinput({gc:gc})
    }



    //component
    function InPut(){
        return(
            <div>
                <input
                    name = 'gc'
                    id = 'gc'
                    placeholder={'혈당'}
                    onChange={()=>put()}
                />
                <button onClick={()=>createdata()}>저장</button>
            </div>
        )
    }
    
    function Fetchdata(){
        return(
            <div>
            {fetcheddata &&fetcheddata.data.listBloodS.items.map((arr, idx)=>(
                <div key={idx}>
                    <p>{arr.gc} {arr.time} {arr.date}<button onClick={()=>deldata(arr.id)}/></p>
                </div>))}
            </div> 
        )
    }
    
    

    return(
        props.titles === 'BS' ?
        <div class='HomeBS'>
            <h1 class='h1'> 매일을 기록하며 하루를 시작하세요.</h1>
            <h2 class='h2'>
                <img class='img1' src={blankimg} width='25' height='30' align='middle'/>
                혈당
                <img class='img' src={homeimg} width='25' height='30' align='middle'/>
            </h2>
            <div>{InPut()}</div>
            <div>{Fetchdata()}</div>
        </div>: null
    )
}
export default HomeBP