import React from "react";
import "./Navigation.css";
import img from "../images/pokedex.png";
import img1 from "../images/Pokeball.png";

function Navigation() {
  return (
    <>
      <div className="Navigation-bar">
        <img src={img1} alt="pokeball-logo" className="navbar1-image" />
        <img src={img} alt="pokedex-logo" className="navbar2-image" />
        <img src={img1} alt="pokeball-logo" className="navbar3-image" />
      </div>
    </>
  );
}

export default Navigation;
