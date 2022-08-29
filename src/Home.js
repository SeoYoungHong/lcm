import React, {useState, useEffect} from "react"
import Posting from "./Posting"
import HomeBP from "./HomeBP"
import HomeBS from "./HomeBS"
import HomeFood from "./HomeFood"
import {withAuthenticator} from '@aws-amplify/ui-react'
import {Link} from 'react-router-dom'
function Home(props){

    const [title, settitle]= useState('홈')
    useEffect(()=>{
      changetitle()
      props.setusenav(1)
    })
    function changetitle(){
      if(props.title) settitle(props.title)
    }
    return (
      <div>
        <header>HOME</header>
          {title ==='홈'? (
            <div>
                <p>
                  <button onClick={()=>{settitle('BP');props.setusenav(0)}}>혈압</button>
                  <button onClick={()=>{settitle('BS');props.setusenav(0)}}>혈당</button>
                </p>
                <p>
                  <button onClick={()=>{props.setusenav(0)}}><Link to="/food">식이</Link></button>
                  <button onClick={()=>{settitle('sports');props.setusenav(0)}}>운동</button>
                </p>
            </div>): 
            <div>
              <button onClick={()=>settitle('홈')}><Link to="/">뒤로</Link></button>
              <HomeBP titles={title}/>
              <HomeBS titles={title}/>
              <HomeFood titles={title}/>
            </div>  
              }

      </div>
    )
}
export default withAuthenticator(Home)