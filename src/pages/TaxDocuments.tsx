import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Download,
  Upload,
  Calendar,
  AlertCircle,
  CheckCircle,
  PlusCircle,
  Eye,
} from "lucide-react";
import TaxOverviewCards from "@/components/tax/TaxOverviewCards";
import TaxCalculator from "@/components/tax/TaxCalculator";
import MainLayout from "@/components/layout/MainLayout";

// Sample data for Indian tax documents
const gstReturns = [
  {
    id: "1",
    period: "May 2024",
    type: "GSTR-1",
    status: "Filed",
    dueDate: "2024-06-11",
    amount: 125000,
  },
  {
    id: "2",
    period: "May 2024",
    type: "GSTR-3B",
    status: "Pending",
    dueDate: "2024-06-20",
    amount: 89000,
  },
  {
    id: "3",
    period: "April 2024",
    type: "GSTR-1",
    status: "Filed",
    dueDate: "2024-05-11",
    amount: 98000,
  },
  {
    id: "4",
    period: "April 2024",
    type: "GSTR-3B",
    status: "Filed",
    dueDate: "2024-05-20",
    amount: 76000,
  },
];

const tdsRecords = [
  {
    id: "1",
    quarter: "Q1 FY 2024-25",
    section: "194C",
    amount: 45000,
    challan: "CH001234",
    date: "2024-04-15",
    status: "Paid",
  },
  {
    id: "2",
    quarter: "Q1 FY 2024-25",
    section: "194I",
    amount: 25000,
    challan: "CH001235",
    date: "2024-04-15",
    status: "Paid",
  },
  {
    id: "3",
    quarter: "Q4 FY 2023-24",
    section: "194C",
    amount: 38000,
    challan: "CH001236",
    date: "2024-03-31",
    status: "Paid",
  },
];

const incomeTaxDocs = [
  {
    id: "1",
    type: "Form 26AS",
    period: "FY 2023-24",
    status: "Downloaded",
    date: "2024-05-15",
  },
  {
    id: "2",
    type: "ITR-4",
    period: "FY 2023-24",
    status: "Filed",
    date: "2024-07-31",
  },
  {
    id: "3",
    type: "Form 16",
    period: "FY 2023-24",
    status: "Generated",
    date: "2024-04-30",
  },
];

const auditDocuments = [
  {
    id: "1",
    type: "GST Audit",
    period: "FY 2023-24",
    status: "Completed",
    auditor: "CA Rajesh Kumar",
    date: "2024-03-31",
  },
  {
    id: "2",
    type: "Tax Audit",
    period: "FY 2023-24",
    status: "In Progress",
    auditor: "CA Priya Sharma",
    date: "2024-09-30",
  },
];

const TaxDocuments = () => {
  const [activeTab, setActiveTab] = useState("gst");
  const [newTaxDoc, setNewTaxDoc] = useState({
    type: "",
    period: "",
    amount: "",
    dueDate: "",
  });

  const handleAddTaxDoc = () => {
    console.log("Adding tax document:", newTaxDoc);
    setNewTaxDoc({
      type: "",
      period: "",
      amount: "",
      dueDate: "",
    });
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-md font-vidaloka">
              Tax Documents & Compliance
            </h1>
            <p className="text-muted-foreground">
              Manage GST, TDS, Income Tax, and compliance documents
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Tax Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Tax Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="type">Document Type</Label>
                  <Select
                    value={newTaxDoc.type}
                    onValueChange={(value) =>
                      setNewTaxDoc({ ...newTaxDoc, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gstr1">GSTR-1</SelectItem>
                      <SelectItem value="gstr3b">GSTR-3B</SelectItem>
                      <SelectItem value="tds">TDS Return</SelectItem>
                      <SelectItem value="itr">Income Tax Return</SelectItem>
                      <SelectItem value="form16">Form 16</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="period">Period</Label>
                  <Input
                    id="period"
                    value={newTaxDoc.period}
                    onChange={(e) =>
                      setNewTaxDoc({ ...newTaxDoc, period: e.target.value })
                    }
                    placeholder="e.g., May 2024"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Tax Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newTaxDoc.amount}
                    onChange={(e) =>
                      setNewTaxDoc({ ...newTaxDoc, amount: e.target.value })
                    }
                    placeholder="Enter tax amount"
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTaxDoc.dueDate}
                    onChange={(e) =>
                      setNewTaxDoc({ ...newTaxDoc, dueDate: e.target.value })
                    }
                  />
                </div>
                <Button onClick={handleAddTaxDoc} className="w-full">
                  Add Document
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <TaxOverviewCards
          gstCollected={324000}
          tdsDeducted={95000}
          pendingReturns={2}
          complianceScore={95}
        />

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="gst">GST Management</TabsTrigger>
            <TabsTrigger value="tds">TDS Records</TabsTrigger>
            <TabsTrigger value="income">Income Tax</TabsTrigger>
            <TabsTrigger value="audit">Audit & Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="gst">
            <Card>
              <CardHeader>
                <CardTitle>GST Returns Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Return Type</TableHead>
                      <TableHead>Tax Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gstReturns.map((gstReturn) => (
                      <TableRow key={gstReturn.id}>
                        <TableCell>{gstReturn.period}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{gstReturn.type}</Badge>
                        </TableCell>
                        <TableCell>
                          ₹{gstReturn.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {gstReturn.dueDate}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              gstReturn.status === "Filed"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {gstReturn.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tds">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>TDS Deduction Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Quarter</TableHead>
                        <TableHead>Section</TableHead>
                        <TableHead>Amount Deducted</TableHead>
                        <TableHead>Challan Number</TableHead>
                        <TableHead>Payment Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tdsRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.quarter}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{record.section}</Badge>
                          </TableCell>
                          <TableCell>
                            ₹{record.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>{record.challan}</TableCell>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>
                            <Badge variant="default">{record.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <TaxCalculator />
            </div>
          </TabsContent>

          <TabsContent value="income">
            <Card>
              <CardHeader>
                <CardTitle>Income Tax Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Type</TableHead>
                      <TableHead>Financial Year</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomeTaxDocs.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            {doc.type}
                          </div>
                        </TableCell>
                        <TableCell>{doc.period}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              doc.status === "Filed"
                                ? "default"
                                : doc.status === "Generated"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {doc.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{doc.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Audit Type</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Auditor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Due Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditDocuments.map((audit) => (
                        <TableRow key={audit.id}>
                          <TableCell>{audit.type}</TableCell>
                          <TableCell>{audit.period}</TableCell>
                          <TableCell>{audit.auditor}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                audit.status === "Completed"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {audit.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{audit.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>GST Returns Filed</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>TDS Payments Made</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Income Tax Return Filed</span>
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Audit Documentation</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>ROC Filings</span>
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default TaxDocuments;
