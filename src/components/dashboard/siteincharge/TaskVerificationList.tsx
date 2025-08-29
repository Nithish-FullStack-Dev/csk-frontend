import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, Filter, RefreshCw, Camera, CheckCircle, XCircle, AlertCircle
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog } from "@/components/ui/dialog";
import TaskVerificationDialog from "./TaskVerificationDialog";
import { toast } from "sonner";

interface VerificationTask {
  id: string;
  title: string;
  project: string;
  unit: string;
  contractor: string;
  phase: string;
  submittedDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending_verification' | 'approved' | 'rejected' | 'rework';
}

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-amber-100 text-amber-800',
  low: 'bg-green-100 text-green-800'
};

const statusColors: Record<string, string> = {
  pending_verification: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  rework: 'bg-amber-100 text-amber-800'
};

// Sample tasks awaiting verification (in a real app, this would come from an API)
const sampleVerificationTasks: VerificationTask[] = [
  {
    id: 'v1',
    title: 'Foundation concrete pouring',
    project: 'Riverside Tower',
    unit: 'Block A',
    contractor: 'ABC Construction Ltd.',
    phase: 'Groundwork and Foundation',
    submittedDate: '2025-04-15',
    priority: 'high',
    status: 'pending_verification'
  },
  {
    id: 'v2',
    title: 'Structural column formwork',
    project: 'Riverside Tower',
    unit: 'Block B',
    contractor: 'ABC Construction Ltd.',
    phase: 'Structural Framework',
    submittedDate: '2025-04-15',
    priority: 'high',
    status: 'pending_verification'
  },
  {
    id: 'v3',
    title: 'Wall plastering',
    project: 'Green Villa',
    unit: 'Villa 2',
    contractor: 'XYZ Builders',
    phase: 'Masonry Work',
    submittedDate: '2025-04-10',
    priority: 'medium',
    status: 'approved'
  },
  {
    id: 'v4',
    title: 'Electrical conduiting - First Floor',
    project: 'Valley Heights',
    unit: 'Unit 3',
    contractor: 'PowerTech Systems',
    phase: 'Electrical Works',
    submittedDate: '2025-04-12',
    priority: 'medium',
    status: 'rework'
  },
  {
    id: 'v5',
    title: 'Roof waterproofing',
    project: 'Valley Heights',
    unit: 'Unit 4',
    contractor: 'Top Shelter Inc.',
    phase: 'Roofing',
    submittedDate: '2025-04-05',
    priority: 'high',
    status: 'rejected'
  }
];

const TaskVerificationList = () => {
  const [tasks, setTasks] = useState<VerificationTask[]>(sampleVerificationTasks);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const filteredTasks = tasks.filter(task => {
    // Apply status filter
    if (filter !== 'all' && task.status !== filter) {
      return false;
    }
    
    // Apply project filter
    if (projectFilter && task.project !== projectFilter) {
      return false;
    }
    
    // Apply search query
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleVerify = (taskId: string) => {
    setSelectedTaskId(taskId);
    setVerificationDialogOpen(true);
  };

  const handleQuickAction = (taskId: string, action: 'approve' | 'reject' | 'rework') => {
    // Update task status
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: action === 'approve' 
                ? 'approved' 
                : action === 'reject' 
                ? 'rejected' 
                : 'rework' 
            } 
          : task
      )
    );
    
    // Show notification
    const task = tasks.find(t => t.id === taskId);
    
    if (action === 'approve') {
      toast.success(`Task approved`, {
        description: `${task?.title} has been approved and sent for payment processing`
      });
    } else if (action === 'reject') {
      toast.error(`Task rejected`, {
        description: `${task?.title} has been rejected. Contractor has been notified.`
      });
    } else {
      toast.warning(`Task requires rework`, {
        description: `${task?.title} has been sent back for rework. Contractor has been notified.`
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={projectFilter} onValueChange={setProjectFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Projects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-projects">All Projects</SelectItem>
            <SelectItem value="Riverside Tower">Riverside Tower</SelectItem>
            <SelectItem value="Valley Heights">Valley Heights</SelectItem>
            <SelectItem value="Green Villa">Green Villa</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending_verification">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rework">Rework</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Project / Unit</TableHead>
              <TableHead>Contractor</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No tasks found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{task.project} / {task.unit}</TableCell>
                  <TableCell>{task.contractor}</TableCell>
                  <TableCell>{new Date(task.submittedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[task.status]}>
                      {task.status === 'pending_verification' 
                        ? 'Pending Verification' 
                        : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={priorityColors[task.priority]}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end space-x-1">
                      {task.status === 'pending_verification' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-green-600 hover:text-green-800 hover:bg-green-100"
                            title="Approve"
                            onClick={() => handleQuickAction(task.id, 'approve')}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                            title="Request Rework"
                            onClick={() => handleQuickAction(task.id, 'rework')}
                          >
                            <AlertCircle className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-red-600 hover:text-red-800 hover:bg-red-100"
                            title="Reject"
                            onClick={() => handleQuickAction(task.id, 'reject')}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleVerify(task.id)}
                      >
                        <Camera className="h-4 w-4 mr-1" />
                        {task.status === 'pending_verification' ? 'Verify' : 'View'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={verificationDialogOpen} onOpenChange={setVerificationDialogOpen}>
        <TaskVerificationDialog 
          onOpenChange={setVerificationDialogOpen}
          taskId={selectedTaskId || undefined}
        />
      </Dialog>
    </div>
  );
};

export default TaskVerificationList;
