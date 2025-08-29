import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Plus, Search, Filter, RefreshCw, Camera, AlertCircle, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import AddTaskDialog from "./AddTaskDialog";
import UploadEvidenceDialog from "./UploadEvidenceDialog";

// Sample projects data
const projectsData = [
  {
    name: "Riverside Tower",
    units: ["Block A", "Block B", "Block C", "Block D"]
  },
  {
    name: "Valley Heights",
    units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]
  },
  {
    name: "Green Villa",
    units: ["Villa 1", "Villa 2", "Villa 3"]
  }
];

interface Task {
  id: string;
  title: string;
  project: string;
  unit: string;
  phase: string;
  status: 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected';
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  progress?: number;
  hasEvidence?: boolean;
}

const statusColors: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800'
};

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-amber-100 text-amber-800',
  low: 'bg-green-100 text-green-800'
};

const sampleTasks: Task[] = [
  {
    id: 't1',
    title: 'Foundation concrete pouring',
    project: 'Riverside Tower',
    unit: 'Block A',
    phase: 'Groundwork and Foundation',
    status: 'completed',
    deadline: '2025-04-15',
    priority: 'high',
    progress: 100,
    hasEvidence: true
  },
  {
    id: 't2',
    title: 'Structural column formwork',
    project: 'Riverside Tower',
    unit: 'Block B',
    phase: 'Structural Framework',
    status: 'in_progress',
    deadline: '2025-04-20',
    priority: 'high',
    progress: 75,
    hasEvidence: true
  },
  {
    id: 't3',
    title: 'Electrical conduiting - Ground Floor',
    project: 'Valley Heights',
    unit: 'Unit 3',
    phase: 'Electrical Works',
    status: 'pending',
    deadline: '2025-04-25',
    priority: 'medium',
    progress: 0,
    hasEvidence: false
  },
  {
    id: 't4',
    title: 'Wall plastering',
    project: 'Green Villa',
    unit: 'Villa 2',
    phase: 'Masonry Work',
    status: 'approved',
    deadline: '2025-04-10',
    priority: 'medium',
    progress: 100,
    hasEvidence: true
  },
  {
    id: 't5',
    title: 'Roof waterproofing',
    project: 'Valley Heights',
    unit: 'Unit 4',
    phase: 'Roofing',
    status: 'rejected',
    deadline: '2025-04-05',
    priority: 'high',
    progress: 45,
    hasEvidence: true
  }
];

const ContractorTaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [uploadEvidenceOpen, setUploadEvidenceOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  const form = useForm({
    defaultValues: {
      title: '',
      project: '',
      unit: '',
      phase: '',
      priority: 'medium',
      deadline: ''
    }
  });

  const filteredTasks = tasks.filter(task => {
    if (filter !== 'all' && task.status !== filter) {
      return false;
    }
    
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus } 
          : task
      )
    );
    
    const task = tasks.find(t => t.id === taskId);
    
    if (newStatus === 'completed') {
      toast.success(`Task marked as completed`, {
        description: `${task?.title} has been sent for verification by Site In-charge`
      });
    } else {
      toast.success(`Task status updated`, {
        description: `${task?.title} is now ${newStatus.replace('_', ' ')}`
      });
    }
  };

  const handleUploadEvidence = (taskId: string) => {
    setSelectedTaskId(taskId);
    setUploadEvidenceOpen(true);
  };

  const handleEvidenceSubmit = (evidence: any) => {
    console.log("Evidence submitted:", evidence);
    
    if (selectedTaskId) {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === selectedTaskId 
            ? { ...task, hasEvidence: true } 
            : task
        )
      );
    }
    
    setUploadEvidenceOpen(false);
  };

  const taskForEvidence = tasks.map(task => ({
    id: task.id,
    title: task.title,
    project: task.project,
    unit: task.unit,
    phase: task.phase
  }));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Project</DropdownMenuLabel>
              <DropdownMenuItem>Riverside Tower</DropdownMenuItem>
              <DropdownMenuItem>Valley Heights</DropdownMenuItem>
              <DropdownMenuItem>Green Villa</DropdownMenuItem>
              <DropdownMenuItem>Urban Square</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <Dialog open={addTaskOpen} onOpenChange={setAddTaskOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <AddTaskDialog onOpenChange={setAddTaskOpen} />
        </Dialog>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Project / Unit</TableHead>
              <TableHead>Phase</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.project} / {task.unit}</TableCell>
                <TableCell>{task.phase}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[task.status]}>
                    {task.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(task.deadline).toLocaleDateString()}</TableCell>
                <TableCell>{task.progress !== undefined ? `${task.progress}%` : '-'}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={priorityColors[task.priority]}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleUploadEvidence(task.id)}
                      className={task.hasEvidence ? "text-blue-600 hover:text-blue-800" : ""}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Task</DropdownMenuItem>
                        {task.status === 'pending' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(task.id, 'in_progress')}>
                            Mark as In Progress
                          </DropdownMenuItem>
                        )}
                        {(task.status === 'pending' || task.status === 'in_progress') && (
                          <DropdownMenuItem onClick={() => handleStatusChange(task.id, 'completed')}>
                            Mark as Completed
                          </DropdownMenuItem>
                        )}
                        {task.status === 'rejected' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(task.id, 'in_progress')}>
                            Resume Work
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleUploadEvidence(task.id)}>
                          Upload Photos
                        </DropdownMenuItem>
                        {task.status === 'approved' && (
                          <DropdownMenuItem>
                            Generate Invoice
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={uploadEvidenceOpen} onOpenChange={setUploadEvidenceOpen}>
        <UploadEvidenceDialog 
          onOpenChange={setUploadEvidenceOpen} 
          projects={projectsData}
          tasks={taskForEvidence}
          onSubmit={handleEvidenceSubmit}
        />
      </Dialog>
    </div>
  );
};

export default ContractorTaskList;
