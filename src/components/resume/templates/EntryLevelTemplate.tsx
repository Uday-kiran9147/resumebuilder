import { ResumeData } from "@/store/resumeStore";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

interface EntryLevelTemplateProps {
  data: ResumeData;
}

export const EntryLevelTemplate = ({ data }: EntryLevelTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;
  // Smart section ordering: prioritize what exists
  const hasExperience = experience.length > 0;

  return (
    <div className="space-y-6 text-foreground" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className="border-b-2 border-primary pb-4">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.name}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              {/* <Mail className="w-4 h-4" /> */}
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              {/* <Phone className="w-4 h-4" /> */}
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              {/* <MapPin className="w-4 h-4" /> */}
              {personalInfo.location}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div>
          <h2 className="text-xl font-bold mb-2 text-primary">OBJECTIVE</h2>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Education (prioritized for entry-level) */}
      {education.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-3 text-primary">EDUCATION</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="bg-muted/30 px-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{edu.degree}</h3>
                    <p className="text-sm font-medium text-primary">{edu.school}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>{edu.location}</p>
                    <p className="font-medium">{edu.startDate} - {edu.endDate}</p>
                  </div>
                </div>
                {edu.description && (
                  <p className="text-sm mt-2 text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills (prominent for entry-level) */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-3 text-primary">SKILLS</h2>
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-muted/30 px-4">
                <h3 className="font-semibold mb-2">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="p-2 text-primary text-sm rounded-md font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects (emphasized for entry-level) */}
      {projects.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-3 text-primary">PROJECTS</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-muted/30 px-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{project.name}</h3>
                  {project.url && (
                    <a
                      href={project.url}
                      className="text-primary text-sm flex items-center gap-1 hover:underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </a>
                  )}
                </div>
                {project.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience (shown last for entry-level, or omitted if empty) */}
      {hasExperience && (
        <div>
          <h2 className="text-xl font-bold mb-3 text-primary">EXPERIENCE</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>{exp.location}</p>
                    <p>{exp.startDate} - {exp.endDate}</p>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-sm mt-2 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
