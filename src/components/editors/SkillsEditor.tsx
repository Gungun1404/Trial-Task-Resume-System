import { useState } from 'react';
import { Skill } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SkillsEditorProps {
  skills: Skill[];
  onUpdate: (skills: Skill[]) => void;
}

export const SkillsEditor = ({ skills, onUpdate }: SkillsEditorProps) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<Skill['category']>('technical');

  const handleAdd = () => {
    if (newSkillName.trim()) {
      const newSkill: Skill = {
        name: newSkillName.trim(),
        level: 50,
        verified: false,
        category: newSkillCategory,
      };
      onUpdate([...skills, newSkill]);
      setNewSkillName('');
    }
  };

  const handleDelete = (index: number) => {
    onUpdate(skills.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, updates: Partial<Skill>) => {
    onUpdate(skills.map((skill, i) => (i === index ? { ...skill, ...updates } : skill)));
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-lg p-4">
        <Label className="mb-3 block">Add New Skill</Label>
        <div className="flex gap-2">
          <Input
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="Skill name..."
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            className="flex-1"
          />
          <Select
            value={newSkillCategory}
            onValueChange={(value) => setNewSkillCategory(value as Skill['category'])}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="soft">Soft Skill</SelectItem>
              <SelectItem value="language">Language</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAdd} size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={index} className="glass rounded-lg p-4 group hover:shadow-hover transition-all">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Input
                      value={skill.name}
                      onChange={(e) => handleUpdate(index, { name: e.target.value })}
                      className="font-medium w-auto min-w-[150px]"
                    />
                    <button
                      onClick={() => handleUpdate(index, { verified: !skill.verified })}
                      className="transition-colors"
                    >
                      <CheckCircle2
                        className={`w-5 h-5 ${
                          skill.verified ? 'text-success' : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <Label>Proficiency</Label>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Slider
                    value={[skill.level]}
                    onValueChange={(value) => handleUpdate(index, { level: value[0] })}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <Select
                  value={skill.category}
                  onValueChange={(value) => handleUpdate(index, { category: value as Skill['category'] })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="soft">Soft Skill</SelectItem>
                    <SelectItem value="language">Language</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
