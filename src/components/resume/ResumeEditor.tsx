import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PersonalInfoEditor } from "./editor/PersonalInfoEditor";
import { ExperienceEditor } from "./editor/ExperienceEditor";
import { EducationEditor } from "./editor/EducationEditor";
import { SkillsEditor } from "./editor/SkillsEditor";
import { ProjectsEditor } from "./editor/ProjectsEditor";
import { useResumeStore } from "@/store/resumeStore";
import { Palette } from "lucide-react";

export const ResumeEditor = () => {
  const { resume, setTemplate } = useResumeStore();

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Resume</h2>
      
      {/* Template Selector */}
      <div className="mb-6 flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
        <Palette className="w-5 h-5 text-primary" />
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">Template Style</label>
          <Select value={resume.template} onValueChange={(value) => setTemplate(value as any)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minimal">Minimal - Clean & Simple</SelectItem>
              <SelectItem value="modern">Modern - Professional Two-Column</SelectItem>
              <SelectItem value="creative">Creative - Bold & Visual</SelectItem>
              <SelectItem value="entry-level">Entry-Level - Student-Friendly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Info</TabsTrigger>
          <TabsTrigger value="experience">Work</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <PersonalInfoEditor />
        </TabsContent>

        <TabsContent value="experience" className="mt-6">
          <ExperienceEditor />
        </TabsContent>

        <TabsContent value="education" className="mt-6">
          <EducationEditor />
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <SkillsEditor />
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <ProjectsEditor />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
