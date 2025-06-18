import { Mail, Phone, MapPin, Linkedin, Globe, Star } from "lucide-react";
import type { ResumeData } from "@shared/schema";

interface CreativeTemplateProps {
  resumeData: ResumeData;
}

export default function CreativeTemplate({ resumeData }: CreativeTemplateProps) {
  const { personal, experiences, education, skills, customization } = resumeData;

  const getColorClass = (scheme: string) => {
    switch (scheme) {
      case 'secondary':
        return { 
          bg: 'bg-gradient-to-br from-secondary to-secondary/80', 
          text: 'text-secondary',
          accent: 'bg-secondary/20'
        };
      case 'accent':
        return { 
          bg: 'bg-gradient-to-br from-accent to-accent/80', 
          text: 'text-accent',
          accent: 'bg-accent/20'
        };
      case 'success':
        return { 
          bg: 'bg-gradient-to-br from-success to-success/80', 
          text: 'text-success',
          accent: 'bg-success/20'
        };
      case 'dark':
        return { 
          bg: 'bg-gradient-to-br from-gray-800 to-gray-900', 
          text: 'text-gray-800',
          accent: 'bg-gray-100'
        };
      default:
        return { 
          bg: 'bg-gradient-to-br from-primary to-primary/80', 
          text: 'text-primary',
          accent: 'bg-primary/20'
        };
    }
  };

  const colors = getColorClass(customization.colorScheme);
  const fontClass = customization.fontFamily === 'poppins' ? 'font-poppins' : 'font-inter';
  const spacing = customization.spacing === 1 ? 'space-y-3' : customization.spacing === 3 ? 'space-y-8' : 'space-y-5';

  return (
    <div className={`h-full ${fontClass} flex`}>
      {/* Left Sidebar */}
      <div className={`w-1/3 ${colors.bg} text-white p-6`}>
        {/* Personal Info */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {personal.fullName ? personal.fullName.split(' ').map(n => n[0]).join('').slice(0, 2) : 'UN'}
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {personal.fullName || "Your Name"}
          </h1>
          <h2 className="text-lg opacity-90">
            {personal.title || "Professional Title"}
          </h2>
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b border-white/30 pb-2">CONTACT</h3>
          <div className="space-y-3 text-sm">
            {personal.email && (
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="break-all">{personal.email}</span>
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
                <span className="break-all text-xs">{personal.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 border-b border-white/30 pb-2">SKILLS</h3>
            <div className="space-y-4">
              {skills.map((category) => (
                <div key={category.id}>
                  <h4 className="font-medium mb-2 text-sm">{category.name}</h4>
                  <div className="space-y-2">
                    {category.skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{skill}</span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current opacity-80" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8 bg-white">
        <div className={spacing}>
          {/* Professional Summary */}
          {personal.summary && (
            <section>
              <h3 className={`text-xl font-bold ${colors.text} mb-4 relative`}>
                PROFILE
                <div className={`absolute bottom-0 left-0 w-12 h-1 ${colors.accent}`}></div>
              </h3>
              <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {experiences.length > 0 && (
            <section>
              <h3 className={`text-xl font-bold ${colors.text} mb-6 relative`}>
                EXPERIENCE
                <div className={`absolute bottom-0 left-0 w-12 h-1 ${colors.accent}`}></div>
              </h3>
              
              <div className="space-y-6 relative">
                {/* Timeline line */}
                <div className={`absolute left-6 top-0 bottom-0 w-0.5 ${colors.accent}`}></div>
                
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="relative pl-16">
                    {/* Timeline dot */}
                    <div className={`absolute left-4 top-2 w-4 h-4 rounded-full ${colors.bg} border-4 border-white shadow-md`}></div>
                    
                    <div className="mb-2">
                      <h4 className="font-bold text-gray-800 text-lg">{exp.jobTitle}</h4>
                      <p className={`${colors.text} font-semibold`}>{exp.company}</p>
                      <span className="text-sm text-gray-600">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate || 'Present'}
                      </span>
                    </div>
                    {exp.description && (
                      <div className="text-gray-700 text-sm">
                        {exp.description.split('\n').map((line, lineIndex) => (
                          <div key={lineIndex} className="mb-1">
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
              <h3 className={`text-xl font-bold ${colors.text} mb-4 relative`}>
                EDUCATION
                <div className={`absolute bottom-0 left-0 w-12 h-1 ${colors.accent}`}></div>
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className={`p-4 rounded-lg ${colors.accent}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                        <p className={`${colors.text} font-medium`}>{edu.institution}</p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                        )}
                      </div>
                      {edu.graduationYear && (
                        <span className="text-sm text-gray-600 font-medium">
                          {edu.graduationYear}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {!personal.fullName && experiences.length === 0 && education.length === 0 && skills.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">Creative Resume Template</p>
              <p className="text-sm">Modern design with sidebar layout and timeline</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}