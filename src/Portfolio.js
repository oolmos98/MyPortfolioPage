import "./Portfolio.css";
//import { Link } from "react-router-dom";
import logo from "./assets/img/portfolioSelfie.png";

const certsLoop = (certs) => {
  let links = [];
  for (let i = 0; i < certs.length; i++) {
    const name = certs[i].name;
    const link = certs[i].link;
    console.log(certs[i]);
    links.push(
      <a
        id="link"
        key={i + 1}
        href={link}
        target="_blank"
        rel="noreferrer noopener"
      >
        {name}
      </a>
    );
    i === certs.length - 1 ? links.push(".") : links.push(", ");
  }
  return links;
};

const Portfolio = (props) => {
  return (
    <>
      <h1 id="comment">*work in progress*</h1>

      <div id="intro">
        <img id="logo" src={logo} alt="This is my selfie" />
        <h1>
          My name is {props.me.firstName + " " + props.me.lastName} <br />I am a
          graduate from the {props.me.school} with a {props.me.degree} in{" "}
          {props.me.study}.
          <br />
          My current certifications include: {certsLoop(props.me.certificates)}
          <br />
          Below you will find relative links about myself.
        </h1>
        {console.log(props.me)}
      </div>
    </>
  );
};
export default Portfolio;
