import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Palette, Layout, FileText, Printer } from 'lucide-react';
import { toast } from 'sonner';

export const CustomizationPanel = () => {
  const handleExport = (format: string) => {
    toast.success(`Exporting resume as ${format.toUpperCase()}...`, {
      description: 'Your resume will be ready in a moment.',
    });
  };

  const handlePrint = () => {
    toast.success('Opening print dialog...', {
      description: 'Prepare to print your professional resume.',
    });
  };

  const colorThemes = [
    { name: 'Professional Blue', primary: '#3b82f6', secondary: '#8b5cf6' },
    { name: 'Emerald Green', primary: '#10b981', secondary: '#14b8a6' },
    { name: 'Royal Purple', primary: '#8b5cf6', secondary: '#ec4899' },
    { name: 'Sunset Orange', primary: '#f59e0b', secondary: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Resume
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleExport('pdf')}
            className="w-full"
          >
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport('docx')}
            className="w-full"
          >
            <FileText className="w-4 h-4 mr-2" />
            DOCX
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePrint()}
            className="col-span-2"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </Card>

      {/* Color Themes */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Color Theme
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {colorThemes.map((theme) => (
            <button
              key={theme.name}
              className="p-3 rounded-lg border border-border hover:border-primary transition-all hover:shadow-card"
              onClick={() => {
                toast.success(`Applied ${theme.name} theme`, {
                  description: 'Your resume has been updated.',
                });
              }}
            >
              <div className="flex gap-2 mb-2">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: theme.primary }}
                />
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: theme.secondary }}
                />
              </div>
              <p className="text-xs font-medium text-foreground text-left">
                {theme.name}
              </p>
            </button>
          ))}
        </div>
      </Card>

      {/* Layout Options */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Layout className="w-5 h-5" />
          Layout Style
        </h3>
        <div className="space-y-2">
          {['Modern', 'Classic', 'Minimal'].map((layout) => (
            <Button
              key={layout}
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                toast.success(`Switched to ${layout} layout`, {
                  description: 'Resume layout has been updated.',
                });
              }}
            >
              {layout}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};
