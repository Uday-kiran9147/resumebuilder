import { Card } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { EntryLevelTemplate } from "./templates/EntryLevelTemplate";

export const ResumePreview = () => {
  const { resume } = useResumeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // A4 width in px at 96 DPI is approx 794px
        const targetWidth = 794;
        // Calculate scale to fit container, max 1
        const newScale = Math.min(containerWidth / targetWidth, 1);
        setScale(newScale);

        // Update height based on scaled content
        setHeight(contentRef.current.scrollHeight * newScale);
      }
    };

    // Initial calculation
    updateDimensions();

    // Listen for resize
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (contentRef.current) resizeObserver.observe(contentRef.current);

    window.addEventListener("resize", updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [resume]); // Re-calculate when resume changes

  const renderTemplate = () => {
    switch (resume.template) {
      case "modern":
        return <ModernTemplate data={resume} />;
      case "creative":
        return <CreativeTemplate data={resume} />;
      case "entry-level":
        return <EntryLevelTemplate data={resume} />;
      case "minimal":
      default:
        return <MinimalTemplate data={resume} />;
    }
  };

  return (
    <div ref={containerRef} className="w-full flex justify-center overflow-hidden bg-gray-100/50 rounded-lg border border-border">
      <div
        style={{
          width: 794 * scale,
          height: height,
          position: 'relative',
          transition: 'width 0.2s, height 0.2s'
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <Card
            ref={contentRef}
            className="p-8 bg-white border-0 shadow-lg print:border-0 print:shadow-none w-[794px] min-h-[1123px]"
            id="resume-preview"
          >
            {renderTemplate()}
          </Card>
        </div>
      </div>
    </div>
  );
};
