import React from "react";
import me from "./me";
import "./Portfolio.css";
import logo from "./assets/img/portfolioSelfie.png";

export default function Portfolio() {
  return (
    <>
      <h1 id="comment">*work in progress*</h1>

      <div id="intro">
        <img id="logo" src={logo} alt="This is my selfie" />
        <h1>
          My name is {me.firstName + " " + me.lastName} <br />I am a graduate
          from the {me.school} with a {me.degree} in {me.study}.
          <br />
          Below you will find relative links about myself.
        </h1>
      </div>
    </>
  );
}
console.log(me);
