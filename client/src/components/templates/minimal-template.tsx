import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import type { ResumeData } from "@shared/schema";

interface MinimalTemplateProps {
  resumeData: ResumeData;
}

export default function MinimalTemplate({ resumeData }: MinimalTemplateProps) {
  const { personal, experiences, education, skills, customization } = resumeData;

  const getAccentColor = (scheme: string) => {
    switch (scheme) {
      case 'secondary':
        return 'text-secondary';
      case 'accent':
        return 'text-accent';
      case 'success':
        return 'text-success';
      case 'dark':
        return 'text-gray-800';
      default:
        return 'text-primary';
    }
  };

  const fontClass = customization.fontFamily === 'poppins' ? 'font-poppins' : 'font-inter';
  const spacing = customization.spacing === 1 ? 'space-y-6' : customization.spacing === 3 ? 'space-y-16' : 'space-y-10';

  return (
    <div className={`h-full bg-white ${fontClass} p-12`}>
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-light mb-4 text-gray-900 tracking-wide">
          {personal.fullName || "Your Name"}
        </h1>
        <h2 className={`text-xl ${getAccentColor(customization.colorScheme)} mb-6 font-light`}>
          {personal.title || "Professional Title"}
        </h2>
        
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          {personal.email && (
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{personal.location}</span>
            </div>
          )}
          {personal.linkedin && (
            <div className="flex items-center space-x-2">
              <Linkedin className="w-4 h-4" />
              <span>{personal.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Sections */}
      <div className={spacing}>
        {/* Professional Summary */}
        {personal.summary && (
          <section>
            <p className="text-gray-700 leading-relaxed text-lg font-light italic">
              "{personal.summary}"
            </p>
          </section>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <section>
            <h3 className={`text-sm font-semibold ${getAccentColor(customization.colorScheme)} uppercase tracking-wider mb-8`}>
              Experience
            </h3>
            
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="mb-3">
                    <h4 className="text-xl font-light text-gray-900 mb-1">{exp.jobTitle}</h4>
                    <p className="text-gray-700 mb-1">{exp.company}</p>
                    <span className="text-sm text-gray-500 font-light">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate || 'Present'}
                    </span>
                  </div>
                  {exp.description && (
                    <div className="text-gray-600 leading-relaxed">
                      {exp.description.split('\n').map((line, index) => (
                        <p key={index} className="mb-2">
                          {line.trim()}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h3 className={`text-sm font-semibold ${getAccentColor(customization.colorScheme)} uppercase tracking-wider mb-8`}>
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="text-xl font-light text-gray-900 mb-1">{edu.degree}</h4>
                  <p className="text-gray-700 mb-1">{edu.institution}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {edu.graduationYear && <span>{edu.graduationYear}</span>}
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h3 className={`text-sm font-semibold ${getAccentColor(customization.colorScheme)} uppercase tracking-wider mb-8`}>
              Skills
            </h3>
            <div className="space-y-6">
              {skills.map((category) => (
                <div key={category.id}>
                  <h4 className="text-lg font-light text-gray-900 mb-2">{category.name}</h4>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="text-gray-600 text-sm border-b border-gray-300 pb-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!personal.fullName && experiences.length === 0 && education.length === 0 && skills.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-2xl mb-4 font-light">Minimal Template</p>
            <p className="text-sm">Clean typography with elegant spacing</p>
          </div>
        )}
      </div>
    </div>
  );
}