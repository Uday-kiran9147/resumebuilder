import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ResumeData } from "@/store/resumeStore";

export const exportToPDF = async (resume: ResumeData): Promise<void> => {
  const element = document.getElementById("resume-preview");
  if (!element) throw new Error("Resume preview element not found");

  // Create a clone of the element
  const clone = element.cloneNode(true) as HTMLElement;

  // Create a container for the clone to ensure consistent rendering
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "-9999px";
  container.style.left = "-9999px";
  // Force A4 width (approx 794px at 96 DPI)
  container.style.width = "794px"; 
  container.appendChild(clone);
  document.body.appendChild(container);

  // Apply styles to the clone to ensure it looks right
  clone.style.margin = "0";
  clone.style.border = "none";
  clone.style.boxShadow = "none";
  clone.style.width = "100%"; // Fill the container
  clone.style.height = "auto";
  
  // Wait for any images to load (optional but good practice)
  await new Promise((resolve) => setTimeout(resolve, 100));

  try {
    // Capture the clone
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: 794, // Force window width for media queries
    });

    const imgData = canvas.toDataURL("image/png");

    // PDF setup
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add image to PDF, scaling to fit width
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);

    const filename = resume.personalInfo.name
      ? `${resume.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`
      : "Resume.pdf";

    pdf.save(filename);
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
};
