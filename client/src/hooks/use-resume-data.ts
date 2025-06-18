import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { ResumeData } from "@shared/schema";

const defaultResumeData: ResumeData = {
  personal: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    summary: "",
  },
  experiences: [],
  education: [],
  skills: [],
  customization: {
    colorScheme: "primary",
    fontFamily: "inter",
    spacing: 2,
  },
};

export function useResumeData() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeBuilderData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setResumeData({ ...defaultResumeData, ...parsed });
      } catch (error) {
        console.error("Failed to load saved resume data:", error);
        toast({
          title: "Error",
          description: "Failed to load saved data. Starting fresh.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  // Auto-save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("resumeBuilderData", JSON.stringify(resumeData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [resumeData]);

  const updateResumeData = (updates: Partial<ResumeData>) => {
    setResumeData(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const saveResume = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call to save resume
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      localStorage.setItem("resumeBuilderData", JSON.stringify(resumeData));
      return true;
    } catch (error) {
      console.error("Failed to save resume:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetResume = () => {
    setResumeData(defaultResumeData);
    localStorage.removeItem("resumeBuilderData");
  };

  return {
    resumeData,
    updateResumeData,
    saveResume,
    resetResume,
    isLoading,
  };
}
