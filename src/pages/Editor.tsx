import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileJson } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ResumeEditor } from "@/components/resume/ResumeEditor";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { useResumeStore } from "@/store/resumeStore";
import { exportToPDF } from "@/lib/exportPDF";
import { toast } from "@/hooks/use-toast";

const Editor = () => {
  const navigate = useNavigate();
  const { resume, exportToJSON, importFromJSON } = useResumeStore();

  const handleExportPDF = async () => {
    try {
      await exportToPDF(resume);
      toast({
        title: "Success!",
        description: "Your resume has been exported as PDF.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your resume.",
        variant: "destructive",
      });
    }
  };

  const handleExportJSON = () => {
    const json = exportToJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Backup created",
      description: "Your resume has been exported as JSON.",
    });
  };

  const handleImportJSON = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = e.target?.result as string;
            importFromJSON(json);
            toast({
              title: "Import successful",
              description: "Your resume has been restored.",
            });
          } catch (error) {
            toast({
              title: "Import failed",
              description: "Invalid JSON file.",
              variant: "destructive",
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleImportJSON} className="gap-2">
              <FileJson className="w-4 h-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportJSON} className="gap-2">
              <FileJson className="w-4 h-4" />
              Backup
            </Button>
            <Button onClick={handleExportPDF} className="gap-2 bg-primary hover:bg-primary-hover">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Editor */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Editor */}
          <div className="lg:sticky lg:top-24 h-fit">
            <ResumeEditor />
          </div>

          {/* Right: Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
