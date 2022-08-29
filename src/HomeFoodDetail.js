import React, { useEffect, useState } from 'react'
import food_data from './food_data'
import { createFood } from './graphql'
import { API, Auth } from 'aws-amplify'
import {Link} from 'react-router-dom'
function HomeFoodDetail(props){
    
    const [food,setfood]=useState()
    const [user, setuser] = useState(null)
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
            variables: {input:{name: user, ...data}}
        })}
    }

    function getid(){
        const link=window.location.href;
        const list_link=link.split('/')
        setfood(food_data[list_link[4]])
        console.log(food)
    }
    
    return(
        <div>
            {food ? (
                <div>
                    {console.log(food)}
                    <p>{food.name}</p>
                    <p>{food.detail.volum}{food.detail.a}</p>
                    <p>{'열량: '+food.detail.energe+'kcal'}</p>
                    <p>{'단백질: '+food.detail['단백질(g)']+'g'}</p>
                    <p>{'지방: '+food.detail['지방(g)']+'g'}</p>
                    <p>{'탄수화물: '+food.detail['탄수화물(g)']+'g'}</p>
                    <button onClick={()=>createdata({'food':food, 'cal':food.detail.energe})}><Link to="/food">저장</Link></button>
                </div>
            )
            :null}
            
        </div>
        
    )
}

export default HomeFoodDetail