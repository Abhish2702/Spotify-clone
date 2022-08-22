import React from "react";
// import bg from "./images/bg.jpg";

import Song from "./Songs";
import Songs from "./Songs_Array";
// import Bottom from "./Bottom";
function Container(props){
   
    function createSong(song){
        console.log(props.playingStatus);
        // console.log(song.id);
        return <Song key={song.id} playingSong={props.playingSong} playingStatus={props.playingStatus} id={song.id} songName={song.songName} songPath={song.songPath} imgSrc={song.coverPath} iconClick={props.changeSong} iconPause={props.iconPause}></Song>
    }
    return (
        
        <div className="container" >
            <h1>Best of NCS -No Copyright Sounds</h1>
            <div className="songItemContainer">
           {Songs.map(createSong)}
           </div>
           
        </div>
        
    );
}
export default Container;