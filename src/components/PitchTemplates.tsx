
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, Plus, Trash2, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PitchTemplate {
  id: string;
  title: string;
  content: string;
}

export const PitchTemplates = () => {
  const [templates, setTemplates] = useState<PitchTemplate[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const savedTemplates = localStorage.getItem('journoscoop-templates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    } else {
      // Add default template
      const defaultTemplate: PitchTemplate = {
        id: '1',
        title: 'General Introduction',
        content: 'Hi [Name], I saw your #journorequest about [topic]. I\'d love to contribute — I\'m the founder of [Company] and we\'ve done [relevant hook]. Let me know if helpful!'
      };
      setTemplates([defaultTemplate]);
      localStorage.setItem('journoscoop-templates', JSON.stringify([defaultTemplate]));
    }
  }, []);

  const saveTemplates = (updatedTemplates: PitchTemplate[]) => {
    setTemplates(updatedTemplates);
    localStorage.setItem('journoscoop-templates', JSON.stringify(updatedTemplates));
  };

  const addTemplate = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both title and content for your template.",
        variant: "destructive"
      });
      return;
    }

    if (templates.length >= 3) {
      toast({
        title: "Template limit reached",
        description: "You can only save up to 3 pitch templates. Please delete one first.",
        variant: "destructive"
      });
      return;
    }

    const newTemplate: PitchTemplate = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      content: newContent.trim()
    };

    const updatedTemplates = [...templates, newTemplate];
    saveTemplates(updatedTemplates);
    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
    
    toast({
      title: "Template saved!",
      description: `"${newTemplate.title}" has been added to your templates.`
    });
  };

  const updateTemplate = (id: string) => {
    if (!newTitle.trim() || !newContent.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both title and content for your template.",
        variant: "destructive"
      });
      return;
    }

    const updatedTemplates = templates.map(t => 
      t.id === id ? { ...t, title: newTitle.trim(), content: newContent.trim() } : t
    );
    saveTemplates(updatedTemplates);
    setEditingId(null);
    setNewTitle('');
    setNewContent('');
    
    toast({
      title: "Template updated!",
      description: "Your template has been successfully updated."
    });
  };

  const deleteTemplate = (id: string) => {
    const updatedTemplates = templates.filter(t => t.id !== id);
    saveTemplates(updatedTemplates);
    
    toast({
      title: "Template deleted",
      description: "The pitch template has been removed."
    });
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Template copied to clipboard."
    });
  };

  const startEditing = (template: PitchTemplate) => {
    setEditingId(template.id);
    setNewTitle(template.title);
    setNewContent(template.content);
    setIsAdding(false);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setIsAdding(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Pitch Templates
          </CardTitle>
          {templates.length < 3 && !isAdding && !editingId && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAdding(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="text-xs text-gray-500">
          {templates.length}/3 templates saved
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {(isAdding || editingId) && (
          <div className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700/50 space-y-3">
            <input
              type="text"
              placeholder="Template title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            <Textarea
              placeholder="Your pitch template here..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={editingId ? () => updateTemplate(editingId) : addTemplate}
              >
                {editingId ? 'Update' : 'Save'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={cancelEditing}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {templates.map((template) => (
          <div key={template.id} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                {template.title}
              </h4>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing(template)}
                  className="h-8 w-8 p-0"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTemplate(template.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
              {template.content}
            </p>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(template.content)}
              className="w-full"
            >
              <Copy className="h-3 w-3 mr-2" />
              Copy Template
            </Button>
          </div>
        ))}

        {templates.length === 0 && !isAdding && (
          <p className="text-sm text-gray-500 text-center py-4">
            No pitch templates yet. Create your first template!
          </p>
        )}
      </CardContent>
    </Card>
  );
};
