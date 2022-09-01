import React, { useContext, useEffect, useState } from "react";
import getdate from "./functions/date";
import { DatasFetch } from "./context/Store";
import { maxtime } from "./functions/sorting";
import Calendar from 'react-calendar';
import moment from "moment";

function Homerecord(props){
    if(props.titles!=='record') return(null)
    const {fetchdataall,reportdate, setreportdate, fetchdedataC, fetchdedataBS, fetchdedatafood, fetchdedataBP}=useContext(DatasFetch)
    const [totalcal, settotalcal] = useState(0)
    const [value, onChange] = useState(new Date());
    
    useEffect(()=>{
        fetchdata()
    },[])
    useEffect(()=>{
        fetchdata()
    },[reportdate]) 
    useEffect(()=>{
        setreportdate(moment(value).format("YYYY-MM-DD"))
    },[value])
    function fetchdata(){
        fetchdataall(moment(value).format("YYYY-MM-DD"))
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
            for (var key in BP){
                arr[BP[key].time]=BP[key].id
            }
            const maxtimeidx=maxtime(arr)
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
        if(fetchdedatafood){
            let cal=0
            fetchdedatafood &&fetchdedatafood.data.listFoods.items.map((arr, idx)=>{
                cal=cal+arr.cal   
            })
            settotalcal(cal)
            return(
                <div>
                    섭취칼로리: {totalcal}
                </div>
            )
        }
            
        else return null
        
    }

    function Calendars() {
        
        return (
            <div>
              <Calendar onChange={onChange} value={value} />
                 <div >
                   지금 날짜: {moment(value).format("YYYY년 MM월 DD일")}
                 </div>
            </div>
          );
      }
      
    
    return(
        <div class='Fetchdata'>
            <Calendars/>
            <LastBP/>
            <LastBS/>
            <LastFood/>
            
            </div> 
    )

}


export default Homerecord