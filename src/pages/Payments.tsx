import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Download,
  Filter,
  MoreHorizontal,
  Search,
  CreditCard,
  Eye,
  FileText,
  Receipt,
  Calendar,
  ArrowUpDown,
  Printer,
} from "lucide-react";

// Sample payment data
const payments = [
  {
    id: "PMT-2023-001",
    reference: "INV-2023-001",
    property: "Skyline Towers",
    client: "John Cooper",
    amount: 5200,
    method: "Credit Card",
    date: "2023-10-15",
  },
  {
    id: "PMT-2023-002",
    reference: "INV-2023-004",
    property: "Riverside Apartments",
    client: "Sarah Johnson",
    amount: 4200,
    method: "Bank Transfer",
    date: "2023-10-05",
  },
  {
    id: "PMT-2023-003",
    reference: "INV-2023-006",
    property: "Parkview Residences",
    client: "David Thompson",
    amount: 6800,
    method: "Check",
    date: "2023-09-28",
  },
  {
    id: "PMT-2023-004",
    reference: "INV-2023-007",
    property: "Golden Heights Phase 1",
    client: "Emily Davis",
    amount: 3500,
    method: "Credit Card",
    date: "2023-10-20",
  },
  {
    id: "PMT-2023-005",
    reference: "INV-2023-009",
    property: "Evergreen Villas",
    client: "Robert Wilson",
    amount: 7200,
    method: "Bank Transfer",
    date: "2023-10-12",
  },
];

const Payments = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-md font-vidaloka">
              Payment Management
            </h1>
            <p className="text-muted-foreground">
              Track and manage all payments for CSK - Real Manager
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="default">
              <CreditCard className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payments..."
                  className="pl-8 w-full sm:w-[260px]"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date Range
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="flex items-center">
                        Payment ID
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Receipt className="h-4 w-4 text-muted-foreground" />
                          {payment.id}
                        </div>
                      </TableCell>
                      <TableCell>{payment.reference}</TableCell>
                      <TableCell>{payment.property}</TableCell>
                      <TableCell>{payment.client}</TableCell>
                      <TableCell className="text-right">
                        ${payment.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        {new Date(payment.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="mr-2 h-4 w-4" />
                              Print Receipt
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Reconcile
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Payments;
