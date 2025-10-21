import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ResumeData } from '@/types/resume';

interface PersonalInfoEditorProps {
  data: ResumeData['personalInfo'];
  summary: string;
  onUpdate: (data: ResumeData['personalInfo'], summary: string) => void;
}

export const PersonalInfoEditor = ({ data, summary, onUpdate }: PersonalInfoEditorProps) => {
  const handleChange = (field: keyof ResumeData['personalInfo'], value: string) => {
    onUpdate({ ...data, [field]: value }, summary);
  };

  const handleSummaryChange = (value: string) => {
    onUpdate(data, value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="John Doe"
            className="transition-all focus:shadow-elegant"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Software Engineer"
            className="transition-all focus:shadow-elegant"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            className="transition-all focus:shadow-elegant"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="transition-all focus:shadow-elegant"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="transition-all focus:shadow-elegant"
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground">Links</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={data.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/username"
              className="transition-all focus:shadow-elegant"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              value={data.github || ''}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="github.com/username"
              className="transition-all focus:shadow-elegant"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio</Label>
            <Input
              id="portfolio"
              value={data.portfolio || ''}
              onChange={(e) => handleChange('portfolio', e.target.value)}
              placeholder="yoursite.com"
              className="transition-all focus:shadow-elegant"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-border">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => handleSummaryChange(e.target.value)}
          placeholder="Write a brief summary about yourself..."
          className="min-h-32 transition-all focus:shadow-elegant resize-none"
        />
      </div>
    </div>
  );
};
