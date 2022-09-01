import React, {useEffect, useState} from "react";
import {createFood, createSports, deleteFood, deleteSports, listFoods, listSports } from "./graphql";
import {Auth, API} from 'aws-amplify'
import sports_data from './sports_data.json'
import { Link } from "react-router-dom";
import './css/HomeFood.css'
import homeimg from './icons/homeimg.png'
import blankimg from './icons/blankimg.png'
import getdate from "./functions/date";


function HomeSports(props){

    const initialinput = {gc:''}
    const [user, setuser] = useState(null)
    const [input, setinput] = useState(initialinput)
    const [fetcheddata, setfetcheddata] = useState()
    const [fetchedfood, setfetchedfood] = useState([])
    const [totalcal, settotalcal] = useState(0)
    const food_keys = Object.keys(sports_data);
    const [min, setmin] =useState()
    let date=getdate().split('T')[0]
    let time=getdate().split('T')[1]


    useEffect(()=>{
        Auth.currentAuthenticatedUser()
        .then(user=>setuser(user.username))
        .catch((e)=>console.log(e))
        fetchdata()
        fetchfood()
    },[])

    //운동데이터 베이스를 다루는 코드
    function fetchfood(searchtarget){
        const sportsrender=[]
        food_keys.map((key, index)=>{   
            if(sports_data[key].name.indexOf(searchtarget)!=-1) {
                const data=sports_data[key]
                data['id']=key
                sportsrender.push(data)
            }
        }) 
        setfetchedfood(sportsrender)
    }
    async function search(){
        fetchfood(input)
        console.log('search to true')
    }
    async function put(){
        let food = await document.getElementById('sports').value;
        setinput(food)
    }
    async function putmin(){
        let mins = await document.getElementById('sports').value;
        setmin(mins)
    }

    //grapql데이터를 다루는 코드
    async function createdata(data){
        var filter={date:{eq: date},}
        if(data){const newTodo = await API.graphql({ 
            query: createSports, 
            variables: {input:{...data, date:date, time: time}, filter:filter}
        })}
        fetchdata()
    }
    async function fetchdata(){
        const data =await API.graphql({query: listSports})
            .then(data => setfetcheddata(data))
            .catch(err=>console.log(err))
        console.log("datafetch success")
    }
    async function deldata(id){
        console.log('deldata')
        await API.graphql({query: deleteSports, variables: {input: {id:id}}})
        fetchdata()
    }

   



    //component
    function InPut(){
        return(
            <div>
                <input
                    name = 'sports'
                    id = 'sports'
                    placeholder={'운동을 검색하세요'}
                    onChange={()=>put()}
                />
                <button onClick={()=>{search(); document.getElementById("sports").value=''}}>검색</button>
            </div>
        )
    }

    
    //graphql데이터를 fetch해옴
    function Fetchdata(){
        
        return(
            <div>
                {fetcheddata &&fetcheddata.data.listSports.items.map((arr, idx)=>(
                <div key={idx}>
                    <p>{arr.name}:  {arr.cal} kcal {arr.date}<button onClick={()=>deldata(arr.id)}>삭제</button></p>
                </div>))}
            </div>
        )
    }
    //route를 활용하여 post detail페이지로 이동
    function Search(){
        
        if(fetchedfood)return(
            <div>
                <p>{props.titles}검색결과</p>
                <div>{fetchedfood.map((data, index)=>(
                    <div key={index}>   
                        {/*<button onClick={()=>createdata(data)}>{data.name}</button>*/}
                        <button onClick={()=>createdata({name:data.name, cal:300})}>
                            {data.name}
                            <input
                                name = 'min'
                                id = 'min'
                                placeholder={'운동시간입력'}
                                onChange={()=>putmin()}
                            />
                            </button>
                    </div>
                )
                )}</div>
            </div>
        )
        else return(
            <div>
                <p>{props.titles}검색결과</p>
                <div>{food_keys.map((data, index)=>(
                    <div key={index}>   
                        {/*<button onClick={()=>createdata(data)}>{data.name}</button>*/}
                        <button onClick={()=>createdata({name:data.name, cal:300})}>{sports_data[data]}</button>
                    </div>
                )
                )}</div>
            </div>
        )
    }
    
    

    return(
        props.titles === 'sports' ?
        <div class='HomeFood'>
            <h1 class='h1'> 매일을 기록하며 하루를 시작하세요.</h1>
            <h2 class='h2'>
                <img class='img1' src={blankimg} width='25' height='30' align='middle'/>
                운동
                <img class='img' src={homeimg} width='25' height='30' align='middle'/>
            </h2>
            <div>{InPut()}</div>
            <div>{Fetchdata()}</div>
            <div>{Search()}</div>
        </div>: null
    )
}
export default HomeSports