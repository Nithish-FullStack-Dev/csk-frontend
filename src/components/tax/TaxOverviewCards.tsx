
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, Calculator, AlertCircle, CheckCircle } from "lucide-react";

interface TaxOverviewProps {
  gstCollected: number;
  tdsDeducted: number;
  pendingReturns: number;
  complianceScore: number;
}

const TaxOverviewCards = ({ gstCollected, tdsDeducted, pendingReturns, complianceScore }: TaxOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">GST Collected</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{gstCollected.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Current quarter</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">TDS Deducted</CardTitle>
          <Calculator className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{tdsDeducted.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Current quarter</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Returns</CardTitle>
          <AlertCircle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingReturns}</div>
          <p className="text-xs text-yellow-500">Due this month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{complianceScore}%</div>
          <p className="text-xs text-green-500">Excellent compliance</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxOverviewCards;
