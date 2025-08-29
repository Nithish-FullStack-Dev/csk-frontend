
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface UpcomingTask {
  id: string;
  title: string;
  project: string;
  unit: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  daysRemaining: number;
}

const upcomingTasks: UpcomingTask[] = [
  {
    id: 'ut1',
    title: 'Structural column formwork',
    project: 'Riverside Tower',
    unit: 'Block B',
    deadline: '2025-04-20',
    priority: 'high',
    daysRemaining: 9
  },
  {
    id: 'ut2',
    title: 'Electrical conduiting - Ground Floor',
    project: 'Valley Heights',
    unit: 'Unit 3',
    deadline: '2025-04-25',
    priority: 'medium',
    daysRemaining: 14
  },
  {
    id: 'ut3',
    title: 'Internal wall plastering',
    project: 'Green Villa',
    unit: 'Villa 3',
    deadline: '2025-04-18',
    priority: 'medium',
    daysRemaining: 7
  },
  {
    id: 'ut4',
    title: 'Site mobilization',
    project: 'Urban Square',
    unit: 'Phase 1',
    deadline: '2025-04-15',
    priority: 'high',
    daysRemaining: 4
  },
  {
    id: 'ut5',
    title: 'Plumbing rough-in',
    project: 'Riverside Tower',
    unit: 'Block A',
    deadline: '2025-04-28',
    priority: 'low',
    daysRemaining: 17
  }
];

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-amber-100 text-amber-800',
  low: 'bg-green-100 text-green-800'
};

const ContractorUpcomingTasks = () => {
  // Sort tasks by days remaining
  const sortedTasks = [...upcomingTasks].sort((a, b) => a.daysRemaining - b.daysRemaining);
  
  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <div key={task.id} className="border rounded-md p-3 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-muted-foreground">{task.project}, {task.unit}</p>
            </div>
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(task.deadline).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className={task.daysRemaining <= 5 ? "text-red-600 font-medium" : ""}>
                {task.daysRemaining} {task.daysRemaining === 1 ? 'day' : 'days'} left
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContractorUpcomingTasks;
