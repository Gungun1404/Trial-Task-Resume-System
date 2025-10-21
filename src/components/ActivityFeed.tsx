import { Activity } from '@/types/resume';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, Trophy, Briefcase, BookOpen, Rocket } from 'lucide-react';

interface ActivityFeedProps {
  activities: Activity[];
}

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  const getIcon = (type: Activity['type']) => {
    const icons = {
      hackathon: Trophy,
      internship: Briefcase,
      course: BookOpen,
      project: Rocket,
    };
    const Icon = icons[type];
    return <Icon className="w-5 h-5" />;
  };

  const getStatusColor = (status: Activity['status']) => {
    const colors = {
      verified: 'text-success',
      completed: 'text-primary',
      'in-progress': 'text-accent',
    };
    return colors[status];
  };

  const getStatusIcon = (status: Activity['status']) => {
    if (status === 'verified' || status === 'completed') {
      return <CheckCircle2 className="w-4 h-4" />;
    }
    return <Clock className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">
          Recent Activities
        </h2>
        <Badge variant="secondary" className="animate-pulse-glow">
          Live Updates
        </Badge>
      </div>

      <div className="space-y-3">
        {activities.slice(0, 5).map((activity, index) => (
          <div
            key={activity.id}
            className="bg-gradient-card p-4 rounded-lg border border-border hover:shadow-hover transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                {getIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">
                    {activity.title}
                  </h3>
                  <div className={`flex items-center gap-1 ${getStatusColor(activity.status)}`}>
                    {getStatusIcon(activity.status)}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {activity.organization} • {activity.date}
                </p>
                
                <p className="text-sm text-foreground/80 mb-3 line-clamp-2">
                  {activity.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {activity.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {activity.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{activity.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
