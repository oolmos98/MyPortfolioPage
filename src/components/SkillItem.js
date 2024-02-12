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
      transition={{
        ease: "linear",
        duration: 0.75,
      }}
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
            verticalAlign: "middle",
          }}
          src={logo}
          alt={skill + " logo"}
        />
        <h3>{skill}</h3>
      </div>
    </motion.div>
  )
}
