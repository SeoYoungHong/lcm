import React, { useContext, useEffect, useState } from "react";
import { API } from "aws-amplify";
import {listBloodPS} from './graphql'
import getdate from "./functions/date";
import { DatasFetch } from "./context/Store";
import { maxtime } from "./functions/sorting";

function Homerecord(props){
    if(props.titles!=='record') return(null)
    const {fetchdataall,fetchdataBP, fetchdedataC, fetchdedataBS, fetchdedatafood, fetchdedataBP}=useContext(DatasFetch)
    
    
    useEffect(()=>{
        fetchdata()
    },[])
    function fetchdata(){
        fetchdataall()
    }
    function LastBP(){
        if(fetchdedataBP){
            const BP=fetchdedataBP.data.listBloodPS.items
            const arr={}
            for (var key in BP){
                arr[BP[key].time]=BP[key].id
            }
            const maxtimeidx=maxtime(arr)
            for (var key in BP){
                if(BP[key].id===maxtimeidx){
                    return(
                        <div>
                            <p>혈압:{BP[key].bp1}</p> 
                            <p>심박수:{BP[key].bp2}</p> 
                            <p>당화혈색소:{BP[key].bp3}</p>
                        </div>
                    )
                }
            }
        }
        else return null
    }
    function LastBS(){
        if(fetchdedataBS){
            const BP=fetchdedataBS.data.listBloodS.items
            const arr={}
            console.log(BP)
            for (var key in BP){
                arr[BP[key].time]=BP[key].id
            }
            const maxtimeidx=maxtime(arr)
            console.log(maxtimeidx)
            for (var key in BP){
                if(BP[key].id===maxtimeidx){
                    return(
                        <div>
                            <p>혈압:{BP[key].gc}</p> 
                        </div>
                    )
                }
            }
        }
        else return null   
    }
    function LastFood(){
        if(fetchdedataBS){
            const BP=fetchdedataBP.data.listBloodPS.items
            const arr={}
            for (var key in BP){
                arr[BP[key].time]=BP[key].id
            }
            const maxtimeidx=maxtime(arr)
            console.log(maxtimeidx)
            for (var key in BP){
                if(BP[key].id===maxtimeidx){
                    return(
                        <div>
                            <p>혈압:{BP[key].bp1}</p> 
                            <p>심박수:{BP[key].bp2}</p> 
                            <p>당화혈색소:{BP[key].bp3}</p>
                        </div>
                    )
                }
            }
        }
        else return null
        
    }
    
    return(
        <div class='Fetchdata'>
            <LastBP/>
            <LastBS/>
            </div> 
    )

}


export default Homerecord