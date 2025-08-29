
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface ExpenseFormProps {
  onSubmit: (expense: any) => void;
}

const ExpenseForm = ({ onSubmit }: ExpenseFormProps) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    vendor: "",
    description: "",
    date: "",
  });

  const handleSubmit = () => {
    if (!expense.category || !expense.amount || !expense.vendor || !expense.date) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit(expense);
    setExpense({
      category: "",
      amount: "",
      vendor: "",
      description: "",
      date: "",
    });
    
    toast({
      title: "Success",
      description: "Expense added successfully",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="category">Category *</Label>
        <Select value={expense.category} onValueChange={(value) => 
          setExpense({ ...expense, category: value })
        }>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="construction">Construction</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="administration">Administration</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="amount">Amount (₹) *</Label>
        <Input
          id="amount"
          type="number"
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          placeholder="Enter amount"
        />
      </div>
      <div>
        <Label htmlFor="vendor">Vendor *</Label>
        <Input
          id="vendor"
          value={expense.vendor}
          onChange={(e) => setExpense({ ...expense, vendor: e.target.value })}
          placeholder="Vendor name"
        />
      </div>
      <div>
        <Label htmlFor="date">Date *</Label>
        <Input
          id="date"
          type="date"
          value={expense.date}
          onChange={(e) => setExpense({ ...expense, date: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={expense.description}
          onChange={(e) => setExpense({ ...expense, description: e.target.value })}
          placeholder="Expense description"
        />
      </div>
      <Button onClick={handleSubmit} className="w-full">
        Add Expense
      </Button>
    </div>
  );
};

export default ExpenseForm;
