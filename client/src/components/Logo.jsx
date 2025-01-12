import React from "react";
import logoImg from "./../assets/logo.png";

function Logo({ width = "100px", height = "40px" }) {
  return <img style={{height, width}} src={logoImg} alt="" />;
}

export default Logo;
