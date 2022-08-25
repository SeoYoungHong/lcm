import React, { useEffect, useState } from "react";
import {API} from 'aws-amplify'
import { createChallenge, deleteChallenge, listChallenges} from './graphql'
import ChallengeDetail from "./ChallengeDetail";

function Challenge(){

    const [category, setcategory]= useState('식사')
    const [categorystate, setcategorystate] = useState(true)
    const [search, setsearch]= useState('')
    const [fetcheddata, setfetcheddata]=useState()
    const [detailstate, setdetailstate] = useState('challenge')

    useEffect(()=>{
        fetchdata()
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
        console.log('deldata')
        await API.graphql({query: deleteChallenge, variables: {input: {id:id}}})
        fetchdata()
    }
    async function createdata(){
        console.log('createdata')
        const newTodo = await API.graphql({ 
            query: createChallenge, 
            variables: {input: {title: 'test1', category: '식사', usercount: 0, date:'기간', content: '챌린지 참여이유', reward_info: '리워드정보'}},
        })
        fetchdata()
    }

    function InPut(){
        return(
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
        if(categorystate==false) return null
        return(
            <div>
                {categorys.map((ct, index)=>(
                    <button key={index} onClick={()=>setcategory(ct)}>{ct}</button>
                    
                ))}
            </div>
        )
    }

    function Fetchdata(){
        return(
            <div>
            {fetcheddata &&fetcheddata.data.listChallenges.items.map((arr, idx)=>(
                <div key={idx}>

                    {detailstate===arr.id ?<ChallengeDetail content={arr} setstate={setdetailstate} setcategorystate={setcategorystate}/> : null}
                    {detailstate==='challenge' ? <button onClick={()=>{setdetailstate(arr.id); setcategorystate(false)}}>
                        <p>이미지</p>
                        <p>user count: {arr.usercount}</p>
                        <p>title: {arr.title}</p>
                    </button> :null}
                </div>))}
            </div> 
        )
    }

    

    return(
        <div>
            <header>Challenge</header>
            <button onClick={()=>createdata()}>테스트 생성</button>
            {InPut()}
            {Category()}
            {Fetchdata()}
        </div>
    )
}
export default Challenge