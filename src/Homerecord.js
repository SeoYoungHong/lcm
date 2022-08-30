import React, { useContext, useEffect, useState } from "react";
import { API } from "aws-amplify";
import {listBloodPS} from './graphql'
import getdate from "./functions/date";
import { DatasFetch } from "./context/Store";

function Homerecord(props){
    if(props.titles!=='record') return(null)
    const {fetchdataall,fetchdataBP, fetchdedataC, fetchdedataBS, fetchdedatafood, fetchdedataBP}=useContext(DatasFetch)
    
    
    useEffect(()=>{
        fetchdata()
    },[])
    function fetchdata(){
        fetchdataall()
    }
    
    return(
        <div class='Fetchdata'>
                {fetchdedataBP &&fetchdedataBP.data.listBloodPS.items.map((arr, idx)=>(
                    <div key={idx}>
                        <p>혈압:{arr.bp1} 심박수:{arr.bp2} 당화혈색소:{arr.bp3} 측정시간:{arr.time.slice(0,2)}시</p>
                    </div>))}
            </div> 
    )

}


export default Homerecord