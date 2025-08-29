
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface Project {
  id: number;
  name: string;
  progress: number;
  pendingVerifications: number;
  qualityIssues: number;
  nextInspection?: {
    task: string;
    date: string;
  };
  lastUpdated: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Riverside Tower",
    progress: 68,
    pendingVerifications: 3,
    qualityIssues: 1,
    nextInspection: {
      task: "Structural Framework - 5th Floor",
      date: "2025-04-13"
    },
    lastUpdated: "2025-04-10"
  },
  {
    id: 2,
    name: "Valley Heights",
    progress: 42,
    pendingVerifications: 5,
    qualityIssues: 3,
    nextInspection: {
      task: "Foundation Inspection - Block B",
      date: "2025-04-12"
    },
    lastUpdated: "2025-04-09"
  },
  {
    id: 3,
    name: "Green Villa",
    progress: 16,
    pendingVerifications: 0,
    qualityIssues: 1,
    lastUpdated: "2025-04-08"
  }
];

const SiteInchargeProjectsOverview = () => {
  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div key={project.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">{project.name}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Schedule Inspection</DropdownMenuItem>
                <DropdownMenuItem>View Construction Timeline</DropdownMenuItem>
                <DropdownMenuItem>Generate Progress Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <p className="text-muted-foreground">Pending Verifications</p>
              <p className={project.pendingVerifications > 0 ? "font-medium" : ""}>
                {project.pendingVerifications} {project.pendingVerifications === 1 ? 'task' : 'tasks'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Quality Issues</p>
              <p className={project.qualityIssues > 0 ? "text-red-600 font-medium" : ""}>
                {project.qualityIssues} {project.qualityIssues === 1 ? 'issue' : 'issues'}
              </p>
            </div>
          </div>
          
          <div className="mt-4 text-sm">
            {project.nextInspection ? (
              <div>
                <p className="text-muted-foreground">Next Inspection</p>
                <p>{project.nextInspection.task}</p>
                <p className="text-blue-600">
                  {new Date(project.nextInspection.date).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground">Next Inspection</p>
                <p>None scheduled</p>
              </div>
            )}
          </div>
          
          <div className="mt-2 text-xs text-muted-foreground">
            Last updated: {new Date(project.lastUpdated).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SiteInchargeProjectsOverview;
