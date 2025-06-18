import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, User, Briefcase, GraduationCap, Settings } from "lucide-react";
import PersonalInfoForm from "./sections/personal-info-form";
import ExperienceForm from "./sections/experience-form";
import EducationForm from "./sections/education-form";
import SkillsForm from "./sections/skills-form";
import type { ResumeData } from "@shared/schema";

interface ResumeEditorProps {
  resumeData: ResumeData;
  onUpdate: (data: Partial<ResumeData>) => void;
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

type Section = 'personal' | 'experience' | 'education' | 'skills';

export default function ResumeEditor({ resumeData, onUpdate, selectedTemplate, onTemplateChange }: ResumeEditorProps) {
  const [activeSection, setActiveSection] = useState<Section>('personal');
  const [collapsed, setCollapsed] = useState(false);

  const sections = [
    { id: 'personal' as const, label: 'Personal', icon: User },
    { id: 'experience' as const, label: 'Experience', icon: Briefcase },
    { id: 'education' as const, label: 'Education', icon: GraduationCap },
    { id: 'skills' as const, label: 'Skills', icon: Settings },
  ];

  const handleTemplateChange = (template: string) => {
    onTemplateChange(template);
  };

  const handleCustomizationChange = (key: string, value: any) => {
    onUpdate({
      customization: {
        ...resumeData.customization,
        [key]: value,
      },
    });
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={resumeData.personal}
            onChange={(personal) => onUpdate({ personal })}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={resumeData.experiences}
            onChange={(experiences) => onUpdate({ experiences })}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(education) => onUpdate({ education })}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(skills) => onUpdate({ skills })}
          />
        );
      default:
        return null;
    }
  };

  if (collapsed) {
    return (
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(false)}
          className="mb-4"
        >
          <ChevronLeft className="w-4 h-4 rotate-180" />
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white border-r border-gray-200 overflow-y-auto">
      {/* Editor Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold font-poppins">Resume Builder</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(true)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Template Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Choose Template</label>
          <Select onValueChange={handleTemplateChange} defaultValue="modern">
            <SelectTrigger>
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern Professional</SelectItem>
              <SelectItem value="classic">Classic Traditional</SelectItem>
              <SelectItem value="creative">Creative Designer</SelectItem>
              <SelectItem value="minimal">Minimal Clean</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="p-6 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-2">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`section-nav-btn ${activeSection === id ? 'active' : ''}`}
            >
              <Icon className="w-4 h-4 mb-1 mx-auto" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Form Content */}
      <div className="p-6">
        {renderActiveSection()}
      </div>

      {/* Customization Panel */}
      <div className="border-t border-gray-200 p-6">
        <h3 className="text-md font-semibold text-gray-800 mb-4">Customization</h3>
        
        {/* Color Scheme */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
          <div className="flex space-x-2">
            {[
              { name: 'primary', color: 'hsl(239, 84%, 67%)' },
              { name: 'secondary', color: 'hsl(266, 85%, 70%)' },
              { name: 'accent', color: 'hsl(186, 94%, 43%)' },
              { name: 'success', color: 'hsl(158, 64%, 52%)' },
              { name: 'dark', color: 'hsl(240, 10%, 11%)' },
            ].map(({ name, color }) => (
              <button
                key={name}
                onClick={() => handleCustomizationChange('colorScheme', name)}
                className={`w-8 h-8 rounded-full border-2 shadow-sm ${
                  resumeData.customization.colorScheme === name
                    ? 'border-gray-800'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        
        {/* Font Family */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
          <Select
            value={resumeData.customization.fontFamily}
            onValueChange={(value) => handleCustomizationChange('fontFamily', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inter">Inter (Modern)</SelectItem>
              <SelectItem value="poppins">Poppins (Friendly)</SelectItem>
              <SelectItem value="roboto">Roboto (Classic)</SelectItem>
              <SelectItem value="opensans">Open Sans (Clean)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Spacing */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Spacing</label>
          <input
            type="range"
            min="1"
            max="3"
            value={resumeData.customization.spacing}
            onChange={(e) => handleCustomizationChange('spacing', Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Compact</span>
            <span>Normal</span>
            <span>Spacious</span>
          </div>
        </div>
      </div>
    </div>
  );
}
