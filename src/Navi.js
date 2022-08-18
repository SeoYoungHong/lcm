import React from "react";
import {Link} from "react-router-dom"


function Navi(props){
    if(props.usenav===0){
        return null
    }


    return(
        <div>
            <button>
                <Link to="/">홈</Link>
            </button>
            <button>
                <Link to='/about'>about</Link>
            </button>
            <button>
                <Link to='/mission'>mission</Link>
            </button>
            <button>
                <Link to='/challenge'>challenge</Link>
            </button>
            <button>
                <Link to='/caresession'>caresession</Link>
            </button>
        </div>)
}
export default Navi