
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface Project {
  id: number;
  name: string;
  progress: number;
  units: number;
  completedUnits: number;
  tasks: number;
  completedTasks: number;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Riverside Tower",
    progress: 68,
    units: 12,
    completedUnits: 8,
    tasks: 86,
    completedTasks: 59,
    priority: 'high',
    deadline: "2025-05-15"
  },
  {
    id: 2,
    name: "Valley Heights",
    progress: 42,
    units: 8,
    completedUnits: 3,
    tasks: 62,
    completedTasks: 26,
    priority: 'medium',
    deadline: "2025-07-22"
  },
  {
    id: 3,
    name: "Green Villa",
    progress: 16,
    units: 5,
    completedUnits: 0,
    tasks: 45,
    completedTasks: 7,
    priority: 'medium',
    deadline: "2025-09-10"
  },
  {
    id: 4,
    name: "Urban Square",
    progress: 5,
    units: 10,
    completedUnits: 0,
    tasks: 78,
    completedTasks: 4,
    priority: 'low',
    deadline: "2025-11-30"
  }
];

const priorityColors = {
  high: 'text-red-500 bg-red-50',
  medium: 'text-amber-500 bg-amber-50',
  low: 'text-green-500 bg-green-50'
};

const ContractorProjectsOverview = () => {
  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div key={project.id} className="border rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{project.name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[project.priority]}`}>
              {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
            </span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
            <span>{project.progress}% Complete</span>
          </div>
          <Progress value={project.progress} className="h-2" />
          <div className="grid grid-cols-2 gap-4 text-sm pt-2">
            <div>
              <p className="text-muted-foreground">Units</p>
              <p>{project.completedUnits} of {project.units} completed</p>
            </div>
            <div>
              <p className="text-muted-foreground">Tasks</p>
              <p>{project.completedTasks} of {project.tasks} completed</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContractorProjectsOverview;
