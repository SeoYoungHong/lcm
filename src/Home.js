import React, {useState, useEffect} from "react"
import Posting from "./Posting"
import {withAuthenticator} from '@aws-amplify/ui-react'
function Home(props){

    const [title, settitle]= useState('홈')
    return (
      <div>
        <header>HOME</header>
          {title ==='홈'? (
            <div>
                <p>
                <button onClick={()=>settitle('혈압')}>혈압</button>
                <button onClick={()=>settitle('혈당')}>혈당</button>
                </p>
                <p>
                <button onClick={()=>settitle('식이')}>식이</button>
                <button onClick={()=>settitle('운동')}>운동</button>
                </p>
            </div>): 
            <Posting titles={title} setusenav={props.setusenav} settitle={settitle} />}
          
      </div>
    )
}
export default withAuthenticator(Home)