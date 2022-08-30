import React, { useContext, useEffect, useState } from "react";
import { API } from "aws-amplify";
import {listBloodPS} from './graphql'
import getdate from "./functions/date";
import { DatasFetch } from "./context/Store";

function Homerecord(props){
    if(props.titles!=='record') return(null)


    const today = getdate().split('T')[0]
    const {fetchdataall}=useContext(DatasFetch)
    
    
    useEffect(()=>{
        fetchdata()
    },[])
    async function fetchdata(){
        fetchdataall()
    }
    
    return(
        <div>기록확인</div>
    )

}


export default Homerecord