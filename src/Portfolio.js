import "./Portfolio.css";
import logo from "./assets/img/portfolioSelfie2.jpg";
import { CustomLink } from "./components/CustomLink";
import { Section } from "./components/Section";
import { SkillItem } from "./components/SkillItem";
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
            return <Section section={element} />;
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
                "https://cdn-icons-png.flaticon.com/512/28/28968.png"
              }
              skill={"Java JSP"}
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
            logo={
              "https://img.icons8.com/?size=512&id=90519&format=png"
            }
            skill={"Spring Boot"}
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
          Infrastructure:
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
              "https://img.icons8.com/m_outlined/600/FFFFFF/amazon-web-services.png"
            }
            skill={"Amazon Web Services"}
          />
          <SkillItem
            logo={
              "https://static-00.iconduck.com/assets.00/terraform-icon-1803x2048-hodrzd3t.png"
            }
            skill={"Terraform"}
          />
          <SkillItem
            logo={"https://img.stackshare.io/company/755/c39831d816dd9fbe7b53613823bdf3fb28064818.png"}
            skill={"Scalr"}
          />
          <SkillItem
            logo={
              "https://icon.icepanel.io/Technology/svg/Argo-CD.svg"
            }
            skill={"Argo CD"}
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
              "https://docs.usebruno.com/bruno.png"
            }
            skill={"Bruno"}
          />
          <SkillItem
            logo={
              "https://static-00.iconduck.com/assets.00/apps-insomnia-icon-512x512-dse2p0fm.png"
            }
            skill={"Insomnia"}
          />
          <SkillItem
            logo={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Diagrams.net_Logo.svg/2048px-Diagrams.net_Logo.svg.png"
            }
            skill={"Draw.io"}
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
          
          <SkillItem
            logo={
              "https://gitlab.com/uploads/-/system/group/avatar/6543/logo-extra-whitespace.png"
            }
            skill={"GitLab"}
          />
        </div>
        <br />
        <br />

        <h1>Check out these links!</h1>
        {linksLoop(props.me.links)}
      </div>
    </>
  );
};
export default Portfolio;
