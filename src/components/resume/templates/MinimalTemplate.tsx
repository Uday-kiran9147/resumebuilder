import { ResumeData } from "@/store/resumeStore";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

interface MinimalTemplateProps {
  data: ResumeData;
}

export const MinimalTemplate = ({ data }: MinimalTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="space-y-6 text-foreground" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className="border-b-2 border-primary pb-4">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.name}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {personalInfo.location}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
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

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-3 text-primary">EDUCATION</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>{edu.location}</p>
                    <p>{edu.startDate} - {edu.endDate}</p>
                  </div>
                </div>
                {edu.description && (
                  <p className="text-sm mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-3 text-primary">SKILLS</h2>
          <div className="space-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex gap-2">
                <span className="font-semibold min-w-[120px]">{skill.category}:</span>
                <span className="text-sm">{skill.items.join(", ")}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-3 text-primary">PROJECTS</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{project.name}</h3>
                  {project.url && (
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                {project.description && (
                  <p className="text-sm mt-1">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
