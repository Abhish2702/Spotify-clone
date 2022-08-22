import React from "react";
import Playing from "./images/playing.gif"
function SongInfo(props){
    return (
        <div className="songInfo">
        <img style={{opacity:props.played?"1":"0"}} src={Playing} alt="playing"></img>{props.name}
        </div>
    )
}
export default SongInfo;