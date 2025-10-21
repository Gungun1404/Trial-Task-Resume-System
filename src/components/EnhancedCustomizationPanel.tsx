import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Palette, Layout, FileText, Printer } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/contexts/ThemeContext';
import { Label } from '@/components/ui/label';

export const EnhancedCustomizationPanel = () => {
  const { template, setTemplate } = useTheme();

  const handleExport = (format: string) => {
    toast.success(`Exporting resume as ${format.toUpperCase()}...`, {
      description: 'Your resume will be ready in a moment.',
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const colorThemes = [
    { name: 'Ocean Blue', primary: '#3b82f6', secondary: '#8b5cf6', gradient: 'from-blue-500 to-purple-600' },
    { name: 'Emerald', primary: '#10b981', secondary: '#14b8a6', gradient: 'from-emerald-500 to-teal-500' },
    { name: 'Sunset', primary: '#f59e0b', secondary: '#ef4444', gradient: 'from-amber-500 to-red-500' },
    { name: 'Royal', primary: '#8b5cf6', secondary: '#ec4899', gradient: 'from-purple-600 to-pink-500' },
  ];

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean with gradient accents' },
    { id: 'classic', name: 'Classic', description: 'Traditional professional' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' },
  ];

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Export Options */}
      <Card className="glass p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Resume
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleExport('pdf')}
            className="w-full hover:shadow-elegant transition-all"
          >
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport('docx')}
            className="w-full hover:shadow-elegant transition-all"
          >
            <FileText className="w-4 h-4 mr-2" />
            DOCX
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePrint()}
            className="col-span-2 hover:shadow-elegant transition-all"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </Card>

      {/* Template Selection */}
      <Card className="glass p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Layout className="w-5 h-5" />
          Layout Template
        </h3>
        <div className="space-y-2">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTemplate(t.id as any);
                toast.success(`Applied ${t.name} template`, {
                  description: 'Your resume layout has been updated.',
                });
              }}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left hover:shadow-elegant ${
                template === t.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="font-medium text-foreground">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.description}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Color Themes */}
      <Card className="glass p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Color Theme
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {colorThemes.map((theme) => (
            <button
              key={theme.name}
              className="p-4 rounded-lg border border-border hover:border-primary transition-all hover:shadow-elegant group"
              onClick={() => {
                toast.success(`Applied ${theme.name} theme`, {
                  description: 'Color scheme updated successfully.',
                });
              }}
            >
              <div className={`h-8 rounded-md bg-gradient-to-r ${theme.gradient} mb-3 group-hover:scale-105 transition-transform`} />
              <p className="text-sm font-medium text-foreground text-left">
                {theme.name}
              </p>
            </button>
          ))}
        </div>
      </Card>

      {/* Tips Card */}
      <Card className="glass p-6 border-l-4 border-l-primary">
        <h4 className="font-semibold text-foreground mb-2">💡 Pro Tip</h4>
        <p className="text-sm text-muted-foreground">
          Drag and drop sections in the editor to reorder them. Your changes are reflected in real-time!
        </p>
      </Card>
    </div>
  );
};
