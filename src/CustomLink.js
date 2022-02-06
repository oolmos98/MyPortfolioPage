import React from "react";

export const CustomLink = (props) => {
  return (
    <>
      <div className="floating">
        <a
          className="link"
          href={props.link.link}
          target="_blank"
          rel="noreferrer noopener"
        >
          <div id="customLink">
            <img
              id="socialImage"
              src={props.link.image}
              alt={props.link.name}
            />
            {props.link.name}
          </div>
        </a>
        <br />
      </div>
    </>
  );
};
