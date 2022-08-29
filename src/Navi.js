import React from "react";
import {Link} from "react-router-dom"
import {Auth, auth0SignInButton} from "aws-amplify"
import './css/Navi.css'
import { MenuItem } from "@aws-amplify/ui-react";
import homeimg from './icons/homeimg.png'
import aboutimg from './icons/aboutimg.png'
import missionimg from './icons/missionimg.png'
import challengeimg from './icons/challengeimg.png'
import caresessionimg from './icons/caresessionimg.png'

function Navi(props){
    if(props.usenav===0){
        return null
    }

    async function signOut() {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return(
        <div class='Navi'>
            <button onClick={()=>signOut()}>로그아웃</button>
            <br/>
            <div class="bottom_menu">
                <div>
                    <button class='button'>
                        <img src={homeimg} width='35' height='35'></img>
                        <br/>
                        <Link to="/" style={{textDecoration: 'none'}}>Home</Link>
                    </button>
                </div>
                <div>
                    <button class='button'>
                        <img src={aboutimg} width='35' height='35'></img>
                        <br/>
                        <Link to='/about' style={{textDecoration: 'none'}}>about</Link>
                    </button>
                </div>
                <div>
                    <button class='button'>
                        <img src={missionimg} width='35' height='35'></img>
                        <br/>
                        <Link to='/mission' style={{textDecoration: 'none'}}>mission</Link>
                    </button>
                </div>
                <div>
                    <button class='button'>
                        <img src={challengeimg} width='35' height='35'></img>
                        <br/>
                        <Link to='/challenge' style={{textDecoration: 'none'}}>challenge</Link>
                    </button>
                </div>
                <div>
                    <button class='button'>
                        <img src={caresessionimg} width='35' height='35'></img>
                        <br/>
                        <Link to='/caresession' style={{textDecoration: 'none'}}>caresession</Link>
                    </button>
                </div>
            </div>
        </div>)
}
export default Navi