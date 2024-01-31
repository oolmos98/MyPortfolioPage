import React from "react"
import { motion } from "framer-motion"

export const SkillItem = ({ logo, skill }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
    >
      <div
        style={{
          width: "120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <img
          style={{
            maxWidth: "90px",
            height: "80px",
            // maxHeight: "100px",
            verticalAlign: "middle",
            // padding-right: 16px;
            filter: "drop-shadow(0 0mm 10mm rgb(255, 255, 255))",
          }}
          src={logo}
          alt={skill + " logo"}
        />
        <h3>{skill}</h3>
      </div>
    </motion.div>
  )
}
