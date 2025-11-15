import { ResumeData } from "@/store/resumeStore";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="grid grid-cols-[1fr_2fr] gap-6 text-foreground" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Left Column */}
      <div className="space-y-6 border-r border-border pr-6">
        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Contact</h2>
          <div className="space-y-2 text-sm">
            {personalInfo.email && (
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Skills</h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <h3 className="font-semibold text-sm mb-1.5">{skill.category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-primary text-xs rounded-md"
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

        {/* Education Summary */}
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Education</h2>
            <div className="space-y-3 text-sm">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-muted-foreground text-xs">{edu.school}</p>
                  <p className="text-muted-foreground text-xs">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2 text-primary">{personalInfo.name}</h1>
          {personalInfo.summary && (
            <p className="text-sm leading-relaxed text-muted-foreground mt-3">
              {personalInfo.summary}
            </p>
          )}
        </div>

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-primary uppercase tracking-wide border-b border-border pb-2">
              Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-base">{exp.title}</h3>
                      <p className="text-sm font-medium text-primary">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{exp.location}</p>
                      <p className="text-xs">{exp.startDate} - {exp.endDate}</p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm mt-2 whitespace-pre-line text-muted-foreground">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-primary uppercase tracking-wide border-b border-border pb-2">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-base">{project.name}</h3>
                    {project.url && (
                      <a
                        href={project.url}
                        className="text-primary text-sm flex items-center gap-1 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Link
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
