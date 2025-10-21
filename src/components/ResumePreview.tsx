import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ResumePreviewProps {
  data: ResumeData;
  className?: string;
}

export const ResumePreview = ({ data, className = '' }: ResumePreviewProps) => {
  const getActivityIcon = (type: string) => {
    const icons = {
      hackathon: '🏆',
      internship: '💼',
      course: '📚',
      project: '🚀',
    };
    return icons[type as keyof typeof icons] || '📋';
  };

  return (
    <div className={`bg-card rounded-lg shadow-card p-8 space-y-6 ${className}`}>
      {/* Header Section */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {data.personalInfo.name}
        </h1>
        <p className="text-lg text-primary font-medium mb-4">
          {data.personalInfo.title}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{data.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{data.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{data.personalInfo.location}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-3 text-sm">
          {data.personalInfo.linkedin && (
            <a href={`https://${data.personalInfo.linkedin}`} className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          )}
          {data.personalInfo.github && (
            <a href={`https://${data.personalInfo.github}`} className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
          {data.personalInfo.portfolio && (
            <a href={`https://${data.personalInfo.portfolio}`} className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <Globe className="w-4 h-4" />
              <span>Portfolio</span>
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
          Professional Summary
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Experience & Activities */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          Experience & Activities
        </h2>
        <div className="space-y-4">
          {data.activities.map((activity) => (
            <div key={activity.id} className="border-l-2 border-primary pl-4 relative">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary" />
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{getActivityIcon(activity.type)}</span>
                    <h3 className="font-semibold text-foreground">{activity.title}</h3>
                    {activity.status === 'verified' && (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    )}
                  </div>
                  <p className="text-sm text-primary font-medium">{activity.organization}</p>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                  {activity.date}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {activity.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {activity.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Technical Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills
            .filter((skill) => skill.category === 'technical')
            .map((skill) => (
              <Badge 
                key={skill.name} 
                variant={skill.verified ? "default" : "outline"}
                className="flex items-center gap-1"
              >
                {skill.name}
                {skill.verified && <CheckCircle2 className="w-3 h-3" />}
              </Badge>
            ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Education
        </h2>
        <div className="space-y-3">
          {data.education.map((edu, index) => (
            <div key={index}>
              <h3 className="font-semibold text-foreground">{edu.degree}</h3>
              <p className="text-sm text-primary">{edu.institution}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <span>{edu.year}</span>
                {edu.gpa && <span>GPA: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
