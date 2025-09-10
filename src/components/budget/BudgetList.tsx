import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { Budget } from "@/types/financial";

interface BudgetListProps {
  budgets: Budget[];
}

export const BudgetList = ({ budgets }: BudgetListProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getProgressValue = (spent: number, budgeted: number) => {
    return Math.min((spent / budgeted) * 100, 100);
  };

  const getBudgetStatus = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage >= 100) return "over";
    if (percentage >= 80) return "warning";
    return "good";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Budget Management</h1>
        <p className="text-muted-foreground">Track your spending across different categories</p>
      </div>

      <div className="grid gap-6">
        {budgets.map((budget) => {
          const progressValue = getProgressValue(budget.spent, budget.budgeted);
          const status = getBudgetStatus(budget.spent, budget.budgeted);
          
          return (
            <Card key={budget.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{budget.category}</CardTitle>
                  <Badge variant={status === "over" ? "destructive" : status === "warning" ? "secondary" : "default"}>
                    {status === "over" ? "Over Budget" : status === "warning" ? "Almost Full" : "On Track"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Spent</span>
                    <span className="font-medium">{formatCurrency(budget.spent)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-medium">{formatCurrency(budget.budgeted)}</span>
                  </div>
                  <Progress 
                    value={progressValue} 
                    className="h-2"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Remaining</span>
                    <span className={`font-medium ${budget.remaining < 0 ? 'text-destructive-foreground' : 'text-success-foreground'}`}>
                      {formatCurrency(budget.remaining)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};