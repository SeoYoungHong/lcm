import React, { useEffect, useState } from 'react'
import food_data from './food_data'
import { createFood } from './graphql'
import { API, Auth } from 'aws-amplify'
import {Link} from 'react-router-dom'
import Modal from 'react-modal';
function HomeFoodDetail(props){
    
    const [food,setfood]=useState()
    const [user, setuser] = useState(null)
    const [modalstate, setmodalstate] = useState(false)
    useEffect(()=>{
        Auth.currentAuthenticatedUser()
        .then(user=>setuser(user.username))
        .catch((e)=>console.log(e))
        props.setusenav(0)
        getid()
       
    },[])

    async function createdata(data){
        if(data){const newTodo = await API.graphql({ 
            query: createFood, 
            variables: {input:data}
        })}
    }

    function getid(){
        const link=window.location.href;
        const list_link=link.split('/')
        setfood(food_data[list_link[4]])
    }
    
    return(
        <div>
            {food ? (
                <div>
                    <Modal isOpen={modalstate} ariaHideApp={false}>
                        <p>식사가 저장되었습니다.</p>
                        <button ><Link to="/food">확인</Link></button>
                    </Modal>
                    <p>{food.name}</p>
                    <p>{food.detail.volum}{food.detail.a}</p>
                    <p>{'열량: '+food.detail.energe+'kcal'}</p>
                    <p>{'단백질: '+food.detail['단백질(g)']+'g'}</p>
                    <p>{'지방: '+food.detail['지방(g)']+'g'}</p>
                    <p>{'탄수화물: '+food.detail['탄수화물(g)']+'g'}</p>
                    {/*가끔 저장하고 데이터가 읽히지 않을 때가 있음.*/}
                    <button onClick={()=>{createdata({'name':food.name,'food':food, 'cal':food.detail.energe});setmodalstate(true)}}>저장</button>
                    <button ><Link to="/food">뒤로</Link></button>
                </div>
            )
            :null}
            
        </div>
        
    )
}

export default HomeFoodDetail