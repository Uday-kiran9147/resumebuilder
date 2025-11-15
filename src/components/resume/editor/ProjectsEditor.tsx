import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/store/resumeStore";
import { Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export const ProjectsEditor = () => {
  const { resume, addProject, updateProject, deleteProject } = useResumeStore();

  return (
    <div className="space-y-4">
      {resume.projects.map((project) => (
        <Card key={project.id} className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">Project Entry</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteProject(project.id)}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>

          <div>
            <Label>Project Name</Label>
            <Input
              value={project.name}
              onChange={(e) => updateProject(project.id, { name: e.target.value })}
              placeholder="My Awesome Project"
            />
          </div>

          <div>
            <Label>URL (optional)</Label>
            <Input
              value={project.url}
              onChange={(e) => updateProject(project.id, { url: e.target.value })}
              placeholder="https://github.com/..."
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, { description: e.target.value })}
              placeholder="Describe the project and your contributions..."
              rows={3}
            />
          </div>
        </Card>
      ))}

      <Button onClick={addProject} variant="outline" className="w-full gap-2">
        <Plus className="w-4 h-4" />
        Add Project
      </Button>
    </div>
  );
};
