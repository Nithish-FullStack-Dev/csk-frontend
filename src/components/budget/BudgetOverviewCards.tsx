
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface BudgetOverviewProps {
  totalBudget: number;
  totalSpent: number;
  netCashFlow: number;
  pendingApprovals: number;
}

const BudgetOverviewCards = ({ totalBudget, totalSpent, netCashFlow, pendingApprovals }: BudgetOverviewProps) => {
  const overBudget = totalSpent > totalBudget;
  const variance = ((totalSpent - totalBudget) / totalBudget) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{totalBudget.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Current month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          <TrendingDown className={`h-4 w-4 ${overBudget ? 'text-red-500' : 'text-green-500'}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</div>
          <p className={`text-xs ${overBudget ? 'text-red-500' : 'text-green-500'}`}>
            {overBudget ? '+' : ''}{variance.toFixed(1)}% {overBudget ? 'over' : 'under'} budget
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Cash Flow</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{netCashFlow.toLocaleString()}</div>
          <p className="text-xs text-green-500">+12% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingApprovals}</div>
          <p className="text-xs text-muted-foreground">Expenses awaiting approval</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetOverviewCards;
