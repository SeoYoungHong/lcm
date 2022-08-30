import React, {useEffect, useState} from "react";
import {createBloodS, deleteBloodS, listBloodS } from "./graphql";
import {Auth, API} from 'aws-amplify'

function HomeBP(props){

    const initialinput = {gc:''}
    const [user, setuser] = useState(null)
    const [input, setinput] = useState(initialinput)
    const [fetcheddata, setfetcheddata] = useState()
    useEffect(()=>{
        Auth.currentAuthenticatedUser()
        .then(user=>setuser(user.username))
        .catch((e)=>console.log(e))
        fetchdata()
    },[])


    async function createdata(){
        if(input){ const newTodo = await API.graphql({ 
            query: createBloodS, 
            variables: {input: {...input, name: user}},
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
                    <p>{arr.gc} <button onClick={()=>deldata(arr.id)}/></p>
                </div>))}
            </div> 
        )
    }
    
    

    return(
        props.titles === 'BS' ?<div>
            <div>{InPut()}</div>
            <div>{Fetchdata()}</div>
        </div>: null
    )
}
export default HomeBP