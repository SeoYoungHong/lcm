import React, {useEffect, useState} from "react";
import { createBloodP, deleteBloodP, listBloodPS } from "./graphql";
import {Auth, API} from 'aws-amplify'
import datetime from './functions/date.js'
import { ComponentPropsToStylePropsMapKeys } from "@aws-amplify/ui-react";

function HomeBP(props){

    const initialinput = {bp1:'', bp2:'', bp3:''}
    const [user, setuser] = useState(null)
    const [input, setinput] = useState(initialinput)
    const [fetcheddata, setfetcheddata] = useState()
    let today = new Date()
    const todaydate = datetime().split('T')[0]
    const createdAt=datetime().split('T')[1]
    useEffect(()=>{
        Auth.currentAuthenticatedUser()
        .then(user=>setuser(user.username))
        .catch((e)=>console.log(e))
        fetchdata()
    },[])


    async function createdata(){
        console.log('createdata')
        
        if(input){ const newTodo = await API.graphql({ 
            query: createBloodP, 
            variables: {input: {...input, name: user, date:todaydate ,time:createdAt}},
        })}
        setinput(null)
        fetchdata()
    }
    async function fetchdata(){
        //혈당에서는 혈당에 대한 정보만 뜨게함
        const filter={
            date:{
                eq: todaydate
            },  
        }
        const data =await API.graphql({query: listBloodPS, variables:{filter:filter}})
            .then(data => setfetcheddata(data))
            .catch(err=>console.log(err))
        console.log("datafetch success")
    }
    async function deldata(id){
        console.log('deldata')
        await API.graphql({query: deleteBloodP, variables: {input: {id:id}}})
        fetchdata()
    }
    function put(){
        let bp1 = document.getElementById('bp1').value;
        let bp2 = document.getElementById('bp2').value;
        let bp3 = document.getElementById('bp3').value;
        setinput({bp1:bp1, bp2:bp2, bp3:bp3})
    }



    //component
    function InPut(){
        return(
            <div class='InPut'>
                <p><input
                    name = 'bp1'
                    id = 'bp1'
                    placeholder={'혈압'}
                    onChange={(e)=>put()}
                /></p>
                <p><input
                    name = 'bp2'
                    id = 'bp2'
                    placeholder={'심박수'}
                    onChange={()=>put()}
                /></p>
                <p><input
                    name = 'bp3'
                    id = 'bp3'
                    placeholder={'당화혈색소'}
                    onChange={()=>put()}
                /></p>
                <button onClick={()=>createdata()}>저장</button>
                
            </div>
        )
    }
    
    function Fetchdata(){
        return(
            <div class='Fetchdata'>
                <div>
                    <p>{today.getMonth()+1}월 {today.getDate()}일 측정내역</p>
                </div>
                {fetcheddata &&fetcheddata.data.listBloodPS.items.map((arr, idx)=>(
                    <div key={idx}>
                        <p>혈압:{arr.bp1} 심박수:{arr.bp2} 당화혈색소:{arr.bp3} 측정시간:{arr.createdAt} <button onClick={()=>deldata(arr.id)}/></p>
                    </div>))}
            </div> 
        )
    }
    
    

    return(
        props.titles === 'BP' ?
        <div class='HomeBP'>
            {InPut()}
            {Fetchdata()}
        </div>: null
    )
}
export default HomeBP