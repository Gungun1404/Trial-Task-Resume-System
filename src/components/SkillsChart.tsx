import { Skill } from '@/types/resume';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SkillsChartProps {
  skills: Skill[];
}

export const SkillsChart = ({ skills }: SkillsChartProps) => {
  const categories = {
    technical: skills.filter((s) => s.category === 'technical'),
    soft: skills.filter((s) => s.category === 'soft'),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Skills Overview</h2>
        <Badge variant="secondary">
          {skills.filter((s) => s.verified).length} Verified
        </Badge>
      </div>

      {/* Technical Skills */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
          Technical Skills
        </h3>
        <div className="space-y-3">
          {categories.technical.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                  {skill.verified && (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
          Soft Skills
        </h3>
        <div className="space-y-3">
          {categories.soft.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                  {skill.verified && (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-success rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
