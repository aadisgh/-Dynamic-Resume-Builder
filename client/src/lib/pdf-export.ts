import type { ResumeData } from "@shared/schema";

declare global {
  interface Window {
    html2pdf?: any;
  }
}

export async function exportToPDF(resumeData: ResumeData): Promise<void> {
  try {
    // Load html2pdf library dynamically
    if (!window.html2pdf) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      document.head.appendChild(script);
      
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    }

    const element = document.getElementById('resume-document');
    if (!element) {
      throw new Error('Resume document not found');
    }

    const filename = `${resumeData.personal.fullName || 'Resume'}_Resume.pdf`;

    const opt = {
      margin: 0,
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };

    // Temporarily remove scale transform for PDF generation
    const originalTransform = element.style.transform;
    element.style.transform = 'none';

    await window.html2pdf().set(opt).from(element).save();

    // Restore original transform
    element.style.transform = originalTransform;

  } catch (error) {
    console.error('PDF export failed:', error);
    throw new Error('Failed to export PDF. Please try again.');
  }
}

// Alternative PDF export using print functionality
export function exportToPDFPrint(resumeData: ResumeData): void {
  const element = document.getElementById('resume-document');
  if (!element) {
    throw new Error('Resume document not found');
  }

  // Create a new window with the resume content
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error('Failed to open print window');
  }

  const styles = Array.from(document.styleSheets)
    .map(styleSheet => {
      try {
        return Array.from(styleSheet.cssRules)
          .map(rule => rule.cssText)
          .join('');
      } catch (e) {
        return '';
      }
    })
    .join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${resumeData.personal.fullName || 'Resume'}</title>
        <style>
          ${styles}
          body { margin: 0; padding: 0; }
          .resume-preview-scale { transform: none !important; }
          @media print {
            body { -webkit-print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        ${element.outerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}
