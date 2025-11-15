import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ResumeData } from "@/store/resumeStore";

export const exportToPDF = async (resume: ResumeData): Promise<void> => {
  const element = document.getElementById("resume-preview");
  if (!element) throw new Error("Resume preview element not found");

  // Remove external spacing if any parent containers have them
  const original = element.style.cssText;
  element.style.margin = "0";
  element.style.border = "none";
  element.style.boxShadow = "none"; // avoids faint shadows in PDF

  // Capture exact template
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  // Restore styling
  element.style.cssText = original;

  const imgData = canvas.toDataURL("image/png");

  // PDF same size as template
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height], // EXACT size of card
  });

  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

  const filename = resume.personalInfo.name
    ? `${resume.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`
    : "Resume.pdf";

  pdf.save(filename);
};
