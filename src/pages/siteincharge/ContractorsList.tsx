
import React, { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Search, Users, Building, CheckSquare, Clock, Phone,
  MoreHorizontal, ArrowUpDown, Filter, Star, Mail
} from "lucide-react";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Contractor {
  id: string;
  name: string;
  company: string;
  specialization: string;
  projects: string[];
  contactPerson: string;
  phone: string;
  email: string;
  status: 'active' | 'on_hold' | 'inactive';
  completedTasks: number;
  totalTasks: number;
  rating: 1 | 2 | 3 | 4 | 5;
}

const contractors: Contractor[] = [
  {
    id: "c1",
    name: "John Smith",
    company: "ABC Construction Ltd.",
    specialization: "Structural Works",
    projects: ["Riverside Tower", "Valley Heights"],
    contactPerson: "John Smith",
    phone: "+91 98765 43210",
    email: "john.smith@abcconstruction.com",
    status: "active",
    completedTasks: 28,
    totalTasks: 45,
    rating: 4
  },
  {
    id: "c2",
    name: "Rajesh Kumar",
    company: "XYZ Builders",
    specialization: "Masonry Work",
    projects: ["Green Villa"],
    contactPerson: "Rajesh Kumar",
    phone: "+91 87654 32109",
    email: "rajesh@xyzbuilders.com",
    status: "active",
    completedTasks: 15,
    totalTasks: 22,
    rating: 3
  },
  {
    id: "c3",
    name: "Amit Patel",
    company: "PowerTech Systems",
    specialization: "Electrical Works",
    projects: ["Valley Heights", "Riverside Tower"],
    contactPerson: "Amit Patel",
    phone: "+91 76543 21098",
    email: "amit@powertechsystems.com",
    status: "active",
    completedTasks: 12,
    totalTasks: 18,
    rating: 5
  },
  {
    id: "c4",
    name: "Suresh Reddy",
    company: "Elite Ceramics",
    specialization: "Tiling & Finishing",
    projects: ["Riverside Tower"],
    contactPerson: "Suresh Reddy",
    phone: "+91 65432 10987",
    email: "suresh@eliteceramics.com",
    status: "on_hold",
    completedTasks: 8,
    totalTasks: 15,
    rating: 2
  },
  {
    id: "c5",
    name: "David Wilson",
    company: "Top Shelter Inc.",
    specialization: "Roofing",
    projects: ["Valley Heights"],
    contactPerson: "David Wilson",
    phone: "+91 54321 09876",
    email: "david@topshelter.com",
    status: "inactive",
    completedTasks: 0,
    totalTasks: 5,
    rating: 3
  }
];

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  on_hold: 'bg-amber-100 text-amber-800',
  inactive: 'bg-gray-100 text-gray-800'
};

const ContractorsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredContractors = contractors.filter(contractor => {
    // Apply search query
    const matchesSearch = searchQuery === '' || 
      contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.company.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Apply specialization filter
    const matchesSpecialization = specializationFilter === '' || 
      specializationFilter === 'all-specializations' || 
      contractor.specialization === specializationFilter;
      
    // Apply project filter
    const matchesProject = projectFilter === '' || 
      projectFilter === 'all-projects' || 
      contractor.projects.includes(projectFilter);
      
    // Apply status filter
    const matchesStatus = statusFilter === '' || 
      statusFilter === 'all-statuses' || 
      contractor.status === statusFilter;
    
    return matchesSearch && matchesSpecialization && matchesProject && matchesStatus;
  });
  
  const specializations = Array.from(new Set(contractors.map(c => c.specialization)));
  const projects = Array.from(new Set(contractors.flatMap(c => c.projects)));
  
  return (
    <MainLayout>
      <div className="space-y-6 p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contractors</h1>
          <p className="text-muted-foreground">
            Manage contractors working on your construction sites
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contractors</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contractors.length}
              </div>
              <p className="text-xs text-muted-foreground">Across all projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Contractors</CardTitle>
              <CheckSquare className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contractors.filter(c => c.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">Currently working</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contractors.reduce((sum, contractor) => sum + (contractor.totalTasks - contractor.completedTasks), 0)}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting completion</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
          <div className="flex flex-wrap items-center space-x-0 space-y-2 sm:space-x-2 sm:space-y-0">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contractors..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
              <SelectTrigger className="w-fit">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>
                    {specializationFilter === 'all-specializations' || !specializationFilter 
                      ? 'All Specializations' 
                      : specializationFilter}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-specializations">All Specializations</SelectItem>
                {specializations.map(specialization => (
                  <SelectItem key={specialization} value={specialization}>{specialization}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-fit">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  <span>
                    {projectFilter === 'all-projects' || !projectFilter 
                      ? 'All Projects' 
                      : projectFilter}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-projects">All Projects</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-fit">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>
                    {statusFilter === 'all-statuses' || !statusFilter 
                      ? 'All Statuses' 
                      : statusFilter.replace('_', ' ').split(' ').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-statuses">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Add Contractor
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center">
                      Contractor
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContractors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      No contractors found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContractors.map((contractor) => (
                    <TableRow key={contractor.id}>
                      <TableCell className="font-medium">
                        {contractor.name}
                        <div className="text-xs text-muted-foreground">
                          {contractor.company}
                        </div>
                      </TableCell>
                      <TableCell>{contractor.specialization}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {contractor.projects.map((project, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="max-w-fit"
                            >
                              {project}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-sm">
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                            {contractor.phone}
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                            {contractor.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-xs">
                            {contractor.completedTasks} / {contractor.totalTasks} Tasks
                          </div>
                          <Progress 
                            value={(contractor.completedTasks / contractor.totalTasks) * 100} 
                            className="h-2" 
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[contractor.status]}>
                          {contractor.status === 'on_hold' 
                            ? 'On Hold' 
                            : contractor.status.charAt(0).toUpperCase() + contractor.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < contractor.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                            />
                          ))}
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
                            <DropdownMenuItem>View Tasks</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem>Performance Report</DropdownMenuItem>
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

export default ContractorsList;
