import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Download, Share2 } from "lucide-react";
import ResumeEditor from "@/components/resume-editor";
import ResumePreview from "@/components/resume-preview";
import { useResumeData } from "@/hooks/use-resume-data";
import { exportToPDF } from "@/lib/pdf-export";
import { useToast } from "@/hooks/use-toast";

export default function ResumeBuilder() {
  const { resumeData, updateResumeData, saveResume, isLoading } = useResumeData();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  
  const handleSave = async () => {
    try {
      await saveResume();
      toast({
        title: "Success",
        description: "Resume saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportPDF = async () => {
    try {
      await exportToPDF(resumeData);
      toast({
        title: "Success",
        description: "PDF exported successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    // TODO: Implement sharing functionality
    toast({
      title: "Coming Soon",
      description: "Sharing functionality will be available soon!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v1.816a3 3 0 00.879 2.122l3.657 3.657a1 1 0 001.414 0l7.07-7.07a1 1 0 000-1.414L11.364 6.464a3 3 0 00-2.122-.879H4zM6 7a1 1 0 100-2 1 1 0 000 2z"/>
                  </svg>
                </div>
                <h1 className="text-xl font-bold font-poppins text-foreground">ResumeBuilder Pro</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                disabled={isLoading}
                className="text-gray-700 hover:text-primary"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                className="text-secondary hover:bg-secondary hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button
                size="sm"
                onClick={handleShare}
                className="bg-primary hover:bg-primary/90"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="resume-editor-grid">
        <ResumeEditor 
          resumeData={resumeData}
          onUpdate={updateResumeData}
          selectedTemplate={selectedTemplate}
          onTemplateChange={setSelectedTemplate}
        />
        <ResumePreview 
          resumeData={resumeData}
          onExportPDF={handleExportPDF}
          selectedTemplate={selectedTemplate}
        />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        <Button
          size="icon"
          onClick={handleSave}
          disabled={isLoading}
          className="floating-action-btn bg-success hover:bg-success/90 text-white"
          title="Auto-save"
        >
          <Save className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          onClick={handleExportPDF}
          className="floating-action-btn bg-secondary hover:bg-secondary/90 text-white"
          title="Export PDF"
        >
          <Download className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
