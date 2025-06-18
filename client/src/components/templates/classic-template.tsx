import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import type { ResumeData } from "@shared/schema";

interface ClassicTemplateProps {
  resumeData: ResumeData;
}

export default function ClassicTemplate({ resumeData }: ClassicTemplateProps) {
  const { personal, experiences, education, skills, customization } = resumeData;

  const getColorClass = (scheme: string) => {
    switch (scheme) {
      case 'secondary':
        return 'text-secondary border-secondary';
      case 'accent':
        return 'text-accent border-accent';
      case 'success':
        return 'text-success border-success';
      case 'dark':
        return 'text-gray-800 border-gray-800';
      default:
        return 'text-primary border-primary';
    }
  };

  const fontClass = customization.fontFamily === 'poppins' ? 'font-poppins' : 'font-inter';
  const spacing = customization.spacing === 1 ? 'space-y-4' : customization.spacing === 3 ? 'space-y-12' : 'space-y-8';

  return (
    <div className={`h-full bg-white ${fontClass} p-8`}>
      {/* Header Section */}
      <div className="text-center border-b-2 border-gray-300 pb-6 mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">
          {personal.fullName || "Your Name"}
        </h1>
        <h2 className="text-lg text-gray-600 mb-4">
          {personal.title || "Professional Title"}
        </h2>
        
        <div className="flex justify-center space-x-6 text-sm text-gray-700">
          {personal.email && (
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{personal.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Sections */}
      <div className={spacing}>
        {/* Professional Summary */}
        {personal.summary && (
          <section>
            <h3 className={`text-lg font-bold ${getColorClass(customization.colorScheme)} border-b-2 pb-2 mb-4`}>
              OBJECTIVE
            </h3>
            <p className="text-gray-700 leading-relaxed text-justify">{personal.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <section>
            <h3 className={`text-lg font-bold ${getColorClass(customization.colorScheme)} border-b-2 pb-2 mb-4`}>
              PROFESSIONAL EXPERIENCE
            </h3>
            
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{exp.jobTitle}</h4>
                      <p className="text-gray-700 font-semibold">{exp.company}</p>
                      {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate || 'Present'}
                    </span>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 text-sm leading-relaxed">
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
            <h3 className={`text-lg font-bold ${getColorClass(customization.colorScheme)} border-b-2 pb-2 mb-4`}>
              EDUCATION
            </h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                    <p className="text-gray-700 font-medium">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  {edu.graduationYear && (
                    <span className="text-sm text-gray-600 font-medium">
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
            <h3 className={`text-lg font-bold ${getColorClass(customization.colorScheme)} border-b-2 pb-2 mb-4`}>
              SKILLS & COMPETENCIES
            </h3>
            <div className="space-y-3">
              {skills.map((category) => (
                <div key={category.id}>
                  <h4 className="font-semibold text-gray-800 mb-2">{category.name}:</h4>
                  <p className="text-gray-700 text-sm">
                    {category.skills.join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!personal.fullName && experiences.length === 0 && education.length === 0 && skills.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">Classic Resume Template</p>
            <p className="text-sm">Traditional format with clean typography</p>
          </div>
        )}
      </div>
    </div>
  );
}