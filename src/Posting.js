import React, { useEffect, useState } from "react";
import {API} from 'aws-amplify'
import {withAuthenticator} from "@aws-amplify/ui-react"
import {createTodo, deleteTodo, listTodos} from './graphql';



function Posting(props){

    const [value, setvalue] = useState({name: '', description: ''})
    const [fetcheddata, setfetcheddata] = useState()
    useEffect(()=>{
        props.setusenav(0)
        fetchdata()
    },[])

    function setparam(){
        props.setusenav(1)
        props.settitle('홈')
    }

    async function putdata(event){
        let inputValue = await document.getElementById('input').value;
        if(inputValue){
            setvalue({name: props.titles, description: inputValue})
        }
        else putdata()
        createdata()
        setvalue({name: '', description: ''})
        fetchdata()
        console.log(value)
    }

    async function createdata(){
        if(value.name && value.description){ const newTodo = await API.graphql({ query: createTodo, variables: {input: value}})} 
    }

    async function fetchdata(){
        const data =await API.graphql({query: listTodos})
            .then(data => setfetcheddata(data))
            .catch(err=>console.log(err))
        console.log("datafetch success")
    }

    async function deldata(id){
        console.log('deldata')
        await API.graphql({query: deleteTodo, variables: {input: {id:id}}})
        fetchdata()
    }


    return(
        <div>
            <header>posting: {props.titles}</header>
            <button onClick={()=>setparam()}>뒤로가기</button>
            <div>
                <h5>{props.titles} 입력란</h5>
                <input
                    name = 'input'
                    id = 'input'
                    placeholder={0}
                />
                <button onClick={putdata}>저장</button>
                <div>
                    {console.log(fetcheddata)}
                    {fetcheddata &&fetcheddata.data.listTodos.items.map((arr, idx)=>(
                    <div key={idx}>
                        <p>{arr.name} {arr.description} <button onClick={()=>deldata(arr.id)}/></p>
                    </div>
                ))}
                </div>
            </div>
            
        </div>
    )
}

export default withAuthenticator(Posting)