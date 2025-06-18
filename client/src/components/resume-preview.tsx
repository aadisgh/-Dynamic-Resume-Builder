import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Smartphone, Monitor, Download } from "lucide-react";
import ModernTemplate from "./templates/modern-template";
import ClassicTemplate from "./templates/classic-template";
import CreativeTemplate from "./templates/creative-template";
import MinimalTemplate from "./templates/minimal-template";
import type { ResumeData } from "@shared/schema";

interface ResumePreviewProps {
  resumeData: ResumeData;
  onExportPDF: () => void;
  selectedTemplate: string;
}

export default function ResumePreview({ resumeData, onExportPDF, selectedTemplate }: ResumePreviewProps) {
  const [zoomLevel, setZoomLevel] = useState(80);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto">
      {/* Preview Controls */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-600">Preview</span>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-600 min-w-[50px] text-center">
              {zoomLevel}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 150}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={previewMode === 'mobile' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setPreviewMode('mobile')}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
          <Button
            variant={previewMode === 'desktop' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setPreviewMode('desktop')}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            onClick={onExportPDF}
            className="bg-success hover:bg-success/90 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Resume Preview Content */}
      <div className="p-8 flex justify-center">
        <div
          id="resume-document"
          className={`bg-white shadow-lg ${
            previewMode === 'mobile' ? 'w-full max-w-sm' : 'w-[210mm] min-h-[297mm]'
          }`}
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
          }}
        >
          {selectedTemplate === 'modern' && <ModernTemplate resumeData={resumeData} />}
          {selectedTemplate === 'classic' && <ClassicTemplate resumeData={resumeData} />}
          {selectedTemplate === 'creative' && <CreativeTemplate resumeData={resumeData} />}
          {selectedTemplate === 'minimal' && <MinimalTemplate resumeData={resumeData} />}
        </div>
      </div>
    </div>
  );
}
