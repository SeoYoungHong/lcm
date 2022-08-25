import React from "react";

function ChallengeDetail(props){
    return (
        <div>
            <p>{props.content.title}</p>
            <button onClick={()=>{props.setstate('challenge'); props.setcategorystate(true)}}>뒤로가기</button>
        </div>
    )
}

export default ChallengeDetail