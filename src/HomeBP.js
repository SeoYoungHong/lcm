import React, {useEffect, useState} from "react";
import { createBloodP, deleteBloodP, listBloodPS } from "./graphql";
import {Auth, API} from 'aws-amplify'

function HomeBP(props){

    const initialinput = {bp1:'', bp2:'', bp3:''}
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
        console.log('createdata')
        if(input){ const newTodo = await API.graphql({ 
            query: createBloodP, 
            variables: {input: {...input, name: user}},
        })}
        setinput(null)
        fetchdata()
    }
    async function fetchdata(){
        //혈당에서는 혈당에 대한 정보만 뜨게함
        const data =await API.graphql({query: listBloodPS})
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
            <div>
                <input
                    name = 'bp1'
                    id = 'bp1'
                    placeholder={'혈압'}
                    onChange={(e)=>put()}
                />
                <input
                    name = 'bp2'
                    id = 'bp2'
                    placeholder={'심박수'}
                    onChange={()=>put()}
                />
                <input
                    name = 'bp3'
                    id = 'bp3'
                    placeholder={'당화혈색소'}
                    onChange={()=>put()}
                />
                <button onClick={()=>createdata()}>저장</button>
                
            </div>
        )
    }
    
    function Fetchdata(){
        return(
            <div>
            {fetcheddata &&fetcheddata.data.listBloodPS.items.map((arr, idx)=>(
                <div key={idx}>
                    <p>{arr.name} {arr.bp1} {arr.bp2} {arr.bp3} <button onClick={()=>deldata(arr.id)}/></p>
                </div>))}
            </div> 
        )
    }
    
    

    return(
        props.titles === 'BP' ?<div>
            <div>{InPut()}</div>
            <div>{Fetchdata()}</div>
        </div>: null
    )
}
export default HomeBP