import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/store/resumeStore";
import { Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export const EducationEditor = () => {
  const { resume, addEducation, updateEducation, deleteEducation } = useResumeStore();

  return (
    <div className="space-y-4">
      {resume.education.map((edu) => (
        <Card key={edu.id} className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">Education Entry</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteEducation(edu.id)}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Degree</Label>
              <Input
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                placeholder="Bachelor of Science"
              />
            </div>
            <div>
              <Label>School</Label>
              <Input
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                placeholder="University Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Location</Label>
              <Input
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                placeholder="City, State"
              />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                placeholder="2016"
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                placeholder="2020"
              />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={edu.description}
              onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
              placeholder="Relevant coursework, achievements..."
              rows={2}
            />
          </div>
        </Card>
      ))}

      <Button onClick={addEducation} variant="outline" className="w-full gap-2">
        <Plus className="w-4 h-4" />
        Add Education
      </Button>
    </div>
  );
};
