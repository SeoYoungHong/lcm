import React, {useState, useEffect} from "react"
import Posting from "./Posting"
import HomeBP from "./HomeBP"
import HomeBS from "./HomeBS"
import HomeFood from "./HomeFood"
import {withAuthenticator} from '@aws-amplify/ui-react'
import {Link} from 'react-router-dom'
import './css/Home.css'

function Home(props){

    const [title, settitle]= useState('홈')
    useEffect(()=>{
      changetitle()
    })
    function changetitle(){
      if(props.title) settitle(props.title)
    }

    async function changepage(event){
      settitle(event)
      const navstate= await props.setusenav(0)
    }

    return (
      <div class='Home'>
          {title ==='홈'? (
            <div>
              <h1 class='h1'> 매일을 기록하며 하루를 시작하세요.
                <p>
                  <button class='button1' onClick={()=>changepage('BP')}>혈압</button>
                  <button class='button2' onClick={()=>changepage('BS')}>혈당</button>
                </p>
                <p>
                  <Link to="/food" style={{textDecoration: 'none'}}><button class='button3' onClick={()=>{props.setusenav(0)}}>식이</button></Link>
                  <button class='button4' onClick={()=>changepage('sports')}>운동</button>
                </p>
              </h1>
            </div>): 
            <div>
              <button onClick={()=>{settitle('홈'); props.setusenav(1)}}><Link to="/">뒤로</Link></button>
              <HomeBP titles={title}/>
              <HomeBS titles={title}/>
              <HomeFood titles={title}/>
            </div>  
              }

      </div>
    )
}
export default withAuthenticator(Home)