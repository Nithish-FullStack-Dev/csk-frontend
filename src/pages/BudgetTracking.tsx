import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { PlusCircle, BarChart3, PieChart, FileText } from "lucide-react";
import BudgetOverviewCards from "@/components/budget/BudgetOverviewCards";
import BudgetVarianceChart from "@/components/budget/BudgetVarianceChart";
import ExpenseForm from "@/components/budget/ExpenseForm";
import MainLayout from "@/components/layout/MainLayout";

// Sample data
const budgetCategories = [
  {
    id: "1",
    name: "Marketing",
    budgeted: 50000,
    spent: 32000,
    variance: -18000,
  },
  {
    id: "2",
    name: "Construction",
    budgeted: 500000,
    spent: 545000,
    variance: 45000,
  },
  {
    id: "3",
    name: "Operations",
    budgeted: 100000,
    spent: 89000,
    variance: -11000,
  },
  { id: "4", name: "Sales", budgeted: 75000, spent: 68000, variance: -7000 },
  {
    id: "5",
    name: "Administration",
    budgeted: 25000,
    spent: 28000,
    variance: 3000,
  },
];

const cashFlowData = [
  { month: "Jan", inflow: 850000, outflow: 720000, net: 130000 },
  { month: "Feb", inflow: 920000, outflow: 780000, net: 140000 },
  { month: "Mar", inflow: 1100000, outflow: 890000, net: 210000 },
  { month: "Apr", inflow: 980000, outflow: 850000, net: 130000 },
  { month: "May", inflow: 1200000, outflow: 950000, net: 250000 },
];

const expenseTransactions = [
  {
    id: "1",
    date: "2024-06-01",
    category: "Construction",
    amount: 125000,
    vendor: "ABC Construction",
    status: "Approved",
  },
  {
    id: "2",
    date: "2024-06-02",
    category: "Marketing",
    amount: 15000,
    vendor: "Digital Solutions",
    status: "Pending",
  },
  {
    id: "3",
    date: "2024-06-03",
    category: "Operations",
    amount: 8500,
    vendor: "Office Supplies Co",
    status: "Approved",
  },
  {
    id: "4",
    date: "2024-06-04",
    category: "Administration",
    amount: 5200,
    vendor: "Legal Services",
    status: "Rejected",
  },
];

const BudgetTracking = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleAddExpense = (expense: any) => {
    console.log("Adding expense:", expense);
  };

  const totalBudget = budgetCategories.reduce(
    (sum, cat) => sum + cat.budgeted,
    0
  );
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-md font-vidaloka">
              Budget Tracking & Cash Flow
            </h1>
            <p className="text-muted-foreground">
              Monitor budgets, track expenses, and manage cash flow
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <ExpenseForm onSubmit={handleAddExpense} />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="budget">Budget Analysis</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
            <TabsTrigger value="expenses">Expense Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <BudgetOverviewCards
              totalBudget={totalBudget}
              totalSpent={totalSpent}
              netCashFlow={250000}
              pendingApprovals={5}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BudgetVarianceChart categories={budgetCategories} />

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Cash Flow Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <BarChart3 className="h-16 w-16 text-estate-navy/20" />
                    <p className="text-muted-foreground ml-2">
                      Cash flow chart visualization
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <CardTitle>Budget vs Actual Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Budgeted Amount</TableHead>
                      <TableHead>Actual Spent</TableHead>
                      <TableHead>Variance</TableHead>
                      <TableHead>Utilization</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budgetCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">
                          {category.name}
                        </TableCell>
                        <TableCell>
                          ₹{category.budgeted.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          ₹{category.spent.toLocaleString()}
                        </TableCell>
                        <TableCell
                          className={
                            category.variance > 0
                              ? "text-red-500"
                              : "text-green-500"
                          }
                        >
                          ₹{Math.abs(category.variance).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress
                              value={(category.spent / category.budgeted) * 100}
                              className="w-16 h-2"
                            />
                            <span className="text-sm">
                              {Math.round(
                                (category.spent / category.budgeted) * 100
                              )}
                              %
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              category.variance > 0 ? "destructive" : "default"
                            }
                          >
                            {category.variance > 0
                              ? "Over Budget"
                              : "Within Budget"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cashflow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cash Flow Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Inflow</TableHead>
                        <TableHead>Outflow</TableHead>
                        <TableHead>Net Flow</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cashFlowData.map((data) => (
                        <TableRow key={data.month}>
                          <TableCell>{data.month}</TableCell>
                          <TableCell className="text-green-600">
                            ₹{data.inflow.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-red-600">
                            ₹{data.outflow.toLocaleString()}
                          </TableCell>
                          <TableCell
                            className={
                              data.net > 0 ? "text-green-600" : "text-red-600"
                            }
                          >
                            ₹{data.net.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cash Flow Projection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <PieChart className="h-16 w-16 text-estate-navy/20" />
                    <p className="text-muted-foreground ml-2">
                      Cash flow projection chart
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expenses">
            <Card>
              <CardHeader>
                <CardTitle>Recent Expense Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenseTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell>
                          ₹{transaction.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>{transaction.vendor}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === "Approved"
                                ? "default"
                                : transaction.status === "Pending"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default BudgetTracking;
