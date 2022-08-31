import React, {createContext, useState} from "react";
import getdate from "../functions/date";
import { listBloodPS, listBloodS, listChallenges, listFoods } from "../graphql";
import { API } from "aws-amplify";

export const NameContext = createContext({
    username:'',
    changeUserName: () => {},
})

export const DatasFetch = createContext({
    fetchdedataBP:[],
    fetchdedataBS:[],
    fetchdedatafood:[],
    fetchdedataC:[],
    fetchdataBP:(date)=>{},
    fetchdataBS:(date)=>{},
    fetchdataFood:(date)=>{},
    fetchdataChallenge:(date)=>{},
    fetchdataall:(date)=>{},
})


const Store = ({children}) => {
    const [username,setUsername] = useState('');
    const [fetchdedatafood, setfetcheddatafood]=useState()
    const [fetchdedataBP, setfetcheddataBP]=useState()
    const [fetchdedataBS, setfetcheddataBS]=useState()
    const [fetchdedataC, setfetcheddataC]=useState()
    
    const changeUserName = () => {
        setUsername('서용');
    }
    let date=getdate().split('T')[0]
    let time=getdate().split('T')[1]
    async function fetchdata(lists, path, dates){
        //혈당에서는 혈당에 대한 정보만 뜨게함
        var filter={date:{eq: date},}
        if(dates){filter = {date:{eq: dates},}}
        
        if(lists){const data =await API.graphql({query: lists, variables:{filter:filter}})
            .then(data => {path(data)})
            .catch(err=>console.log(err))
            console.log("datafetch success")
        }
        else(console.log('데이터를 입력해라'))
    }
    function fetchdataFood(date){fetchdata(listFoods, setfetcheddatafood, date)}
    function fetchdataBP(date){fetchdata(listBloodPS, setfetcheddataBP, date)}
    function fetchdataBS(date){fetchdata(listBloodS, setfetcheddataBS, date)}
    function fetchdataChallenge(date){fetchdata(listChallenges, setfetcheddataC, date)}
    function fetchdataall(date){
        fetchdataBP(date)
        fetchdataBS(date)
        fetchdataChallenge(date)
        fetchdataFood(date)
    }
    return(
        <div>
            <NameContext.Provider value={{
                username,
                changeUserName
            }}>
            </NameContext.Provider>
            <DatasFetch.Provider value={{
                fetchdedataBP,
                fetchdedataBS,
                fetchdedatafood,
                fetchdedataC,
                fetchdataBP,
                fetchdataBS,
                fetchdataFood,
                fetchdataChallenge,
                fetchdataall
            }}>   
            {children}
            </DatasFetch.Provider>
            
        </div>
    )
}
export default Store;