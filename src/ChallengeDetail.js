import React, {useEffect, useState}from "react";
import { API } from "aws-amplify";
import { listChallenges } from "./graphql";

function ChallengeDetail(props){
    const [fetcheddata, setfetcheddata]=useState()
    useEffect(()=>{
        fetchdata()
    },[])
    async function fetchdata(){
        const filter={
            category:{
                eq: 'my'
            },  
        }
        const data =await API.graphql({query: listChallenges, variables:{filter:filter}})
            .then(data => setfetcheddata(data))
            .catch(err=>console.log(err))
        console.log("datafetch success")
    }

    function start(){
        if(fetcheddata.data.listChallenges.items.length!==0) {
            fetcheddata.data.listChallenges.items.map((data)=>{
                if(data.title==props.content.title){console.log('이미 신청한 challenge입니다.')}
                else{props.createdata({title: 'test1', category: 'my', usercount: 0, date:'기간', content: '챌린지 참여이유', reward_info: '리워드정보'})}
            })}
        else{props.createdata({title: 'test1', category: 'my', usercount: 0, date:'기간', content: '챌린지 참여이유', reward_info: '리워드정보'})}
    }
    
    return (
        <div>
            
            <p>{props.content.title}</p>
            <p>{props.content.date}</p>
            <p>{props.content.content}</p>
            <p>{props.content.reward_info}</p>
            <p>{props.content.id}</p>
            {props.content.category!=='my' ? <button onClick={()=>start()}>첼린지 도전</button>:null}
        </div>
    )
}

export default ChallengeDetail