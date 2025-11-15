import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/store/resumeStore";
import { Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export const ExperienceEditor = () => {
  const { resume, addExperience, updateExperience, deleteExperience } = useResumeStore();

  return (
    <div className="space-y-4">
      {resume.experience.map((exp) => (
        <Card key={exp.id} className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">Experience Entry</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteExperience(exp.id)}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Job Title</Label>
              <Input
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <Label>Company</Label>
              <Input
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                placeholder="Tech Corp"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Location</Label>
              <Input
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                placeholder="Remote"
              />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                placeholder="Jan 2020"
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                placeholder="Present"
              />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
            />
          </div>
        </Card>
      ))}

      <Button onClick={addExperience} variant="outline" className="w-full gap-2">
        <Plus className="w-4 h-4" />
        Add Experience
      </Button>
    </div>
  );
};
