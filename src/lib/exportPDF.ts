import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ResumeData } from "@/store/resumeStore";

export const exportToPDF = async (resume: ResumeData): Promise<void> => {
  const element = document.getElementById("resume-preview");
  if (!element) {
    throw new Error("Resume preview element not found");
  }

  // Capture the element as canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  });

  // Convert to PDF
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  const imgX = (pdfWidth - imgWidth * ratio) / 2;
  const imgY = 0;

  pdf.addImage(
    imgData,
    "PNG",
    imgX,
    imgY,
    imgWidth * ratio,
    imgHeight * ratio
  );

  // Generate filename from name or default
  const filename = resume.personalInfo.name
    ? `${resume.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`
    : "Resume.pdf";

  pdf.save(filename);
};
