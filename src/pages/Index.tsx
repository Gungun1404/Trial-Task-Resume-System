import { useState } from 'react';
import { ResumePreview } from '@/components/ResumePreview';
import { EditorPanel } from '@/components/EditorPanel';
import { EnhancedCustomizationPanel } from '@/components/EnhancedCustomizationPanel';
import { ThemeToggle } from '@/components/ThemeToggle';
import { mockResumeData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Sparkles, Share2, Eye, Edit3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [resumeData, setResumeData] = useState(mockResumeData);
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
      
      {/* Header */}
      <header className="glass border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-elegant animate-pulse-glow">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">ResumeHub</h1>
                <p className="text-sm text-muted-foreground">Professional Resume Builder</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="hidden md:flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                Live Preview
              </Badge>
              
              <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
                <Button
                  variant={viewMode === 'editor' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('editor')}
                  className="gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  variant={viewMode === 'preview' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('preview')}
                  className="gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Preview</span>
                </Button>
              </div>

              <ThemeToggle />
              
              <Button className="bg-gradient-primary hover:shadow-hover transition-all gap-2">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr,1.5fr,380px] gap-6">
          {/* Left Panel - Editor (Desktop) / Full Width (Mobile) */}
          <div className={`${viewMode === 'preview' ? 'hidden lg:block' : ''} animate-fade-in`}>
            <EditorPanel data={resumeData} onUpdate={setResumeData} />
          </div>

          {/* Center Panel - Live Preview */}
          <div className={`${viewMode === 'editor' ? 'hidden lg:block' : ''} animate-fade-in`} style={{ animationDelay: '100ms' }}>
            <div className="sticky top-24">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Live Preview</h2>
                  <p className="text-sm text-muted-foreground">Changes update in real-time</p>
                </div>
              </div>
              <div className="glass rounded-xl overflow-hidden shadow-elegant">
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </div>

          {/* Right Panel - Customization (Desktop Only) */}
          <div className="hidden lg:block animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="sticky top-24">
              <EnhancedCustomizationPanel />
            </div>
          </div>
        </div>

        {/* Mobile Customization Panel */}
        <div className="lg:hidden mt-6 animate-fade-in">
          <EnhancedCustomizationPanel />
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="glass rounded-xl p-6 hover:shadow-hover transition-all group">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Edit3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Real-Time Editing</h3>
            <p className="text-sm text-muted-foreground">
              See your changes instantly as you edit. No need to refresh or save.
            </p>
          </div>

          <div className="glass rounded-xl p-6 hover:shadow-hover transition-all group">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Smart Templates</h3>
            <p className="text-sm text-muted-foreground">
              Choose from modern, classic, or minimal layouts that adapt to your style.
            </p>
          </div>

          <div className="glass rounded-xl p-6 hover:shadow-hover transition-all group">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Share2 className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Easy Export</h3>
            <p className="text-sm text-muted-foreground">
              Download as PDF or DOCX, or print directly with optimized formatting.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
