import "./Portfolio.css"
import logo from "./assets/img/portfolioSelfie2.jpg"
import { CustomLink } from "./components/CustomLink"
import { Particles } from "react-tsparticles"
import { useState } from "react"
import { Section } from "./components/Section"
import { SkillItem } from "./components/SkillItem"

const linksLoop = (links) => {
  let x = []
  for (let i = 0; i < links.length; i++) {
    const l = links[i]
    x.push(<CustomLink link={l} key={l.name} />)
  }
  return x
}

const Portfolio = (props) => {
  const [width] = useState(window.innerWidth)
  const isMobile = width <= 768
  return (
    <>
      <Particles
        params={{
          fpsLimit: isMobile ? 60 : 80,
          pauseOnBlur: true,
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
                area: 1200,
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
                distance: 50,
                duration: 1,
              },
            },
          },
        }}
      />
      <div className="intro floating">
        <img className="logo" src={logo} alt="This is my selfie" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            flexWrap: "wrap",
            flexShrink: 3,
          }}
        >
          {props.me.sections.map((element) => {
            return <Section section={element} />
          })}
        </div>

        <div
          style={{
            width: "100%",
          }}
        >
          <h1>Here are technologies I have worked with:</h1>
          <h2
            style={{
              textDecoration: "underline",
            }}
          >
            Front End:
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 50,
              alignItems: "center",
              flexWrap: "wrap",
              rowGap: 5,
            }}
          >
            <SkillItem
              logo={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
              }
              skill={"React.js"}
            />
            <SkillItem
              logo={
                "https://storage.googleapis.com/cms-storage-bucket/0dbfcc7a59cd1cf16282.png"
              }
              skill={"Flutter"}
            />
            <SkillItem
              logo={
                "https://play-lh.googleusercontent.com/QbSSiRcodmWx6HlezOtNu3vmZeuFqkQZQQO5Y2-Zg_jBRm-mXjhlXX5yFj8iphfqzQ"
              }
              skill={"WeChat Mini Programs"}
            />
            <SkillItem
              logo={
                "https://developer.apple.com/assets/elements/icons/swiftui/swiftui-96x96_2x.png"
              }
              skill={"SwiftUI"}
            />
          </div>
        </div>

        <h2
          style={{
            marginTop: "45px",
            textDecoration: "underline",
          }}
        >
          Back End:
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 50,
            alignItems: "center",
            flexWrap: "wrap",
            rowGap: 5,
          }}
        >
          <SkillItem
            logo={
              "https://cdn.iconscout.com/icon/free/png-256/free-java-60-1174953.png"
            }
            skill={"Java"}
          />
          <SkillItem
            logo={"https://www.svgrepo.com/show/354245/quarkus-icon.svg"}
            skill={"Quarkus"}
          />
          <SkillItem
            logo={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/2048px-GraphQL_Logo.svg.png"
            }
            skill={"GraphQL"}
          />
          <SkillItem
            logo={
              "https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg"
            }
            skill={"Microsoft SQL Server"}
          />
          <SkillItem
            logo={
              "https://everythingdevops.dev/content/images/2023/08/Amazon-S3-Logo.svg.png"
            }
            skill={"AWS S3"}
          />
        </div>

        <h2
          style={{
            marginTop: "45px",
            textDecoration: "underline",
          }}
        >
          Tools:
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 50,
            alignItems: "center",
            flexWrap: "wrap",
            rowGap: 5,
          }}
        >
          <SkillItem
            logo={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png"
            }
            skill={"Visual Studio Code"}
          />
          <SkillItem
            logo={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/IntelliJ_IDEA_Icon.svg/1024px-IntelliJ_IDEA_Icon.svg.png"
            }
            skill={"IntelliJ IDEA"}
          />
          <SkillItem
            logo={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Android_Studio_icon_%282023%29.svg/2048px-Android_Studio_icon_%282023%29.svg.png"
            }
            skill={"Android Studio"}
          />
          <SkillItem
            logo={
              "https://static-00.iconduck.com/assets.00/apps-insomnia-icon-512x512-dse2p0fm.png"
            }
            skill={"Insomnia"}
          />
          <SkillItem
            logo={"https://www.svgrepo.com/show/448271/azure-devops.svg"}
            skill={"Azure DevOps"}
          />
          <SkillItem
            logo={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2048px-Git_icon.svg.png"
            }
            skill={"Git"}
          />
          <SkillItem
            logo={"https://cdn-icons-png.flaticon.com/512/25/25231.png"}
            skill={"GitHub"}
          />
        </div>
        <br />
        <br />

        <h1>To learn more about me, here are relevant links!</h1>
        {linksLoop(props.me.links)}
      </div>
    </>
  )
}
export default Portfolio
