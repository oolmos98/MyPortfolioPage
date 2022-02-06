import "./Portfolio.css";
//import { Link } from "react-router-dom";
import logo from "./assets/img/portfolioSelfie.png";
import { CustomLink } from "./CustomLink";

const certsLoop = (certs) => {
  let links = [];
  for (let i = 0; i < certs.length; i++) {
    const name = certs[i].name;
    const link = certs[i].link;
    links.push(
      <a
        className="link"
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
const linksLoop = (links) => {
  let x = [];
  for (let i = 0; i < links.length; i++) {
    const l = links[i];
    x.push(<CustomLink link={l} key={l.name} />);
  }
  return x;
};

const Portfolio = (props) => {
  return (
    <>
      <div className="intro floating">
        <img className="logo" src={logo} alt="This is my selfie" />
        <h1>
          My name is {props.me.firstName + " " + props.me.lastName} <br />I am a
          graduate from the {props.me.school} with a {props.me.degree} in{" "}
          {props.me.study}.
          <br />
          My current certifications include: {certsLoop(props.me.certificates)}
          <br />
          <br />
          Below you will find relative links about myself.
        </h1>
        <br />
        <br />
        {linksLoop(props.me.links)}
      </div>
    </>
  );
};
export default Portfolio;
