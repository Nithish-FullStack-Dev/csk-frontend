
import { useState, useEffect } from "react";
import { 
  DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import ProjectUnitSelection from "./evidence/ProjectUnitSelection";
import TaskPhaseSelection from "./evidence/TaskPhaseSelection";
import PhotoUploader from "./evidence/PhotoUploader";
import StatusSelector from "./evidence/StatusSelector";
import { defaultProjects, defaultTasks, ProjectData, TaskData, PhotoEvidence } from "./evidence/types";

interface UploadEvidenceDialogProps {
  onOpenChange: (open: boolean) => void;
  projects?: ProjectData[];
  tasks?: TaskData[];
  onSubmit?: (evidence: PhotoEvidence) => void;
}

const UploadEvidenceDialog = ({ 
  onOpenChange, 
  projects = defaultProjects, 
  tasks = defaultTasks, 
  onSubmit = () => {} 
}: UploadEvidenceDialogProps) => {
  const [title, setTitle] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [notes, setNotes] = useState("");
  const [progressPercent, setProgressPercent] = useState("50");
  const [status, setStatus] = useState<"in_progress" | "completed" | "pending_review">("in_progress");
  const [photos, setPhotos] = useState<File[]>([]);
  const [availableTasks, setAvailableTasks] = useState<TaskData[]>([]);
  const [selectedPhase, setSelectedPhase] = useState<string>("");
  const [photoCaptions, setPhotoCaptions] = useState<string[]>([]);
  
  // Update available tasks when project and unit change
  useEffect(() => {
    if (selectedProject && selectedUnit) {
      const filteredTasks = tasks.filter(t => 
        t.project === selectedProject && t.unit === selectedUnit
      );
      setAvailableTasks(filteredTasks);
      
      if (filteredTasks.length > 0) {
        // Auto select the first task if there's only one
        if (filteredTasks.length === 1) {
          setSelectedTask(filteredTasks[0].id);
          setSelectedPhase(filteredTasks[0].phase);
        } else {
          setSelectedTask("");
        }
      } else {
        setSelectedTask("");
        setSelectedPhase("");
      }
    } else {
      setAvailableTasks([]);
      setSelectedTask("");
      setSelectedPhase("");
    }
  }, [selectedProject, selectedUnit, tasks]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!selectedProject) {
      toast.error("Please select a project");
      return;
    }
    
    if (!selectedUnit) {
      toast.error("Please select a unit/block");
      return;
    }
    
    if (!title) {
      toast.error("Please enter a title for the evidence");
      return;
    }
    
    if (photos.length === 0) {
      toast.error("Please upload at least one photo");
      return;
    }
    
    // In a real app, we would upload the photos to storage
    // For now, create local URLs for the photos
    const photoUrls = photos.map((photo, index) => ({
      url: URL.createObjectURL(photo),
      caption: photoCaptions[index] || `Photo ${index + 1}`
    }));
    
    // Create new evidence object
    const newEvidence: PhotoEvidence = {
      id: `pe${Date.now()}`,
      title,
      project: selectedProject,
      unit: selectedUnit,
      task: selectedTask 
        ? tasks.find(t => t.id === selectedTask)?.title || ""
        : "",
      date: new Date().toISOString().split('T')[0],
      category: selectedPhase || "other",
      status,
      images: photoUrls
    };
    
    // Call the onSubmit handler with the new evidence
    onSubmit(newEvidence);
    
    // Show success message
    toast.success("Evidence uploaded successfully", {
      description: status === "completed" 
        ? "Task has been marked as completed and sent for verification"
        : "Task progress has been updated"
    });
    
    // Reset form
    setTitle("");
    setSelectedProject("");
    setSelectedUnit("");
    setSelectedTask("");
    setNotes("");
    setProgressPercent("50");
    setStatus("in_progress");
    setPhotos([]);
    setPhotoCaptions([]);
    
    // Close the dialog
    onOpenChange(false);
  };

  return (
    <DialogContent className="sm:max-w-[650px]">
      <DialogHeader>
        <DialogTitle>Upload Task Evidence</DialogTitle>
        <DialogDescription>
          Upload photos showing task progress or completion. Select the project, unit, and provide details.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 pt-4">
        <ProjectUnitSelection 
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          selectedUnit={selectedUnit}
          setSelectedUnit={setSelectedUnit}
        />

        <div className="space-y-2">
          <Label htmlFor="title">Evidence Title</Label>
          <Input 
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for this evidence"
            required
          />
        </div>
        
        <TaskPhaseSelection 
          availableTasks={availableTasks}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          selectedPhase={selectedPhase}
          setSelectedPhase={setSelectedPhase}
          disabled={!selectedUnit}
        />
        
        <StatusSelector 
          status={status}
          setStatus={setStatus}
          progressPercent={progressPercent}
          setProgressPercent={setProgressPercent}
        />
        
        <PhotoUploader 
          photos={photos}
          setPhotos={setPhotos}
          photoCaptions={photoCaptions}
          setPhotoCaptions={setPhotoCaptions}
        />
        
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea 
            id="notes" 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any relevant details or comments"
            rows={3}
          />
        </div>
        
        <DialogFooter className="pt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Submit Evidence</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default UploadEvidenceDialog;
