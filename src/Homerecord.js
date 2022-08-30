import React, { useState } from "react";
import { API } from "aws-amplify";
import {listBloodPS} from './graphql'
import getdate from "./functions/date";

function Homerecord(props){

    const [fetcheddata, setfetcheddata]=useState()


    if(props.titles!=='record') return(null)
    const today = getdate().split('T')[0]

    async function fetchdata(){
        //혈당에서는 혈당에 대한 정보만 뜨게함
        const filter={
            date:{
                limit:1,
                eq: today
            },  
        }
        const data =await API.graphql({query: listBloodPS, variables:{filter:filter}})
            .then(data => setfetcheddata(data))
            .catch(err=>console.log(err))
        console.log("datafetch success")
    }
    
    return(
        <div>기록확인</div>
    )

}


export default Homerecord