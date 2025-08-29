
import React, { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, Search, Filter, ArrowUpDown, MoreHorizontal, 
  Camera, CheckCircle, Building, FileText, AlertOctagon
} from "lucide-react";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface QualityIssue {
  id: string;
  title: string;
  project: string;
  unit: string;
  contractor: string;
  severity: 'critical' | 'major' | 'minor';
  status: 'open' | 'under_review' | 'resolved';
  reportedDate: string;
  taskId?: string;
  description: string;
}

const qualityIssues: QualityIssue[] = [
  {
    id: "q1",
    title: "Cracked foundation concrete",
    project: "Riverside Tower",
    unit: "Block A",
    contractor: "ABC Construction Ltd.",
    severity: "critical",
    status: "open",
    reportedDate: "2025-04-10",
    taskId: "t101",
    description: "Multiple cracks detected in the foundation concrete. Requires immediate attention."
  },
  {
    id: "q2",
    title: "Improper electrical wiring",
    project: "Valley Heights",
    unit: "Unit 3",
    contractor: "PowerTech Systems",
    severity: "major",
    status: "under_review",
    reportedDate: "2025-04-12",
    taskId: "t205",
    description: "Electrical wiring does not follow building code standards. Safety hazard."
  },
  {
    id: "q3",
    title: "Poor quality wall finishing",
    project: "Green Villa",
    unit: "Villa 2",
    contractor: "XYZ Builders",
    severity: "minor",
    status: "open",
    reportedDate: "2025-04-14",
    description: "Wall finishing is uneven and shows visible imperfections."
  },
  {
    id: "q4",
    title: "Incorrect bathroom tile installation",
    project: "Riverside Tower",
    unit: "Block B",
    contractor: "Elite Ceramics",
    severity: "minor",
    status: "resolved",
    reportedDate: "2025-04-05",
    taskId: "t156",
    description: "Tiles were installed with improper spacing and alignment. Contractor has corrected the issue."
  },
  {
    id: "q5",
    title: "Structural column misalignment",
    project: "Valley Heights",
    unit: "Unit 7",
    contractor: "ABC Construction Ltd.",
    severity: "critical",
    status: "under_review",
    reportedDate: "2025-04-08",
    taskId: "t198",
    description: "Column position deviates from structural drawings by 5cm. Structural engineer review required."
  }
];

const severityColors: Record<string, string> = {
  critical: 'bg-red-100 text-red-800',
  major: 'bg-amber-100 text-amber-800',
  minor: 'bg-blue-100 text-blue-800'
};

const statusColors: Record<string, string> = {
  open: 'bg-red-100 text-red-800',
  under_review: 'bg-amber-100 text-amber-800',
  resolved: 'bg-green-100 text-green-800'
};

const QualityControl = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');

  const filteredIssues = qualityIssues.filter(issue => {
    // Apply status filter
    if (filter !== 'all' && issue.status !== filter) {
      return false;
    }
    
    // Apply project filter
    if (projectFilter && projectFilter !== 'all-projects' && issue.project !== projectFilter) {
      return false;
    }
    
    // Apply severity filter
    if (severityFilter && severityFilter !== 'all-severities' && issue.severity !== severityFilter) {
      return false;
    }
    
    // Apply search query
    if (searchQuery && !issue.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const projects = Array.from(new Set(qualityIssues.map(issue => issue.project)));

  return (
    <MainLayout>
      <div className="space-y-6 p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quality Control</h1>
          <p className="text-muted-foreground">
            Manage and track quality issues across all construction projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
              <AlertOctagon className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {qualityIssues.filter(issue => issue.status === 'open').length}
              </div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {qualityIssues.filter(issue => issue.status === 'under_review').length}
              </div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {qualityIssues.filter(issue => issue.status === 'resolved').length}
              </div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="under_review">Under Review</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col md:flex-row justify-between my-4 gap-4">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
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
              
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-fit">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>{severityFilter === 'all-severities' || !severityFilter ? 'All Severities' : 
                      severityFilter.charAt(0).toUpperCase() + severityFilter.slice(1)}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-severities">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="major">Major</SelectItem>
                  <SelectItem value="minor">Minor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button>
              <AlertOctagon className="h-4 w-4 mr-2" />
              Report New Issue
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="flex items-center">
                        Issue
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Project / Unit</TableHead>
                    <TableHead>Contractor</TableHead>
                    <TableHead>Reported Date</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIssues.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No quality issues found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredIssues.map((issue) => (
                      <TableRow key={issue.id}>
                        <TableCell className="font-medium">
                          <div>
                            {issue.title}
                            {issue.taskId && (
                              <div className="text-xs text-muted-foreground">
                                Task ID: {issue.taskId}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{issue.project} / {issue.unit}</TableCell>
                        <TableCell>{issue.contractor}</TableCell>
                        <TableCell>{new Date(issue.reportedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={severityColors[issue.severity]}>
                            {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusColors[issue.status]}>
                            {issue.status === 'under_review'
                              ? 'Under Review'
                              : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                          </Badge>
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
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                              <DropdownMenuItem>Assign Contractor</DropdownMenuItem>
                              <DropdownMenuItem>View Evidence</DropdownMenuItem>
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
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default QualityControl;
