import React,{useState}from "react";
// import { isPropertySignature } from "typescript";
// const [songPath,setSongPath]=useState("Khabbi Seat");
// const [imgPath,setImgPath]=useState("./images/covers/khabbi seat.jpg");
// import Music from songPath;
// import image from imgPath;
// import cover10 from "./images/covers/10.jpg"
function Song(props){
//    console.log(myRef.current.duration);
    // function handleClick(){
    //     setSongPath(props.songPath);
    // }
    const [audioStatus,setAudioStatus]=useState(0);
    function handleClick(){
       const id=props.id;
        props.iconClick(id);
    }
    function handleClick1(){
        const id=props.id;
        props.iconPause(id);
    }
    function icon(){
        // console.log(props.playingSong===props.id);
        console.log(props.playingStatus===1);
        return (props.playingStatus===1 && props.playingSong===props.id);
    }
    return(
        <div style={{margin:"-3px"}}>
    
            <div className="songItem">
            <img src={require("./images/covers/"+props.imgSrc+".jpg")} alt="1"></img>
            <span>{props.songName}</span>
            <span className="songListPlay"><span className="timeStamp">{icon()?<i className="fa-solid fa-circle-pause" onClick={handleClick1}></i>:<i className="fa-solid fa-circle-play" onClick={handleClick}></i>} </span></span>
            </div>
            <div className="songBanner"></div>
        </div>
    )
}
// export {songPath};
export default Song;
