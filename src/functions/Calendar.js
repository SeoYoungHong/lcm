import React, { useState } from "react"
import getdate from "./date"

const datetime = new Date()
const [yaer, setyaer] = useState(datetime.getFullYear())
const [month, setmonth] =useState(datetime.getMonth()+1)
const [date, setdate] = useState(datetime.getDate())
const [day, setday] = useState(datetime.getDay())

export const upmonth=()=>{
    if(month==12){
        setyaer(yaer+1)
        setmonth(1)
    }
    else{
        setmonth(month+1)
    }
}
export const downmonth=()=>{
    if(month==1){
        setyaer(yaer-1)
        setmonth(12)
    }
    else{
        setmonth(month-1)
    }
}
export const Calendar=()=>{

}