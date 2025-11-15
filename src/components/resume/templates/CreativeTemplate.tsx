import { ResumeData } from "@/store/resumeStore";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

interface CreativeTemplateProps {
  data: ResumeData;
}

export const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="grid grid-cols-[2fr_3fr] gap-0 text-foreground" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Left Sidebar */}
      <div className="bg-primary/5 p-6 space-y-6">
        {/* Profile Section */}
        <div className="bg-primary/10 p-4 rounded-lg">
          <h1 className="text-2xl font-bold mb-1 text-primary">{personalInfo.name}</h1>
          {personalInfo.summary && (
            <p className="text-xs leading-relaxed mt-2">{personalInfo.summary}</p>
          )}
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-base font-bold mb-3 text-primary uppercase tracking-wider flex items-center gap-2">
            <div className="h-0.5 w-6 bg-primary"></div>
            Contact
          </h2>
          <div className="space-y-2 text-xs">
            {personalInfo.email && (
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 mt-0.5 text-primary flex-shrink-0" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 mt-0.5 text-primary flex-shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-primary flex-shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-base font-bold mb-3 text-primary uppercase tracking-wider flex items-center gap-2">
              <div className="h-0.5 w-6 bg-primary"></div>
              Skills
            </h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <h3 className="font-semibold text-xs mb-2 text-black">{skill.category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-primary text-xs rounded-full font-medium"
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

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-base font-bold mb-3 text-primary uppercase tracking-wider flex items-center gap-2">
              <div className="h-0.5 w-6 bg-primary"></div>
              Education
            </h2>
            <div className="space-y-3 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-sm">{edu.degree}</h3>
                  <p className="text-primary font-medium">{edu.school}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.description && (
                    <p className="text-xs mt-1 text-muted-foreground">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Main Area */}
      <div className="p-6 space-y-6">
        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary uppercase tracking-wide flex items-center gap-3">
              <div className="h-1 w-12 bg-primary"></div>
              Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-primary pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-lg">{exp.title}</h3>
                      <p className="text-sm font-semibold text-primary">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p className="font-medium">{exp.location}</p>
                      <p className="text-xs">{exp.startDate} - {exp.endDate}</p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm mt-2 whitespace-pre-line text-muted-foreground leading-relaxed">
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
            <h2 className="text-2xl font-bold mb-4 text-primary uppercase tracking-wide flex items-center gap-3">
              <div className="h-1 w-12 bg-primary"></div>
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-primary">{project.name}</h3>
                    {project.url && (
                      <a
                        href={project.url}
                        className="text-primary text-sm flex items-center gap-1 hover:underline font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        View
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
      </div>
    </div>
  );
};
