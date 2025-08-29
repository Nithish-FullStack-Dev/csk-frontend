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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  Search,
  Plus,
  BadgeIndianRupee,
  FileText,
  ArrowDown,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define interface for invoice type
interface Invoice {
  id: string;
  to: string;
  project: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  gst: number;
  totalAmount: number;
  status: string;
  paymentDate: string | null;
  notes?: string;
}

// Define interface for invoice item type
interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
  taxRate: number;
}

// Sample invoices data
const initialInvoices: Invoice[] = [
  {
    id: "INV-2023-001",
    to: "CSK Realtors Ltd.",
    project: "Skyline Towers Construction",
    issueDate: "2023-06-15",
    dueDate: "2023-07-15",
    amount: 250000,
    gst: 18,
    totalAmount: 295000,
    status: "Paid",
    paymentDate: "2023-07-10",
  },
  {
    id: "INV-2023-002",
    to: "CSK Realtors Ltd.",
    project: "Green Valley Villas Phase 1",
    issueDate: "2023-06-25",
    dueDate: "2023-07-25",
    amount: 180000,
    gst: 18,
    totalAmount: 212400,
    status: "Paid",
    paymentDate: "2023-07-20",
  },
  {
    id: "INV-2023-003",
    to: "CSK Realtors Ltd.",
    project: "Skyline Towers Construction",
    issueDate: "2023-07-15",
    dueDate: "2023-08-15",
    amount: 320000,
    gst: 18,
    totalAmount: 377600,
    status: "Pending",
    paymentDate: null,
  },
  {
    id: "INV-2023-004",
    to: "CSK Realtors Ltd.",
    project: "Green Valley Villas Phase 1",
    issueDate: "2023-07-25",
    dueDate: "2023-08-25",
    amount: 220000,
    gst: 18,
    totalAmount: 259600,
    status: "Overdue",
    paymentDate: null,
  },
  {
    id: "INV-2023-005",
    to: "CSK Realtors Ltd.",
    project: "Riverside Apartments Foundation",
    issueDate: "2023-08-10",
    dueDate: "2023-09-10",
    amount: 150000,
    gst: 18,
    totalAmount: 177000,
    status: "Draft",
    paymentDate: null,
  },
];

// Sample invoice items
const sampleInvoiceItems: InvoiceItem[] = [
  {
    id: "1",
    description: "Foundation Work",
    quantity: 1,
    unit: "Job",
    rate: 120000,
    amount: 120000,
    taxRate: 18,
  },
  {
    id: "2",
    description: "Masonry Labor - Level 1",
    quantity: 45,
    unit: "Days",
    rate: 2000,
    amount: 90000,
    taxRate: 18,
  },
  {
    id: "3",
    description: "Electrical Wiring Installation",
    quantity: 1,
    unit: "Job",
    rate: 40000,
    amount: 40000,
    taxRate: 18,
  },
];

