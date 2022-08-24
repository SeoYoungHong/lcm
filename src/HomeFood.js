import React, {useEffect, useState} from "react";
import {createFood, deleteFood, listFoods } from "./graphql";
import {Auth, API} from 'aws-amplify'
import food_data from './food_data.json'

function HomeFood(props){

    const initialinput = {gc:''}
    const [user, setuser] = useState(null)
    const [input, setinput] = useState(initialinput)
    const [fetcheddata, setfetcheddata] = useState()
    const [fetchedfood, setfetchedfood] = useState([])
    const food_keys = Object.keys(food_data);


    useEffect(()=>{
        Auth.currentAuthenticatedUser()
        .then(user=>setuser(user.username))
        .catch((e)=>console.log(e))
        fetchdata()
        fetchfood()
    },[])

    //음식데이터 베이스를 다루는 코드
    function fetchfood(searchtarget){
        const foodrender=[]
        food_keys.map((key, index)=>{   
            if(food_data[key].name.indexOf(searchtarget)!=-1) foodrender.push(food_data[key])
        }) 
        setfetchedfood(foodrender)
    }
    async function search(){
        fetchfood(input)
        console.log('search to true')
    }
    async function put(){
        let food = await document.getElementById('food').value;
        setinput(food)
    }

    //grapql데이터를 다루는 코드
    async function createdata(data){
        if(data){const newTodo = await API.graphql({ 
            query: createFood, 
            variables: {input:{name: user, food:{...data}}}
        })}
        fetchdata()
    }
    async function fetchdata(){
        const data =await API.graphql({query: listFoods})
            .then(data => setfetcheddata(data))
            .catch(err=>console.log(err))
        console.log("datafetch success")
    }
    async function deldata(id){
        console.log('deldata')
        await API.graphql({query: deleteFood, variables: {input: {id:id}}})
        fetchdata()
    }
    
   



    //component
    function InPut(){
        return(
            <div>
                <input
                    name = 'food'
                    id = 'food'
                    placeholder={'음식을 검색하세요'}
                    onChange={()=>put()}
                />
                <button onClick={()=>{search(); document.getElementById("food").value=''}}>검색</button>
            </div>
        )
    }
    //graphql데이터를 fetch해옴
    function Fetchdata(){
        return(
            <div>
            {fetcheddata &&fetcheddata.data.listFoods.items.map((arr, idx)=>(
                <div key={idx}>
                    <p>{arr.name}{arr.food} <button onClick={()=>deldata(arr.id)}/></p>
                </div>))}
            </div> 
        )
    }
    //db에서 검색결과를 가져옴, 이름에 버튼을 이름을 누르면 먹은 것으로 되게함.
    function Search(){
        return(
            <div>
                <p>{props.titles}검색결과</p>
                <div>{fetchedfood.map((data, index)=>(
                    <div key={index}>   
                        <button onClick={()=>createdata(data)}>{data.name}</button>
                    </div>
                )
                )}</div>
            </div>
        )
    }
    
    

    return(
        props.titles === 'Food' ?<div>
            <div>{InPut()}</div>
            <div>{Fetchdata()}</div>
            <div>{Search()}</div>
        </div>: null
    )
}
export default HomeFood