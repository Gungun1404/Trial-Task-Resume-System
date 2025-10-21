import { Card } from '@/components/ui/card';
import { Trophy, Briefcase, BookOpen, Rocket, TrendingUp } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface StatsOverviewProps {
  data: ResumeData;
}

export const StatsOverview = ({ data }: StatsOverviewProps) => {
  const stats = [
    {
      label: 'Hackathons',
      value: data.activities.filter((a) => a.type === 'hackathon').length,
      icon: Trophy,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'Internships',
      value: data.activities.filter((a) => a.type === 'internship').length,
      icon: Briefcase,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Courses',
      value: data.activities.filter((a) => a.type === 'course').length,
      icon: BookOpen,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      label: 'Projects',
      value: data.activities.filter((a) => a.type === 'project').length,
      icon: Rocket,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  const verifiedCount = data.activities.filter((a) => a.status === 'verified').length;
  const totalActivities = data.activities.length;
  const verificationRate = Math.round((verifiedCount / totalActivities) * 100);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="p-4 hover:shadow-hover transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 bg-gradient-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Verification Rate</p>
            <p className="text-3xl font-bold">{verificationRate}%</p>
            <p className="text-sm opacity-75 mt-1">
              {verifiedCount} of {totalActivities} activities verified
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-full">
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>
      </Card>
    </div>
  );
};
