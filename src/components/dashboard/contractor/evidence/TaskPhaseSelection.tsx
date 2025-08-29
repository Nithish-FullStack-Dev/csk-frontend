
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CONSTRUCTION_PHASES, ConstructionPhase } from "@/types/construction";
import { TaskData } from "./types";

interface TaskPhaseSelectionProps {
  availableTasks: TaskData[];
  selectedTask: string;
  setSelectedTask: (task: string) => void;
  selectedPhase: string;
  setSelectedPhase: (phase: string) => void;
  disabled: boolean;
}

const TaskPhaseSelection = ({
  availableTasks,
  selectedTask,
  setSelectedTask,
  selectedPhase,
  setSelectedPhase,
  disabled
}: TaskPhaseSelectionProps) => {
  // Update phase when task changes
  useEffect(() => {
    if (selectedTask) {
      const task = availableTasks.find(t => t.id === selectedTask);
      if (task) {
        setSelectedPhase(task.phase);
      }
    }
  }, [selectedTask, availableTasks, setSelectedPhase]);

  // Render either the task selection or phase selection
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="task">Related Task (Optional)</Label>
        <Select value={selectedTask} onValueChange={setSelectedTask} disabled={disabled}>
          <SelectTrigger id="task">
            <SelectValue placeholder={availableTasks.length > 0 ? "Select related task" : "No tasks available"} />
          </SelectTrigger>
          <SelectContent>
            {availableTasks.map(task => (
              <SelectItem key={task.id} value={task.id}>{task.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedTask ? (
        <div className="bg-muted p-3 rounded-md">
          <p className="font-medium">
            {availableTasks.find(t => t.id === selectedTask)?.title}
          </p>
          <p className="text-sm text-muted-foreground">
            Phase: {selectedPhase && CONSTRUCTION_PHASES[selectedPhase as keyof typeof CONSTRUCTION_PHASES]?.title}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="phase">Construction Phase</Label>
          <Select 
            value={selectedPhase} 
            onValueChange={(value) => setSelectedPhase(value)} 
            required={!selectedTask}
          >
            <SelectTrigger id="phase">
              <SelectValue placeholder="Select construction phase" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CONSTRUCTION_PHASES).map(([key, phase]) => (
                <SelectItem key={key} value={key}>{phase.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};

export default TaskPhaseSelection;
