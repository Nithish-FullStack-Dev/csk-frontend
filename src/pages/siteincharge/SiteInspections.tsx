
import React, { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Grid3X3 } from "lucide-react";
import { 
  Camera, Search, Calendar, MoreHorizontal, Building,
  Plus, Upload, XCircle, MapPin, Clock
} from "lucide-react";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface SiteInspection {
  id: string;
  title: string;
  project: string;
  unit: string;
  type: 'routine' | 'quality_issue' | 'milestone';
  inspectionDate: string;
  status: 'planned' | 'completed';
  location: string;
  notes?: string;
  photoCount: number;
}

const siteInspections: SiteInspection[] = [
  {
    id: "si1",
    title: "Foundation completion inspection",
    project: "Riverside Tower",
    unit: "Block A",
    type: "milestone",
    inspectionDate: "2025-04-15",
    status: "completed",
    location: "Building Site 1",
    notes: "Foundation work completed as per specifications. Ready for next phase.",
    photoCount: 8
  },
  {
    id: "si2",
    title: "Structural frame inspection",
    project: "Valley Heights",
    unit: "Unit 3",
    type: "routine",
    inspectionDate: "2025-04-16",
    status: "planned",
    location: "Main Construction Area",
    photoCount: 0
  },
  {
    id: "si3",
    title: "Plumbing works inspection",
    project: "Green Villa",
    unit: "Villa 2",
    type: "routine",
    inspectionDate: "2025-04-18",
    status: "planned",
    location: "Interior Plumbing Zone",
    photoCount: 0
  },
  {
    id: "si4",
    title: "Wall crack investigation",
    project: "Riverside Tower",
    unit: "Block B",
    type: "quality_issue",
    inspectionDate: "2025-04-14",
    status: "completed",
    location: "3rd Floor, East Wing",
    notes: "Found hairline cracks in the wall. Documented for quality control team.",
    photoCount: 6
  },
  {
    id: "si5",
    title: "Roof installation inspection",
    project: "Valley Heights",
    unit: "Unit 7",
    type: "milestone",
    inspectionDate: "2025-04-20",
    status: "planned",
    location: "Rooftop Area",
    photoCount: 0
  }
];

const typeColors: Record<string, string> = {
  routine: 'bg-blue-100 text-blue-800',
  quality_issue: 'bg-red-100 text-red-800',
  milestone: 'bg-amber-100 text-amber-800'
};

const statusColors: Record<string, string> = {
  planned: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800'
};

const SiteInspections = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [newInspectionOpen, setNewInspectionOpen] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  
  const filteredInspections = siteInspections.filter(inspection => {
    // Apply search query
    if (searchQuery && !inspection.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply project filter
    if (projectFilter && projectFilter !== 'all-projects' && inspection.project !== projectFilter) {
      return false;
    }
    
    // Apply type filter
    if (typeFilter && typeFilter !== 'all-types' && inspection.type !== typeFilter) {
      return false;
    }
    
    // Apply status filter
    if (statusFilter && statusFilter !== 'all-statuses' && inspection.status !== statusFilter) {
      return false;
    }
    
    return true;
  });

  const projects = Array.from(new Set(siteInspections.map(inspection => inspection.project)));
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setPhotos(prevPhotos => [...prevPhotos, ...newFiles]);
    }
  };
  
  const removePhoto = (index: number) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inspection report created", {
      description: "New site inspection has been added to the system"
    });
    setNewInspectionOpen(false);
    setPhotos([]);
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Inspections</h1>
          <p className="text-muted-foreground">
            Document and track all site inspections with photo evidence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Planned Inspections</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {siteInspections.filter(inspection => inspection.status === 'planned').length}
              </div>
              <p className="text-xs text-muted-foreground">Upcoming inspections</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Inspections</CardTitle>
              <Camera className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {siteInspections.filter(inspection => inspection.status === 'completed').length}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
              <Grid3X3 className="h-4 w-4 text-violet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {siteInspections.reduce((sum, inspection) => sum + inspection.photoCount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Documentation images</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
          <div className="flex flex-wrap items-center space-x-0 space-y-2 sm:space-x-2 sm:space-y-0">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inspections..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-fit">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{projectFilter === 'all-projects' || !projectFilter ? 'All Projects' : projectFilter}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-projects">All Projects</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-fit">
                <div className="flex items-center">
                  <Camera className="h-4 w-4 mr-2" />
                  <span>
                    {typeFilter === 'all-types' || !typeFilter ? 'All Types' : 
                      typeFilter.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="routine">Routine</SelectItem>
                <SelectItem value="quality_issue">Quality Issue</SelectItem>
                <SelectItem value="milestone">Milestone</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-fit">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    {statusFilter === 'all-statuses' || !statusFilter ? 'All Statuses' : 
                      statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-statuses">All Statuses</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Dialog open={newInspectionOpen} onOpenChange={setNewInspectionOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Inspection
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Inspection</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Inspection Title</Label>
                    <Input id="title" placeholder="Enter inspection title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Inspection Date</Label>
                    <Input id="date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project">Project</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map(project => (
                          <SelectItem key={project} value={project}>{project}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Input id="unit" placeholder="Building/Unit identifier" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Inspection Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Routine</SelectItem>
                        <SelectItem value="quality_issue">Quality Issue</SelectItem>
                        <SelectItem value="milestone">Milestone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location Details</Label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Input id="location" placeholder="Specific location within site" required />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes & Observations</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Enter any observations or notes about the inspection"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Upload Photos</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-2">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative rounded-md overflow-hidden border border-border h-32">
                        <img 
                          src={URL.createObjectURL(photo)}
                          alt={`Inspection ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="icon"
                          className="absolute top-1 right-1 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full"
                          onClick={() => removePhoto(index)}
                        >
                          <XCircle className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    ))}
                    
                    {photos.length < 9 && (
                      <Button 
                        type="button"
                        variant="outline"
                        className="h-32 border-dashed flex flex-col"
                        onClick={() => document.getElementById("inspection-photo-upload")?.click()}
                      >
                        <Upload className="mb-2 h-6 w-6" />
                        <span>Add Photos</span>
                      </Button>
                    )}
                  </div>
                  <Input 
                    id="inspection-photo-upload" 
                    type="file"
                    className="hidden" 
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                </div>
                
                <DialogFooter className="pt-4">
                  <Button type="button" variant="outline" onClick={() => setNewInspectionOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Create Inspection
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Project / Unit</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Photos</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInspections.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No inspections found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInspections.map((inspection) => (
                    <TableRow key={inspection.id}>
                      <TableCell className="font-medium">
                        {inspection.title}
                        <div className="text-xs text-muted-foreground">
                          {inspection.location}
                        </div>
                      </TableCell>
                      <TableCell>{inspection.project} / {inspection.unit}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={typeColors[inspection.type]}>
                          {inspection.type === 'quality_issue' 
                            ? 'Quality Issue' 
                            : inspection.type.charAt(0).toUpperCase() + inspection.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(inspection.inspectionDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[inspection.status]}>
                          {inspection.status.charAt(0).toUpperCase() + inspection.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Camera className="h-4 w-4 mr-1 text-muted-foreground" />
                          {inspection.photoCount}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Add Photos</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem>Export Report</DropdownMenuItem>
                            {inspection.status === 'planned' && (
                              <DropdownMenuItem>Complete Inspection</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SiteInspections;
