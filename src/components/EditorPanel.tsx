import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Briefcase, GraduationCap, Code, Award } from 'lucide-react';
import { PersonalInfoEditor } from './editors/PersonalInfoEditor';
import { ActivityEditor } from './editors/ActivityEditor';
import { SkillsEditor } from './editors/SkillsEditor';
import { EducationEditor } from './editors/EducationEditor';

interface EditorPanelProps {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

export const EditorPanel = ({ data, onUpdate }: EditorPanelProps) => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="h-full glass rounded-xl p-6 animate-slide-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Edit Resume</h2>
        <p className="text-sm text-muted-foreground">
          Make changes and watch them update in real-time
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span className="hidden sm:inline">Experience</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">Education</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">Skills</span>
          </TabsTrigger>
        </TabsList>

        <div className="max-h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar">
          <TabsContent value="personal" className="mt-0 animate-fade-in">
            <PersonalInfoEditor
              data={data.personalInfo}
              summary={data.summary}
              onUpdate={(personalInfo, summary) => 
                onUpdate({ ...data, personalInfo, summary })
              }
            />
          </TabsContent>

          <TabsContent value="experience" className="mt-0 animate-fade-in">
            <ActivityEditor
              activities={data.activities}
              onUpdate={(activities) => onUpdate({ ...data, activities })}
            />
          </TabsContent>

          <TabsContent value="education" className="mt-0 animate-fade-in">
            <EducationEditor
              education={data.education}
              onUpdate={(education) => onUpdate({ ...data, education })}
            />
          </TabsContent>

          <TabsContent value="skills" className="mt-0 animate-fade-in">
            <SkillsEditor
              skills={data.skills}
              onUpdate={(skills) => onUpdate({ ...data, skills })}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
