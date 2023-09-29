import "./Portfolio.css"
import logo from "./assets/img/portfolioSelfie2.jpg"
import { CustomLink } from "./CustomLink"
import { Particles } from "react-tsparticles"
import { useState } from "react"

const certsLoop = (certs) => {
  let links = []
  for (let i = 0; i < certs.length; i++) {
    const name = certs[i].name
    const link = certs[i].link
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
    )
    i !== certs.length - 1 ? links.push(",") : links.push("")
  }
  return links
}
const linksLoop = (links) => {
  let x = []
  for (let i = 0; i < links.length; i++) {
    const l = links[i]
    x.push(<CustomLink link={l} key={l.name} />)
  }
  return x
}

const Portfolio = (props) => {
  const [width, setWidth] = useState(window.innerWidth)
  const isMobile = width <= 768
  return (
    <>
      <Particles
        params={{
          fpsLimit: 120,
          pauseOnBlur: false,
          particles: {
            color: {
              value: "#fff",
            },
            opacity: {
              value: 1,
            },
            number: {
              density: {
                enable: true,
                area: 850,
              },
              value: isMobile ? 40 : 50,
            },
            links: {
              enable: true,
              color: "#000",
              distance: 90,
              opacity: 1,
              width: 2,
            },
            move: {
              enable: true,
              outMode: "bounce",
            },
          },
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 1,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
        }}
      />
      <div className="intro floating">
        <img className="logo" src={logo} alt="This is my selfie" />
        <h1>
          {props.me.firstName + " " + props.me.lastName} <br /> <br />
          {props.me.school} <br />
          {props.me.degree} <br />
          {props.me.study}
          <br />
          <br />
          {props.me.summary1}
          <br />
          <br />
          {props.me.summary2}
          <br />
          <br />
          Certifications: {certsLoop(props.me.certificates)}
        </h1>
        <br />
        <br />
        {linksLoop(props.me.links)}
      </div>
    </>
  )
}
export default Portfolio
