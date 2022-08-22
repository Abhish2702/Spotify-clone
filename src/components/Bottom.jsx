import React,{useRef, useState} from "react";
import SongInfo from "./SongInfo"
// import Song1 from "./songs/1.mp3";
import Container from "./Container";
import Songs_Array from "./Songs_Array";
// import {songPath} from "./Songs";
function Bottom(props){
    function getTime(seconds){
        var date = new Date(seconds * 1000);
        var hh = date.getUTCHours();
        var mm = date.getUTCMinutes();
        var ss = date.getSeconds();
        if (hh < 10) {hh = "0"+hh;}
        if (mm < 10) {mm = "0"+mm;}
        if (ss < 10) {ss = "0"+ss;} 
        var t = hh+":"+mm+":"+ss;
        return t;
      }
   
    const [gaanaID,setGaana]=useState(1);
    var myRef=useRef(require("./songs/"+Songs_Array[gaanaID-1].songPath+".mp3"));
    const [audioStatus,setAudioStatus]=useState(false); 
    // setAudioStatus(props.played);
    const[progressValue,setProgressValue]=useState(0);
    const [Volume,setVolume]=useState(100);
    const[currTime,setCurrTime]=useState(Math.floor(myRef.current.currentTime).toString());
    const[Duration,setDuration]=useState(Math.floor(myRef.current.duration).toString());
   
    React.useEffect(()=>{
        myRef.current.addEventListener("timeupdate",(e)=>{
           setProgressValue((e.target.currentTime/e.target.duration)*100);
        });
        return()=>{
            myRef.current.removeEventListener("timeupdate",()=>{});
        };

    },[])
    function playAudio(){
        myRef.current.play();
        setInterval(()=>{
            setCurrTime(Math.floor(myRef.current.currentTime).toString());
            if(myRef.current.currentTime===myRef.current.duration){
                next();
            };
        },1000)
        setTimeout(()=>{
            setDuration(Math.floor(myRef.current.duration).toString());
        },10)
       
        setAudioStatus(true);
    }
    function pauseAudio(){
        myRef.current.pause();
        setAudioStatus(false);
    }
    function ProgressBarChange(event){
        const newValue=event.target.value;
        setProgressValue(newValue);
        myRef.current.currentTime=newValue*(myRef.current.duration)/100;
    }
    function playAudio1(){
        myRef.current.currentTime=0;
        setProgressValue(0);
        playAudio();
        
    }
    function handleIconClick(id){
        setGaana(id);
        setAudioStatus(true);
        myRef.current.load();
        setTimeout(()=>{
            setDuration(Math.floor(myRef.current.duration).toString());
        },10)
        setTimeout(playAudio1,10);
    
    }
    function previous(){
        if(gaanaID===1){
            setGaana(Songs_Array.length);
            setAudioStatus(true);
            setTimeout(()=>{
                setDuration(Math.floor(myRef.current.duration).toString());
            },10)
            setTimeout(playAudio1,10);
        }
        else{
            setGaana(gaanaID-1);
            setAudioStatus(true);
            setTimeout(()=>{
                setDuration(Math.floor(myRef.current.duration).toString());
            },10)
            setTimeout(playAudio1,10);
        }
    }
    function next(){
        if(gaanaID===Songs_Array.length){
            setGaana(1);
            setAudioStatus(true);
            setTimeout(()=>{
                setDuration(Math.floor(myRef.current.duration).toString());
            },10)
            setTimeout(playAudio1,10);
        }
        else{
            setGaana(gaanaID+1);
            setAudioStatus(true);
            setTimeout(()=>{
                setDuration(Math.floor(myRef.current.duration).toString());
            },10)
            setTimeout(playAudio1,10);
        }
    }
    function pauseAudio1(){
        myRef.current.pause();
        
    }
    function iconPause(id){
        setGaana(id);
        setAudioStatus(false);
        setTimeout(pauseAudio1,10);
    }
    function VolumeChange(event){
        const newValue=event.target.value;
        setVolume(newValue);
        myRef.current.volume=newValue/100;
    }
    function formatSecondsAsTime(secs, format) {
        if(isNaN(secs)){
            return "00:00";
        }
        var hr  = Math.floor(secs / 3600);
        var min = Math.floor((secs - (hr * 3600))/60);
        var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
      
        if (min < 10){ 
          min = "0" + min; 
        }
        if (sec < 10){ 
          sec  = "0" + sec;
        }
      
        return min + ':' + sec;
      }
    return(
        <div>
        <Container changeSong={handleIconClick} playingStatus={audioStatus} playingSong={gaanaID} iconPause={iconPause}></Container>
        <div className="bottom">
            {/* {setAudioStatus(props.played)}; */}
            <audio ref={myRef} src={require("./songs/"+Songs_Array[gaanaID-1].songPath+".mp3")}></audio>
            <div className="currTime">
            {formatSecondsAsTime(currTime)}
            </div>
            <input type="range" name="range" id="myProgressBar" min="0" max="100" onChange={ProgressBarChange} value={progressValue}></input>
            <div className="duration">
            {formatSecondsAsTime(Duration)}
            </div>
            <div className="icons">
            <i className="fa-solid fa-3x fa-backward-step" onClick={previous}></i>
            {audioStatus?<i className="fa-solid fa-3x fa-circle-pause" onClick={pauseAudio}></i>:<i className="fa-solid fa-3x fa-circle-play" onClick={playAudio}></i>}
            <i className="fa-solid fa-3x fa-forward-step" onClick={next}></i>
            <div className="volume_bar">
            <i className="fa-solid fa-volume-high"></i><input type="range" name="volume" id="Volume" min="0" max="100" onChange={VolumeChange} value={Volume}></input>
            </div>
            </div>

            <SongInfo played={audioStatus} name={Songs_Array[gaanaID-1].songName}></SongInfo>
        </div>
        </div>
    )
}
export default Bottom;