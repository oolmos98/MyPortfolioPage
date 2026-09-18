import { motion } from "framer-motion";

const skillGroups = [
  {
    label: "Build",
    skills: ["Java", "Spring Boot", "React", "GraphQL", "REST APIs"],
  },
  {
    label: "Platform",
    skills: ["AWS", "ROSA", "OpenShift", "Kubernetes", "Argo CD", "DevOps"],
  },
  {
    label: "Operate",
    skills: ["GitLab CI", "Snyk", "Dynatrace", "Entra ID"],
  },
  {
    label: "Collaborate",
    skills: ["Slack", "Jira", "Confluence"],
  },
  {
    label: "Earlier experience",
    skills: [
      "Java JSP",
      "Flutter",
      "SwiftUI",
      "WeChat Mini Programs",
      "SQL Server",
      "AWS S3",
      "Terraform",
      "Azure DevOps",
      "Bruno",
      "Insomnia",
      "Draw.io",
      "GitHub",
      "GitLab",
    ],
  },
];

export default function InteractiveSkills() {
  return (
    <div className="skill-groups" aria-label="Technical skills">
      {skillGroups.map((group, groupIndex) => (
        <motion.div
          className="skill-group"
          key={group.label}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: groupIndex * 0.08, duration: 0.5 }}
        >
          <span className="skill-label">{group.label}</span>
          <div className="skill-list">
            {group.skills.map((skill) => (
              <motion.span
                className="skill-pill"
                key={skill}
                whileHover={{ y: -4, backgroundColor: "#d8f45f" }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
