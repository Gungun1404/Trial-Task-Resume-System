import { useState } from 'react';
import { Activity } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, X, GripVertical, Trash2 } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ActivityEditorProps {
  activities: Activity[];
  onUpdate: (activities: Activity[]) => void;
}

const SortableActivity = ({ activity, onEdit, onDelete }: { 
  activity: Activity; 
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: activity.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedActivity, setEditedActivity] = useState(activity);
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    onEdit(editedActivity);
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setEditedActivity({
        ...editedActivity,
        skills: [...editedActivity.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setEditedActivity({
      ...editedActivity,
      skills: editedActivity.skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div ref={setNodeRef} style={style} className="glass rounded-lg p-4 mb-3 group hover:shadow-hover transition-all">
      <div className="flex items-start gap-3">
        <button
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab active:cursor-grabbing opacity-50 hover:opacity-100 transition-opacity"
        >
          <GripVertical className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="flex-1">
          {!isEditing ? (
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground">{activity.organization}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onDelete(activity.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
              <div className="flex flex-wrap gap-2">
                {activity.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={editedActivity.title}
                  onChange={(e) => setEditedActivity({ ...editedActivity, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Organization</Label>
                  <Input
                    value={editedActivity.organization}
                    onChange={(e) => setEditedActivity({ ...editedActivity, organization: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    value={editedActivity.date}
                    onChange={(e) => setEditedActivity({ ...editedActivity, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={editedActivity.type}
                  onValueChange={(value) => setEditedActivity({ ...editedActivity, type: value as Activity['type'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={editedActivity.description}
                  onChange={(e) => setEditedActivity({ ...editedActivity, description: e.target.value })}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill..."
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button size="sm" onClick={addSkill}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editedActivity.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="gap-1">
                      {skill}
                      <button onClick={() => removeSkill(idx)}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave} size="sm">Save</Button>
                <Button onClick={() => setIsEditing(false)} size="sm" variant="outline">Cancel</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ActivityEditor = ({ activities, onUpdate }: ActivityEditorProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = activities.findIndex((item) => item.id === active.id);
      const newIndex = activities.findIndex((item) => item.id === over.id);
      onUpdate(arrayMove(activities, oldIndex, newIndex));
    }
  };

  const handleEdit = (editedActivity: Activity) => {
    onUpdate(activities.map((a) => (a.id === editedActivity.id ? editedActivity : a)));
  };

  const handleDelete = (id: string) => {
    onUpdate(activities.filter((a) => a.id !== id));
  };

  const handleAdd = () => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: 'project',
      title: 'New Activity',
      organization: 'Organization Name',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      status: 'in-progress',
      skills: [],
      description: 'Description of the activity...',
    };
    onUpdate([...activities, newActivity]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Drag to reorder activities</p>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Activity
        </Button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={activities} strategy={verticalListSortingStrategy}>
          {activities.map((activity) => (
            <SortableActivity
              key={activity.id}
              activity={activity}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
