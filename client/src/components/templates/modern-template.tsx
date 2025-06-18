import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import type { ResumeData } from "@shared/schema";

interface ModernTemplateProps {
  resumeData: ResumeData;
}

export default function ModernTemplate({ resumeData }: ModernTemplateProps) {
  const { personal, experiences, education, skills, customization } = resumeData;

  const getColorClass = (scheme: string) => {
    switch (scheme) {
      case 'secondary':
        return 'bg-secondary text-secondary-foreground';
      case 'accent':
        return 'bg-accent text-accent-foreground';
      case 'success':
        return 'bg-success text-success-foreground';
      case 'dark':
        return 'bg-gray-800 text-white';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getTextColorClass = (scheme: string) => {
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

  const getBadgeColorClass = (scheme: string, index: number) => {
    const colors = [
      { bg: 'bg-primary/10', text: 'text-primary' },
      { bg: 'bg-secondary/10', text: 'text-secondary' },
      { bg: 'bg-accent/10', text: 'text-accent' },
    ];
    return colors[index % colors.length];
  };

  const fontClass = customization.fontFamily === 'poppins' ? 'font-poppins' : 'font-inter';
  const spacing = customization.spacing === 1 ? 'space-y-4' : customization.spacing === 3 ? 'space-y-12' : 'space-y-8';

  return (
    <div className={`h-full ${fontClass}`}>
      {/* Header Section */}
      <div className={`${getColorClass(customization.colorScheme)} p-8`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {personal.fullName || "Your Name"}
            </h1>
            <h2 className="text-xl font-light opacity-90 mb-4">
              {personal.title || "Professional Title"}
            </h2>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              {personal.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 opacity-80" />
                  <span>{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 opacity-80" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 opacity-80" />
                  <span>{personal.location}</span>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-4 h-4 opacity-80" />
                  <span className="truncate">{personal.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className={`p-8 ${spacing}`}>
        {/* Professional Summary */}
        {personal.summary && (
          <section>
            <h3 className={`text-lg font-semibold ${getTextColorClass(customization.colorScheme)} border-b-2 border-current/20 pb-2 mb-4`}>
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <section>
            <h3 className={`text-lg font-semibold ${getTextColorClass(customization.colorScheme)} border-b-2 border-current/20 pb-2 mb-4`}>
              Work Experience
            </h3>
            
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{exp.jobTitle}</h4>
                      <p className={`${getTextColorClass(customization.colorScheme)} font-medium`}>
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate || 'Present'}
                    </span>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 text-sm">
                      {exp.description.split('\n').map((line, index) => (
                        <div key={index} className="mb-1">
                          {line.trim()}
                        </div>
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
            <h3 className={`text-lg font-semibold ${getTextColorClass(customization.colorScheme)} border-b-2 border-current/20 pb-2 mb-4`}>
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                    <p className={`${getTextColorClass(customization.colorScheme)} font-medium`}>
                      {edu.institution}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  {edu.graduationYear && (
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {edu.graduationYear}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h3 className={`text-lg font-semibold ${getTextColorClass(customization.colorScheme)} border-b-2 border-current/20 pb-2 mb-4`}>
              Skills & Technologies
            </h3>
            <div className="space-y-3">
              {skills.map((category, categoryIndex) => (
                <div key={category.id}>
                  <h4 className="font-medium text-gray-800 mb-2">{category.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => {
                      const colorClass = getBadgeColorClass(customization.colorScheme, categoryIndex);
                      return (
                        <span
                          key={skillIndex}
                          className={`px-3 py-1 ${colorClass.bg} ${colorClass.text} text-sm rounded-full`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!personal.fullName && experiences.length === 0 && education.length === 0 && skills.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">Your resume preview will appear here</p>
            <p className="text-sm">Start by filling out your personal information</p>
          </div>
        )}
      </div>
    </div>
  );
}
