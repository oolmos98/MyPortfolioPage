const skillGroups = [
  {
    label: "Services & Data",
    skills: ["Java", "Spring Boot", "GraphQL", "REST APIs", "Aurora PostgreSQL", "React"],
  },
  {
    label: "Platform & Runtime",
    skills: ["AWS", "ROSA (OpenShift)", "Kubernetes", "Argo CD", "Terraform"],
  },
  {
    label: "Delivery & Security",
    skills: ["GitLab CI", "Snyk", "Entra ID / OIDC", "Container Signing"],
  },
  {
    label: "Observability & Ops",
    skills: ["Dynatrace", "OpenTelemetry", "Slack", "Jira", "Confluence"],
  },
  {
    label: "Earlier Stack",
    skills: [
      "SQL Server",
      "Flutter",
      "SwiftUI",
      "WeChat Mini Programs",
      "Java JSP",
      "Azure DevOps",
      "AWS S3",
      "Bruno / Insomnia",
    ],
  },
];

export default function InteractiveSkills() {
  return (
    <div className="skill-groups" aria-label="Technical skills">
      {skillGroups.map((group) => (
        <div className="skill-group" key={group.label}>
          <span className="skill-label">{group.label}</span>
          <div className="skill-list">
            {group.skills.map((skill) => (
              <span className="skill-pill" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
