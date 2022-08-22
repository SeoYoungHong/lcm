import React, { useEffect, useState } from "react";
import {API, Auth} from 'aws-amplify'
import {withAuthenticator} from "@aws-amplify/ui-react"
import {createTodo, deleteTodo, listTodos} from './graphql';



function Posting(props){
    const name='홍서용'
    const [value, setvalue] = useState({title: props.titles, description: ''})
    const [fetcheddata, setfetcheddata] = useState()
    useEffect(()=>{
        props.setusenav(0)
        fetchdata()
    },[])

    function setparam(){
        props.setusenav(1)
        props.settitle('홈')
    }

    async function putdata(){
        let inputValue = await document.getElementById('input').value;
        setvalue({title: props.titles, description: inputValue})
    }

    async function createdata(){
        putdata()
        if(value.title && value.description){ const newTodo = await API.graphql({ 
            query: createTodo, 
            variables: {input: {name: name, description: value}},
        }
            )} 
        setvalue({name: name, description: value})
        fetchdata()
    }

    async function fetchdata(){
        //혈당에서는 혈당에 대한 정보만 뜨게함
        const filter={
            name:{
                eq: name
            },
            //description:{title:{eq:props.titles}}
            
        }
        const data =await API.graphql({query: listTodos, variables:{filter:filter}})
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
                    onChange={()=>putdata()}
                />
                <button onClick={()=>createdata()}>저장</button>
                <div>
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