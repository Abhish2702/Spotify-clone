import React from "react";
import Logo from "./images/covers/images.jpg";
function Nav(){
    return (
        <nav>
            <ul>
                <li className="brand"><img src={Logo} alt="spotify"></img> Dynk</li>
                <li>Home</li>
                <li>About</li>
            </ul>
        </nav>
    )
}
export default Nav;