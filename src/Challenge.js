import React, { useEffect, useState } from "react";
import {API, Auth} from 'aws-amplify'
import { createChallenge, deleteChallenge, listChallenges} from './graphql'
import ChallengeDetail from "./ChallengeDetail";
import { ComponentPropsToStylePropsMap } from "@aws-amplify/ui-react";
import './css/Challenge.css'
import cutyimg from './icons/cuty.png'

function Challenge(props){

    const [category, setcategory]= useState('식사')
    const [categorystate, setcategorystate] = useState(true)
    const [search, setsearch]= useState('')
    const [fetcheddata, setfetcheddata]=useState()
    const [detailstate, setdetailstate] = useState('challenge')
    const [group, setgroup] = useState()

    useEffect(()=>{
        fetchdata()
        Auth.currentSession()
        .then(user=>setgroup(user))
        .catch((e)=>console.log(e))
    },[])

    useEffect(()=>{
        fetchdata()
    },[category])

    async function fetchdata(){
        const filter={
            category:{
                eq: category
            },  
        }
        const data =await API.graphql({query: listChallenges, variables:{filter:filter}})
            .then(data => setfetcheddata(data))
            .catch(err=>console.log(err))
        console.log("datafetch success")
    }
    async function deldata(id){
        await API.graphql({query: deleteChallenge, variables: {input: {id:id}}})
        fetchdata()
        console.log('deldata')
    }
    async function createdata(input){
        let data ={title: 'test1', category: '식사', usercount: 0, date:'기간', content: '챌린지 참여이유', reward_info: '리워드정보'} 
        if(input){data=input}
        console.log('createdata')
        const newTodo = await API.graphql({ 
            query: createChallenge, 
            variables: {input: data},
        })
        fetchdata()
    }

    function InPut(){
        if(detailstate===false) return(
            <div>
                <input
                    name = 'search'
                    id = 'search'
                    placeholder={'검색어를 입력하세요'}
                    onChange={(e)=>{setsearch(e.target.value)}}
                />
                <button onClick={()=>fetchdata()}>검색</button>
            </div>
        )
    }

    function Category(){
        const categorys=['식사', '운동', '생활', 'my']
        if(categorystate==false) return 
        return(
            <div class='Category'>
                {categorys.map((ct, index)=>(
                    <button class='button' key={index} onClick={()=>setcategory(ct)}>{ct}</button>
                    
                ))}
            </div>
        )
    }

    function Fetchdata(){
        return(
            <div className='Fetchdata'>
            {fetcheddata &&fetcheddata.data.listChallenges.items.map((arr, idx)=>(
                <div key={idx}>

                    {detailstate===arr.id ?
                        <div>
                            <ChallengeDetail content={arr} id={arr.id} createdata={createdata}/> 
                            <button onClick={()=>{setdetailstate('challenge'); setcategorystate(true); props.setusenav(1)}}>뒤로가기</button>
                        </div>
                        : null}
                    {detailstate==='challenge' ? 
                        <div class='parent'>
                            <div class='child'>
                                <button onClick={()=>{setdetailstate(arr.id); setcategorystate(false); props.setusenav(0)}}>
                                    <p>tag</p>
                                    <p>{arr.id}</p>
                                    <p><img src={cutyimg} width='150' height='150'/></p>
                                    <p>user count: {arr.usercount}</p>
                                </button>
                                <h5>title: {arr.title}</h5>
                                <button onClick={()=>deldata(arr.id)}>
                                    삭제
                                </button>
                            </div>
                        </div> : null}
                </div>))}
            </div>)
    }

    function CreateData(){
        if(group) {
            const usergroup = group.idToken.payload['cognito:groups']
            if(usergroup.includes('test')) return(<button onClick={()=>createdata()}>테스트 생성</button>)
        }
        return null
    }

    

    return(
        <div className='Challenge'>
            <header className='header'>질환 극복 챌린지</header>
            {CreateData()}
            {InPut()}
            {Category()}
            {Fetchdata()}
        </div>
    )
}
export default Challenge