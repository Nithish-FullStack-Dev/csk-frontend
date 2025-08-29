
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, CheckSquare, ClipboardList, Calendar, AlertTriangle, Construction, Users, Receipt, Camera, Clock, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

import ContractorProjectsOverview from "@/components/dashboard/contractor/ContractorProjectsOverview";
import ContractorTaskList from "@/components/dashboard/contractor/ContractorTaskList";
import ContractorActivityFeed from "@/components/dashboard/contractor/ContractorActivityFeed";
import ContractorUpcomingTasks from "@/components/dashboard/contractor/ContractorUpcomingTasks";
import ContractorTimeline from "@/components/dashboard/contractor/ContractorTimeline";
import ContractorMaterials from "@/components/dashboard/contractor/ContractorMaterials";
import ContractorLabor from "@/components/dashboard/contractor/ContractorLabor";
import ContractorInvoices from "@/components/dashboard/contractor/ContractorInvoices";
import ContractorPhotoEvidence from "@/components/dashboard/contractor/ContractorPhotoEvidence";
import AddTaskDialog from "@/components/dashboard/contractor/AddTaskDialog";
import CreateInvoiceDialog from "@/components/dashboard/contractor/CreateInvoiceDialog";
import UploadEvidenceDialog from "@/components/dashboard/contractor/UploadEvidenceDialog";

const ContractorDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [uploadEvidenceOpen, setUploadEvidenceOpen] = useState(false);

  return (
    <div className="space-y-4 p-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Contractor Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your projects, tasks, and invoices
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <Dialog open={addTaskOpen} onOpenChange={setAddTaskOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add New Task
            </Button>
          </DialogTrigger>
          <AddTaskDialog onOpenChange={setAddTaskOpen} />
        </Dialog>

        <Dialog open={createInvoiceOpen} onOpenChange={setCreateInvoiceOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Receipt className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <CreateInvoiceDialog onOpenChange={setCreateInvoiceOpen} />
        </Dialog>

        <Dialog open={uploadEvidenceOpen} onOpenChange={setUploadEvidenceOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Camera className="mr-2 h-4 w-4" />
              Upload Evidence
            </Button>
          </DialogTrigger>
          <UploadEvidenceDialog onOpenChange={setUploadEvidenceOpen} />
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Building className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks in Progress</CardTitle>
            <ClipboardList className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">8 pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+8 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Calendar className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">3 high priority</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="tasks">Task Management</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="labor">Labor</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="evidence">Photo Evidence</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Projects Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ContractorProjectsOverview />
              </CardContent>
            </Card>
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <ContractorUpcomingTasks />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ContractorActivityFeed />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Critical Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Material Delay: Cement</p>
                      <p className="text-sm text-muted-foreground">Project: Riverside Tower</p>
                      <p className="text-xs text-red-500">Estimated delay: 3 days</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Quality Issue: Foundation Inspection</p>
                      <p className="text-sm text-muted-foreground">Project: Valley Heights</p>
                      <p className="text-xs text-amber-500">Requires rework</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <ContractorProjectsOverview />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ContractorTaskList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Construction Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ContractorTimeline />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Materials Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ContractorMaterials />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Labor Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ContractorLabor />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <ContractorInvoices />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="evidence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Photo Evidence</CardTitle>
            </CardHeader>
            <CardContent>
              <ContractorPhotoEvidence />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContractorDashboard;
