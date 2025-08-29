
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Search, Plus, BadgeIndianRupee, Users, CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Define interface for labor team
interface LaborTeam {
  id: string;
  name: string;
  supervisor: string;
  type: string;
  members: number;
  wage: number;
  project: string;
  attendance: number;
  contact: string;
  status: string;
  remarks?: string;
}

// Sample labor team data
const initialTeams: LaborTeam[] = [
  {
    id: "1",
    name: "Masonry Team A",
    supervisor: "Rajesh Kumar",
    type: "Masonry",
    members: 12,
    wage: 850,
    project: "Skyline Towers Construction",
    attendance: 95,
    contact: "9876543210",
    status: "Active",
  },
  {
    id: "2",
    name: "Electrical Crew",
    supervisor: "Suresh Patel",
    type: "Electrical",
    members: 8,
    wage: 950,
    project: "Green Valley Villas Phase 1",
    attendance: 88,
    contact: "9876543211",
    status: "Active",
  },
  {
    id: "3",
    name: "Plumbing Team",
    supervisor: "Mahesh Sharma",
    type: "Plumbing",
    members: 6,
    wage: 900,
    project: "Skyline Towers Construction",
    attendance: 92,
    contact: "9876543212",
    status: "Active",
  },
  {
    id: "4",
    name: "Carpentry Crew",
    supervisor: "Dinesh Singh",
    type: "Carpentry",
    members: 7,
    wage: 925,
    project: "Green Valley Villas Phase 1",
    attendance: 85,
    contact: "9876543213",
    status: "Inactive",
  },
  {
    id: "5",
    name: "Painting Team B",
    supervisor: "Ramesh Verma",
    type: "Painting",
    members: 10,
    wage: 800,
    project: "Skyline Towers Construction",
    attendance: 90,
    contact: "9876543214",
    status: "Active",
  },
];

// Form schema
const laborTeamSchema = z.object({
  name: z.string().min(2, "Team name is required"),
  supervisor: z.string().min(2, "Supervisor name is required"),
  type: z.string().min(1, "Team type is required"),
  members: z.coerce.number().int().positive("Number of members must be positive"),
  wage: z.coerce.number().positive("Daily wage must be positive"),
  project: z.string().min(2, "Project is required"),
  contact: z.string().min(10, "Valid contact number is required").max(15),
  remarks: z.string().optional(),
});

type LaborTeamFormValues = z.infer<typeof laborTeamSchema>;

// Sample attendance data
const attendanceData = [
  { id: "1", date: "2023-06-01", present: 47, absent: 5 },
  { id: "2", date: "2023-06-02", present: 49, absent: 3 },
  { id: "3", date: "2023-06-03", present: 46, absent: 6 },
  { id: "4", date: "2023-06-04", present: 50, absent: 2 },
  { id: "5", date: "2023-06-05", present: 48, absent: 4 },
  { id: "6", date: "2023-06-06", present: 45, absent: 7 },
  { id: "7", date: "2023-06-07", present: 49, absent: 3 },
];

