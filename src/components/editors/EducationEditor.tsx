import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface EducationEditorProps {
  education: ResumeData['education'];
  onUpdate: (education: ResumeData['education']) => void;
}

export const EducationEditor = ({ education, onUpdate }: EducationEditorProps) => {
  const handleAdd = () => {
    const newEducation = {
      degree: 'Bachelor of Science',
      institution: 'University Name',
      year: '2020 - 2024',
      gpa: '3.5/4.0',
    };
    onUpdate([...education, newEducation]);
  };

  const handleDelete = (index: number) => {
    onUpdate(education.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, field: keyof ResumeData['education'][0], value: string) => {
    onUpdate(
      education.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Manage your education history</p>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      <div className="space-y-3">
        {education.map((edu, index) => (
          <div key={index} className="glass rounded-lg p-4 group hover:shadow-hover transition-all">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-foreground">Education {index + 1}</h4>
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
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => handleUpdate(index, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>

              <div className="space-y-2">
                <Label>Institution</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => handleUpdate(index, 'institution', e.target.value)}
                  placeholder="Stanford University"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    value={edu.year}
                    onChange={(e) => handleUpdate(index, 'year', e.target.value)}
                    placeholder="2020 - 2024"
                  />
                </div>

                <div className="space-y-2">
                  <Label>GPA (Optional)</Label>
                  <Input
                    value={edu.gpa || ''}
                    onChange={(e) => handleUpdate(index, 'gpa', e.target.value)}
                    placeholder="3.9/4.0"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