// Form schema
const invoiceSchema = z.object({
  to: z.string().min(2, "Client name is required"),
  project: z.string().min(2, "Project is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  gst: z.coerce
    .number()
    .min(0, "GST rate must be positive")
    .max(28, "GST rate cannot exceed 28%"),
  notes: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

// Invoice item schema
const invoiceItemSchema = z.object({
  description: z.string().min(2, "Description is required"),
  quantity: z.coerce.number().positive("Quantity must be positive"),
  unit: z.string().min(1, "Unit is required"),
  rate: z.coerce.number().positive("Rate must be positive"),
  taxRate: z.coerce
    .number()
    .min(0, "Tax rate must be positive")
    .max(28, "Tax rate cannot exceed 28%"),
});

type InvoiceItemFormValues = z.infer<typeof invoiceItemSchema>;

const ContractorInvoices = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewInvoiceDialogOpen, setViewInvoiceDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      to: "CSK Realtors Ltd.",
      project: "Skyline Towers Construction",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      gst: 18,
    },
  });

  const itemForm = useForm<InvoiceItemFormValues>({
    resolver: zodResolver(invoiceItemSchema),
    defaultValues: {
      unit: "Job",
      taxRate: 18,
    },
  });

  // Sample project list
  const projects = [
    "Skyline Towers Construction",
    "Green Valley Villas Phase 1",
    "Riverside Apartments Foundation",
  ];

  const handleSubmit = (data: InvoiceFormValues) => {
    if (invoiceItems.length === 0) {
      toast.error("Please add at least one item to the invoice");
      return;
    }

    // Calculate totals
    const subtotal = invoiceItems.reduce(
      (total, item) => total + item.amount,
      0
    );
    const gstAmount = subtotal * (data.gst / 100);
    const totalAmount = subtotal + gstAmount;

    // Create new invoice with all required fields
    const newInvoice: Invoice = {
      id: `INV-${new Date().getFullYear()}-${String(
        invoices.length + 1
      ).padStart(3, "0")}`,
      to: data.to,
      project: data.project,
      issueDate: data.issueDate,
      dueDate: data.dueDate,
      amount: subtotal,
      gst: data.gst,
      totalAmount: totalAmount,
      status: "Draft",
      paymentDate: null,
      notes: data.notes,
    };

    setInvoices([...invoices, newInvoice]);
    toast.success("Invoice created successfully");
    form.reset();
    setInvoiceItems([]);
    setCreateDialogOpen(false);
  };

  const addInvoiceItem = (data: InvoiceItemFormValues) => {
    const amount = data.quantity * data.rate;
    const newItem: InvoiceItem = {
      id: (invoiceItems.length + 1).toString(),
      description: data.description,
      quantity: data.quantity,
      unit: data.unit,
      rate: data.rate,
      amount: amount,
      taxRate: data.taxRate,
    };

    setInvoiceItems([...invoiceItems, newItem]);
    itemForm.reset({
      unit: "Job",
      taxRate: 18,
    });
    setShowAddItem(false);
    toast.success("Item added to invoice");
  };

  const removeInvoiceItem = (id: string) => {
    setInvoiceItems(invoiceItems.filter((item) => item.id !== id));
  };

  const viewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setViewInvoiceDialogOpen(true);
  };

  // Filter invoices based on search and active tab
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.project.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "paid") return matchesSearch && invoice.status === "Paid";
    if (activeTab === "pending")
      return matchesSearch && invoice.status === "Pending";
    if (activeTab === "overdue")
      return matchesSearch && invoice.status === "Overdue";
    if (activeTab === "draft")
      return matchesSearch && invoice.status === "Draft";

    return matchesSearch;
  });

  // Calculate statistics
  const totalInvoiceAmount = invoices.reduce(
    (total, invoice) => total + invoice.totalAmount,
    0
  );
  const paidInvoicesAmount = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((total, invoice) => total + invoice.totalAmount, 0);
  const pendingInvoicesAmount = invoices
    .filter(
      (invoice) => invoice.status === "Pending" || invoice.status === "Overdue"
    )
    .reduce((total, invoice) => total + invoice.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{invoices.length}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {invoices.filter((i) => i.status === "Paid").length} paid,{" "}
              {invoices.filter((i) => i.status !== "Paid").length} unpaid
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BadgeIndianRupee className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">
                ₹{totalInvoiceAmount.toLocaleString()}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {invoices.length} invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Outstanding Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BadgeIndianRupee className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">
                ₹{pendingInvoicesAmount.toLocaleString()}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((pendingInvoicesAmount / totalInvoiceAmount) * 100) ||
                0}
              % of total amount
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices by number, project..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Invoice
        </Button>
      </div>

      {/* Tabs for filtering */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="draft" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" /> Draft
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center">
            <ArrowDown className="mr-2 h-4 w-4" /> Pending
          </TabsTrigger>
          <TabsTrigger value="paid" className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" /> Paid
          </TabsTrigger>
          <TabsTrigger value="overdue" className="flex items-center">
            <AlertCircle className="mr-2 h-4 w-4" /> Overdue
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Invoices Table */}
      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice No.</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount (₹)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No invoices found.
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.project}</TableCell>
                  <TableCell>{invoice.to}</TableCell>
                  <TableCell>{invoice.issueDate}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                      {invoice.totalAmount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        invoice.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : invoice.status === "Pending"
                          ? "bg-blue-100 text-blue-800"
                          : invoice.status === "Overdue"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewInvoice(invoice)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create Invoice Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[800px] overflow-auto h-[90vh]">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter client name" {...field} />
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                  name="issueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gst"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GST Rate (%)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select GST rate" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">0%</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="12">12%</SelectItem>
                          <SelectItem value="18">18%</SelectItem>
                          <SelectItem value="28">28%</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Invoice Items */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Invoice Items</h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddItem(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                  </Button>
                </div>

                {invoiceItems.length === 0 ? (
                  <div className="border rounded-md p-4 text-center text-muted-foreground">
                    No items added to this invoice. Click "Add Item" to get
                    started.
                  </div>
                ) : (
                  <div className="border rounded-md overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead>Qty</TableHead>
                          <TableHead>Unit</TableHead>
                          <TableHead>Rate (₹)</TableHead>
                          <TableHead>Tax %</TableHead>
                          <TableHead>Amount (₹)</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoiceItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell>₹{item.rate.toLocaleString()}</TableCell>
                            <TableCell>{item.taxRate}%</TableCell>
                            <TableCell>
                              ₹{item.amount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeInvoiceItem(item.id)}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {/* Add Item Form */}
                {showAddItem && (
                  <div className="border rounded-md p-4 mt-4">
                    <h4 className="text-sm font-medium mb-4">Add New Item</h4>
                    <Form {...itemForm}>
                      <form
                        onSubmit={itemForm.handleSubmit(addInvoiceItem)}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={itemForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Item description"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={itemForm.control}
                              name="quantity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Quantity</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="1"
                                      step="1"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={itemForm.control}
                              name="unit"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Unit</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Unit" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Job">Job</SelectItem>
                                      <SelectItem value="Hours">
                                        Hours
                                      </SelectItem>
                                      <SelectItem value="Days">Days</SelectItem>
                                      <SelectItem value="Sq.ft">
                                        Sq.ft
                                      </SelectItem>
                                      <SelectItem value="Units">
                                        Units
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={itemForm.control}
                            name="rate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Rate (₹)</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <BadgeIndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                      className="pl-10"
                                      type="number"
                                      min="0"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={itemForm.control}
                            name="taxRate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tax Rate (%)</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value.toString()}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select tax rate" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="0">0%</SelectItem>
                                    <SelectItem value="5">5%</SelectItem>
                                    <SelectItem value="12">12%</SelectItem>
                                    <SelectItem value="18">18%</SelectItem>
                                    <SelectItem value="28">28%</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowAddItem(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">Add Item</Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                )}
              </div>

              {/* Invoice Summary */}
              <div className="border rounded-md p-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>
                    ₹
                    {invoiceItems
                      .reduce((sum, item) => sum + item.amount, 0)
                      .toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>GST ({form.watch("gst")}%):</span>
                  <span>
                    ₹
                    {(
                      invoiceItems.reduce((sum, item) => sum + item.amount, 0) *
                      (form.watch("gst") / 100)
                    ).toLocaleString()}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>
                    ₹
                    {(
                      invoiceItems.reduce((sum, item) => sum + item.amount, 0) *
                      (1 + form.watch("gst") / 100)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional notes for the invoice"
                        className="resize-none"
                        {...field}
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
                  onClick={() => setCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Invoice</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Invoice Dialog */}
      {selectedInvoice && (
        <Dialog
          open={viewInvoiceDialogOpen}
          onOpenChange={setViewInvoiceDialogOpen}
        >
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Invoice {selectedInvoice.id}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl">INVOICE</h3>
                  <p className="text-muted-foreground">{selectedInvoice.id}</p>
                </div>
                <Badge
                  className={`${
                    selectedInvoice.status === "Paid"
                      ? "bg-green-100 text-green-800"
                      : selectedInvoice.status === "Pending"
                      ? "bg-blue-100 text-blue-800"
                      : selectedInvoice.status === "Overdue"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  } text-sm py-1 px-3`}
                >
                  {selectedInvoice.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Invoice To:</p>
                  <p className="font-medium">{selectedInvoice.to}</p>
                </div>

                <div className="space-y-1">
                  <div className="grid grid-cols-2">
                    <p className="text-sm text-muted-foreground">Issue Date:</p>
                    <p>{selectedInvoice.issueDate}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="text-sm text-muted-foreground">Due Date:</p>
                    <p>{selectedInvoice.dueDate}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="text-sm text-muted-foreground">Project:</p>
                    <p>{selectedInvoice.project}</p>
                  </div>
                  {selectedInvoice.paymentDate && (
                    <div className="grid grid-cols-2">
                      <p className="text-sm text-muted-foreground">
                        Payment Date:
                      </p>
                      <p>{selectedInvoice.paymentDate}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border rounded-md overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50%]">Description</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Rate (₹)</TableHead>
                      <TableHead>Amount (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Use sample items when viewing an invoice */}
                    {sampleInvoiceItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>
                          {item.quantity} {item.unit}
                        </TableCell>
                        <TableCell>₹{item.rate.toLocaleString()}</TableCell>
                        <TableCell>₹{item.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end">
                <div className="w-1/2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>₹{selectedInvoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      GST ({selectedInvoice.gst}%):
                    </span>
                    <span>
                      ₹
                      {(
                        selectedInvoice.amount *
                        (selectedInvoice.gst / 100)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total Amount:</span>
                    <span>₹{selectedInvoice.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {selectedInvoice.notes && (
                <div>
                  <h4 className="text-sm font-medium">Notes:</h4>
                  <p className="text-muted-foreground">
                    {selectedInvoice.notes}
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setViewInvoiceDialogOpen(false)}
                >
                  Close
                </Button>
                {selectedInvoice.status !== "Paid" && (
                  <Button
                    onClick={() => {
                      // Mark invoice as paid
                      const updatedInvoices = invoices.map((invoice) =>
                        invoice.id === selectedInvoice.id
                          ? {
                              ...invoice,
                              status: "Paid",
                              paymentDate: new Date()
                                .toISOString()
                                .split("T")[0],
                            }
                          : invoice
                      );
                      setInvoices(updatedInvoices);
                      setSelectedInvoice({
                        ...selectedInvoice,
                        status: "Paid",
                        paymentDate: new Date().toISOString().split("T")[0],
                      });
                      toast.success("Invoice marked as paid");
                    }}
                  >
                    Mark as Paid
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ContractorInvoices;