const ContractorLabor = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState<LaborTeam[]>(initialTeams);
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewTeamDialogOpen, setViewTeamDialogOpen] = useState(false);
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<LaborTeam | null>(null);

  const form = useForm<LaborTeamFormValues>({
    resolver: zodResolver(laborTeamSchema),
    defaultValues: {
      type: "Masonry",
      members: 1,
      wage: 800,
      project: "Skyline Towers Construction",
    },
  });

  // Sample project list
  const projects = [
    "Skyline Towers Construction",
    "Green Valley Villas Phase 1",
    "Riverside Apartments Foundation",
  ];

  const handleSubmit = (data: LaborTeamFormValues) => {
    // Create new team entry with all required fields
    const newTeam: LaborTeam = {
      id: (teams.length + 1).toString(),
      name: data.name,
      supervisor: data.supervisor,
      type: data.type,
      members: data.members,
      wage: data.wage,
      project: data.project,
      contact: data.contact,
      status: "Active",
      attendance: 100, // Default attendance for new team
      remarks: data.remarks
    };
    
    setTeams([...teams, newTeam]);
    toast.success("Labor team added successfully");
    form.reset();
    setAddDialogOpen(false);
  };

  const viewTeam = (team: LaborTeam) => {
    setSelectedTeam(team);
    setViewTeamDialogOpen(true);
  };

  const viewAttendance = (team: LaborTeam) => {
    setSelectedTeam(team);
    setAttendanceDialogOpen(true);
  };

  // Filter teams based on search
  const filteredTeams = teams.filter((team) => {
    return (
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.supervisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Calculate statistics
  const totalTeams = teams.length;
  const activeTeams = teams.filter(team => team.status === "Active").length;
  const totalWorkers = teams.reduce((acc, team) => acc + team.members, 0);
  const averageAttendance = teams.reduce((acc, team) => acc + team.attendance, 0) / teams.length;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{totalTeams}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeTeams} active, {totalTeams - activeTeams} inactive
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWorkers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {totalTeams} teams
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageAttendance.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teams, supervisors, projects..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Labor Team
        </Button>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team Name</TableHead>
              <TableHead>Supervisor</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Workers</TableHead>
              <TableHead>Daily Wage (₹)</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No labor teams found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTeams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell>{team.supervisor}</TableCell>
                  <TableCell>{team.type}</TableCell>
                  <TableCell>{team.members}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                      {team.wage}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate" title={team.project}>
                    {team.project}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      team.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {team.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewTeam(team)}
                      >
                        Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewAttendance(team)}
                      >
                        Attendance
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Labor Team Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Labor Team</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter team name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supervisor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supervisor Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter supervisor name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select team type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Masonry">Masonry</SelectItem>
                          <SelectItem value="Electrical">Electrical</SelectItem>
                          <SelectItem value="Plumbing">Plumbing</SelectItem>
                          <SelectItem value="Carpentry">Carpentry</SelectItem>
                          <SelectItem value="Painting">Painting</SelectItem>
                          <SelectItem value="Flooring">Flooring</SelectItem>
                          <SelectItem value="Welding">Welding</SelectItem>
                          <SelectItem value="General">General Labor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="members"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Workers</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" placeholder="10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="wage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Wage (₹)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <BadgeIndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" type="number" placeholder="800" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="project"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projects.map((project) => (
                            <SelectItem key={project} value={project}>
                              {project}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Any additional information"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Team</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Team Dialog */}
      {selectedTeam && (
        <Dialog open={viewTeamDialogOpen} onOpenChange={setViewTeamDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Team Details</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Team Name</h4>
                  <p className="text-base font-medium">{selectedTeam.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Supervisor</h4>
                  <p className="text-base">{selectedTeam.supervisor}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Team Type</h4>
                  <p className="text-base">{selectedTeam.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Number of Workers</h4>
                  <p className="text-base">{selectedTeam.members}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Daily Wage</h4>
                  <p className="text-base flex items-center">
                    <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                    {selectedTeam.wage} per worker
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Daily Cost</h4>
                  <p className="text-base flex items-center">
                    <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                    {(selectedTeam.wage * selectedTeam.members).toLocaleString()} total
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Project</h4>
                  <p className="text-base">{selectedTeam.project}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Contact Number</h4>
                  <p className="text-base">{selectedTeam.contact}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Average Attendance</h4>
                  <p className="text-base">{selectedTeam.attendance}%</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <p className={`inline-block px-2 py-1 rounded-full text-xs ${
                    selectedTeam.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {selectedTeam.status}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setViewTeamDialogOpen(false);
                    setAttendanceDialogOpen(true);
                  }}
                >
                  <CalendarClock className="mr-2 h-4 w-4" />
                  View Attendance
                </Button>
                <Button
                  type="button"
                  onClick={() => setViewTeamDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Attendance Dialog */}
      {selectedTeam && (
        <Dialog open={attendanceDialogOpen} onOpenChange={setAttendanceDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Attendance Record - {selectedTeam.name}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Supervisor: {selectedTeam.supervisor}</p>
                  <p className="text-sm text-muted-foreground">Total Workers: {selectedTeam.members}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Attendance: {selectedTeam.attendance}%</p>
                </div>
              </div>
              
              <div className="border rounded-md overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Daily Cost (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map((record) => {
                      const percentage = Math.round((record.present / (record.present + record.absent)) * 100);
                      const dailyCost = record.present * selectedTeam.wage;
                      
                      return (
                        <TableRow key={record.id}>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.present}</TableCell>
                          <TableCell>{record.absent}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                                <div 
                                  className="h-2 bg-green-500 rounded-full" 
                                  style={{width: `${percentage}%`}}
                                />
                              </div>
                              {percentage}%
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                              {dailyCost.toLocaleString()}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              <div className="space-y-4 pt-2">
                <h3 className="text-base font-medium">Record Attendance for Today</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="attendance-date">Date</Label>
                    <Input id="attendance-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attendance-present">Present</Label>
                    <Input id="attendance-present" type="number" defaultValue={selectedTeam.members} min="0" max={selectedTeam.members} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attendance-absent">Absent</Label>
                    <Input id="attendance-absent" type="number" defaultValue="0" min="0" max={selectedTeam.members} />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button onClick={() => {
                    toast.success("Attendance recorded successfully");
                    setAttendanceDialogOpen(false);
                  }}>
                    Save Attendance
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ContractorLabor;
