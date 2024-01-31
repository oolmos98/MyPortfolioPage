import React from "react"
import { motion } from "framer-motion"

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
          <motion.div
            id="customLink"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <img
              id="socialImage"
              src={props.link.image}
              alt={props.link.name}
            />
            {props.link.name}
          </motion.div>
        </a>
        <br />
      </div>
    </>
  )
}
