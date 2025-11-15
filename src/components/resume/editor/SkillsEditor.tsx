import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/store/resumeStore";
import { Plus, Trash2, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const SkillsEditor = () => {
  const { resume, addSkill, updateSkill, deleteSkill } = useResumeStore();
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({});

  const addSkillItem = (skillId: string) => {
    const skill = resume.skills.find((s) => s.id === skillId);
    if (skill && newSkillInputs[skillId]?.trim()) {
      updateSkill(skillId, {
        items: [...skill.items, newSkillInputs[skillId].trim()],
      });
      setNewSkillInputs({ ...newSkillInputs, [skillId]: "" });
    }
  };

  const removeSkillItem = (skillId: string, itemIndex: number) => {
    const skill = resume.skills.find((s) => s.id === skillId);
    if (skill) {
      updateSkill(skillId, {
        items: skill.items.filter((_, i) => i !== itemIndex),
      });
    }
  };

  return (
    <div className="space-y-4">
      {resume.skills.map((skill) => (
        <Card key={skill.id} className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">Skill Category</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteSkill(skill.id)}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>

          <div>
            <Label>Category Name</Label>
            <Input
              value={skill.category}
              onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
              placeholder="e.g., Programming Languages"
            />
          </div>

          <div>
            <Label>Skills</Label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {skill.items.map((item, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {item}
                  <button onClick={() => removeSkillItem(skill.id, index)}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSkillInputs[skill.id] || ""}
                onChange={(e) =>
                  setNewSkillInputs({ ...newSkillInputs, [skill.id]: e.target.value })
                }
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkillItem(skill.id);
                  }
                }}
                placeholder="Add a skill..."
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => addSkillItem(skill.id)}
              >
                Add
              </Button>
            </div>
          </div>
        </Card>
      ))}

      <Button onClick={addSkill} variant="outline" className="w-full gap-2">
        <Plus className="w-4 h-4" />
        Add Skill Category
      </Button>
    </div>
  );
};
