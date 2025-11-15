import { Card } from "@/components/ui/card";
import { useResumeStore } from "@/store/resumeStore";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { EntryLevelTemplate } from "./templates/EntryLevelTemplate";

export const ResumePreview = () => {
  const { resume } = useResumeStore();

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
    <Card className="p-8 bg-white" id="resume-preview">
      {renderTemplate()}
    </Card>
  );
};
