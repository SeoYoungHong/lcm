import React, { useEffect, useState } from "react";
import {API, Auth} from 'aws-amplify'
import {withAuthenticator} from "@aws-amplify/ui-react"
import {createTodo, deleteTodo, listTodos} from './graphql';
import food_data from './food_data.json'


function Posting(props){
    const initialbp={bp1:'', bp2:'', bp3:''}
    const name=props.titles
    const [user, setuser]=useState()
    const [value, setvalue] = useState()
    const [fetcheddata, setfetcheddata] = useState()
    const [searchvalue, setsearchvalue]= useState()
    const [searchstate, setsearchstate] = useState(false)
    const [foodrenderdata, setfoodrenderdata] = useState()
    const food_keys = Object.keys(food_data);
    useEffect(()=>{
        foodrender()
        props.setusenav(0)
        fetchdata()
        //유저 name에 대한 정보를 갖고옴
        Auth.currentAuthenticatedUser()
        .then(user=>setuser(user.username))
        .catch((e)=>console.log(e))
        
    },[])
    
    function foodrender(searchtarget){
        const foodrender=[]
        food_keys.map((key, index)=>{   
            if(food_data[key].name.indexOf(searchtarget)!=-1) foodrender.push(food_data[key])
        }) 
        setfoodrenderdata(foodrender)
    }


    function setparam(){
        props.setusenav(1)
        props.settitle('홈')
    }

    async function putbp(){
        let bp1 = await document.getElementById('bp1').value;
        let bp2 = await document.getElementById('bp2').value;
        let bp3 = await document.getElementById('bp3').value;
        setvalue({bp1:bp1, bp2:bp2, bp3:bp3})
    }
    async function putgc(){
        let gc = await document.getElementById('gc').value;
        setvalue({gc:gc})
    }
    async function putfood(){
        let food = await document.getElementById('food').value;
        setsearchvalue(food)
    }
    async function putfoodtovalue(data){
        createdata(data)
    }
    async function putsports(){
        let sports = await document.getElementById('sports').value;
        setsearchvalue(sports)
    }

    async function createdata(data){
        console.log('createdata', value)
        if(value){ const newTodo = await API.graphql({ 
            query: createTodo, 
            variables: {input: {name: name, user: user,description: value}},
        })}
        else if(data){ const newTodo = await API.graphql({ 
            query: createTodo, 
            variables: {input: {name: name, user: user,description: data}},
        })}
     
        setvalue(null)
        fetchdata()
    }
    async function search(){
        setsearchstate(true)
        foodrender(searchvalue)
        console.log('search to true')
        
    }

    async function fetchdata(){
        //혈당에서는 혈당에 대한 정보만 뜨게함
        const filter={
            name:{
                eq: name
            },  
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



    //여기 아래부터는 프론트에 해당하는 함수들임 아래에 스타일을 적용    
    //front component
    function InPutBloodPressure(){
        if(props.titles!=='혈압') return null
        return(
            <div>
                <input
                    name = 'bp1'
                    id = 'bp1'
                    placeholder={'혈압'}
                    onChange={()=>putbp()}
                />
                <input
                    name = 'bp2'
                    id = 'bp2'
                    placeholder={'심박수'}
                    onChange={()=>putbp()}
                />
                <input
                    name = 'bp3'
                    id = 'bp3'
                    placeholder={'당화혈색소'}
                    onChange={()=>putbp()}
                />
                <button onClick={()=>createdata()}>저장</button>
                
            </div>
        )
    }
    function InPutGlucose(){
        if(props.titles!=='혈당') return null
        return(
            <div>
                <input
                    name = 'gc'
                    id = 'gc'
                    placeholder={'혈당'}
                    onChange={()=>putgc()}
                />
                <button onClick={()=>createdata()}>저장</button>
            </div>
        )
    }
    function InPutfood(){
        if(props.titles==='식이') return(
            <div>
                <input
                    name = 'food'
                    id = 'food'
                    placeholder={'음식을 검색하세요'}
                    onChange={()=>putfood()}
                />
                <button onClick={()=>{search(); document.getElementById("food").value=''}}>검색</button>
                <div>{Searchcomponet()}</div>
            </div>
        )
    }
    function InPutsports(){ 
        if(props.titles==='운동') return(
            <div className="운동">
                <input
                    name = 'sports'
                    id = 'sports'
                    placeholder={'운동을 검색하세요'}
                    onChange={()=>putsports()}
                />
                <button onClick={()=>search()}>검색</button>
                <div>{Searchcomponet()}</div>
                
            </div>
        )
    }
    function Searchcomponet(){
        if(name=='운동'&&searchstate===true){
            return(
                
                <div>
                    <p>{props.titles}검색결과</p>
                </div>

            )}
        else if(name=='식이'&&searchstate===true){
            return(
                <div>
                    <p>{props.titles}검색결과</p>
                    <div>{foodrenderdata.map((data, index)=>(
                        <div key={index}>   
                            <button onClick={()=>putfoodtovalue(data)}>{data.name}</button>
                        </div>
                    )
                    )}</div>
                </div>
            )
        }
    }
    function Fetcheddatacomponent(){
        return(
            <div>
            {fetcheddata &&fetcheddata.data.listTodos.items.map((arr, idx)=>(
            <div key={idx}>
                <p>{arr.user} {arr.description} <button onClick={()=>deldata(arr.id)}/></p>
            </div>
        ))}
        </div> 
        )
    }


    return(
        <div>
            <header>posting: {props.titles}</header>
            <button onClick={()=>setparam()}>뒤로가기</button>
            <div className="posting main">
                <h5>{props.titles} 입력란</h5>
                {InPutBloodPressure()}
                {InPutGlucose()}
                {Fetcheddatacomponent()}
                {InPutfood()}
                {InPutsports()}
                
                
            </div>
            
        </div>
    )
}

export default withAuthenticator(Posting)