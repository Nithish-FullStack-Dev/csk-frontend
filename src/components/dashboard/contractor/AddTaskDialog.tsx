
import { useState, useEffect } from "react";
import { 
  DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CONSTRUCTION_PHASES } from "@/types/construction";
import { toast } from "sonner";
import { DatePicker } from "@/components/ui/date-picker";

interface AddTaskDialogProps {
  onOpenChange: (open: boolean) => void;
}

interface Project {
  id: string;
  name: string;
  units: { id: string; name: string }[];
}

// Sample projects data (in a real app, this would come from an API)
const sampleProjects: Project[] = [
  { 
    id: "p1", 
    name: "Riverside Tower", 
    units: [
      { id: "u1", name: "Block A" },
      { id: "u2", name: "Block B" },
      { id: "u3", name: "Block C" }
    ]
  },
  { 
    id: "p2", 
    name: "Valley Heights", 
    units: [
      { id: "u4", name: "Unit 1" },
      { id: "u5", name: "Unit 2" },
      { id: "u6", name: "Unit 3" }
    ]
  },
  { 
    id: "p3", 
    name: "Green Villa", 
    units: [
      { id: "u7", name: "Villa 1" },
      { id: "u8", name: "Villa 2" }
    ]
  }
];

const AddTaskDialog = ({ onOpenChange }: AddTaskDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [phase, setPhase] = useState("");
  const [priority, setPriority] = useState("medium");
  const [deadline, setDeadline] = useState<Date | undefined>(new Date());
  
  const [availableUnits, setAvailableUnits] = useState<{ id: string; name: string }[]>([]);
  
  // Update available units when project changes
  useEffect(() => {
    if (projectId) {
      const selectedProject = sampleProjects.find(p => p.id === projectId);
      if (selectedProject) {
        setAvailableUnits(selectedProject.units);
        setUnitId(""); // Reset unit selection
      }
    } else {
      setAvailableUnits([]);
      setUnitId("");
    }
  }, [projectId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !description || !projectId || !unitId || !phase || !deadline) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Create task object (in a real app, this would be sent to an API)
    const task = {
      id: `t${Math.floor(Math.random() * 10000)}`,
      title,
      description,
      projectId,
      unitId,
      phase,
      priority,
      deadline: deadline?.toISOString().split('T')[0] || "",
      status: "pending",
      createdAt: new Date().toISOString()
    };
    
    // Show success message and close dialog
    toast.success("Task created successfully", {
      description: `${title} has been added to your task list`
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setProjectId("");
    setUnitId("");
    setPhase("");
    setPriority("medium");
    setDeadline(new Date());
    
    // Close dialog
    onOpenChange(false);
  };

  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Add New Construction Task</DialogTitle>
        <DialogDescription>
          Create a new task for your construction project. Fill in all the details below.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="title">Task Title</Label>
          <Input 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the task details"
            rows={3}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select value={projectId} onValueChange={setProjectId} required>
              <SelectTrigger id="project">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {sampleProjects.map(project => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="unit">Unit/Block</Label>
            <Select value={unitId} onValueChange={setUnitId} disabled={!projectId} required>
              <SelectTrigger id="unit">
                <SelectValue placeholder={projectId ? "Select unit" : "Select project first"} />
              </SelectTrigger>
              <SelectContent>
                {availableUnits.map(unit => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phase">Construction Phase</Label>
            <Select value={phase} onValueChange={setPhase} required>
              <SelectTrigger id="phase">
                <SelectValue placeholder="Select phase" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CONSTRUCTION_PHASES).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Deadline</Label>
          <div className="border rounded-md p-2">
            <DatePicker 
              date={deadline} 
              setDate={setDeadline} 
              showMonthYearDropdowns
            />
          </div>
        </div>
        
        <DialogFooter className="pt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Create Task</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AddTaskDialog;
