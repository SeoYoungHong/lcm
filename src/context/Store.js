import React, {createContext, useState, useEffect} from "react";
import getdate from "../functions/date";
import { listBloodPS, listBloodS, listChallenges, listFoods } from "../graphql";
import { API } from "aws-amplify";
import moment from "moment";

export const NameContext = createContext({
    username:'',
    changeUserName: () => {},
})

export const DatasFetch = createContext({
    fetchdedataBP:[],
    fetchdedataBS:[],
    fetchdedatafood:[],
    fetchdedataC:[],
    reportdate:[],
    fetchdataBP:()=>{},
    fetchdataBS:()=>{},
    fetchdataFood:()=>{},
    fetchdataChallenge:()=>{},
    fetchdataall:()=>{},
    setreportdate:()=>{},
})


const Store = ({children}) => {
    const [username,setUsername] = useState('');
    const [fetchdedatafood, setfetcheddatafood]=useState()
    const [fetchdedataBP, setfetcheddataBP]=useState()
    const [fetchdedataBS, setfetcheddataBS]=useState()
    const [fetchdedataC, setfetcheddataC]=useState()
    const [reportdate, setreportdate] = useState(moment(todaydate).format("YYYY-MM-DD"))
    const todaydate= new Date()
    const changeUserName = () => {
        setUsername('서용');
    }
    useEffect(()=>{
        fetchdata()
    },[reportdate]) 
    let date=getdate().split('T')[0]
    let time=getdate().split('T')[1]
    async function fetchdata(lists, path, dates){
        //혈당에서는 혈당에 대한 정보만 뜨게함
        var filter={date:{eq: dates},}
        
        if(lists){const data =await API.graphql({query: lists, variables:{filter:filter}})
            .then(data => {path(data)})
            .catch(err=>console.log(err))
            console.log("datafetch success")
        }
        else(console.log('데이터를 입력해라'))
    }
    function fetchdataFood(){fetchdata(listFoods, setfetcheddatafood, reportdate)}
    function fetchdataBP(){fetchdata(listBloodPS, setfetcheddataBP, reportdate)}
    function fetchdataBS(){fetchdata(listBloodS, setfetcheddataBS, reportdate)}
    function fetchdataChallenge(){fetchdata(listChallenges, setfetcheddataC, reportdate)}
    function fetchdataall(){
        fetchdataBP()
        fetchdataBS()
        fetchdataChallenge()
        fetchdataFood()
    }
    return(
        <div>
            <NameContext.Provider value={{
                username,
                changeUserName
            }}>
            </NameContext.Provider>
            <DatasFetch.Provider value={{
                reportdate,
                fetchdedataBP,
                fetchdedataBS,
                fetchdedatafood,
                fetchdedataC,
                fetchdataBP,
                fetchdataBS,
                fetchdataFood,
                fetchdataChallenge,
                fetchdataall,
                setreportdate,
            }}>   
            {children}
            </DatasFetch.Provider>
            
        </div>
    )
}
export default Store;