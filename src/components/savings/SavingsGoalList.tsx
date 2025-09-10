import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, TrendingUp } from "lucide-react";
import type { SavingsGoal } from "@/types/financial";

interface SavingsGoalListProps {
  savingsGoals: SavingsGoal[];
}

export const SavingsGoalList = ({ savingsGoals }: SavingsGoalListProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getProgressValue = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getGoalStatus = (current: number, target: number, targetDate: string) => {
    const progress = (current / target) * 100;
    const today = new Date();
    const deadline = new Date(targetDate);
    const daysUntilDeadline = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (progress >= 100) return "completed";
    if (daysUntilDeadline < 0) return "overdue";
    if (progress >= 80) return "on-track";
    if (daysUntilDeadline < 30) return "behind";
    return "in-progress";
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "on-track":
        return "secondary";
      case "behind":
        return "destructive";
      case "overdue":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "on-track":
        return "On Track";
      case "behind":
        return "Behind Schedule";
      case "overdue":
        return "Overdue";
      default:
        return "In Progress";
    }
  };

  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const monthlyContributions = savingsGoals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Savings Goals</h1>
        <p className="text-muted-foreground">Track progress toward your financial goals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-success" />
              <span className="text-2xl font-bold">{formatCurrency(totalSaved)}</span>
              <span className="text-muted-foreground">total saved</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{formatCurrency(totalTarget)}</span>
              <span className="text-muted-foreground">total target</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span className="text-2xl font-bold">{formatCurrency(monthlyContributions)}</span>
              <span className="text-muted-foreground">monthly savings</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {savingsGoals.map((goal) => {
          const progressValue = getProgressValue(goal.currentAmount, goal.targetAmount);
          const status = getGoalStatus(goal.currentAmount, goal.targetAmount, goal.targetDate);
          
          return (
            <Card key={goal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{goal.name}</CardTitle>
                  <Badge variant={getStatusVariant(status)}>
                    {getStatusLabel(status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Amount</p>
                      <p className="font-semibold">{formatCurrency(goal.currentAmount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Target Amount</p>
                      <p className="font-semibold">{formatCurrency(goal.targetAmount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Contribution</p>
                      <p className="font-semibold">{formatCurrency(goal.monthlyContribution)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-semibold">{goal.category}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{progressValue.toFixed(1)}% complete</span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Remaining</p>
                      <p className="font-semibold">{formatCurrency(goal.targetAmount - goal.currentAmount)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Target Date</p>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="font-semibold">{formatDate(goal.targetDate)}</p>
                      </div>
                    </div>
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