import React from "react";
import {Link} from "react-router-dom"
import {Auth, auth0SignInButton} from "aws-amplify"
import './test.css'


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
            <button class='button'>
                <Link to="/">홈</Link>
            </button>
            <button class='button'>
                <Link to='/about'>about</Link>
            </button>
            <button class='button'>
                <Link to='/mission'>mission</Link>
            </button>
            <button class='button'>
                <Link to='/challenge'>challenge</Link>
            </button>
            <button class='button'>
                <Link to='/caresession'>caresession</Link>
            </button>
            <button onClick={()=>signOut()}>로그아웃</button>
        </div>)
}
export default Navi