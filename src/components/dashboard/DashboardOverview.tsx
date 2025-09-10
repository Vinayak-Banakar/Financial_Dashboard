    import { 
      DollarSign, 
      TrendingUp, 
      CreditCard, 
      PiggyBank,
      ArrowUpRight,
      ArrowDownRight 
    } from "lucide-react";
    import { StatsCard } from "./StatsCard";
    import { Button } from "@/components/ui/button";
    import type { FinancialSummary } from "@/types/financial";

    interface DashboardOverviewProps {
      summary: FinancialSummary;
    }

    export const DashboardOverview = ({ summary }: DashboardOverviewProps) => {
      const {
        totalIncome,
        totalExpenses,
        netWorth,
        totalSavings,
        totalDebt,
        monthlyBudget,
        monthlySpent
      } = summary;

      const budgetProgress = monthlyBudget > 0 ? (monthlySpent / monthlyBudget) * 100 : 0;
      const remainingBudget = monthlyBudget - monthlySpent;

      return (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Overview of your financial health</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                Export Report
              </Button>
              <Button className="bg-gradient-primary hover:opacity-90" size="sm">
                Add Transaction
              </Button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Net Worth"
              value={`₹${netWorth.toLocaleString()}`}
              change={netWorth > 0 ? "+12.5% from last month" : "Track your progress"}
              changeType={netWorth > 0 ? "positive" : "neutral"}
              icon={DollarSign}
            />
            
            <StatsCard
              title="Total Income"
              value={`₹${totalIncome.toLocaleString()}`}
              change="+8.2% from last month"
              changeType="positive"
              icon={TrendingUp}
            />
            
            <StatsCard
              title="Total Expenses"
              value={`₹${totalExpenses.toLocaleString()}`}
              change="-3.1% from last month" 
              changeType="positive"
              icon={CreditCard}
            />
            
            <StatsCard
              title="Total Savings"
              value={`₹${totalSavings.toLocaleString()}`}
              change="+15.3% from last month"
              changeType="positive"
              icon={PiggyBank}
            />
          </div>

          {/* Budget Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Budget Card */}
            <div className="bg-gradient-card rounded-lg p-6 shadow-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Monthly Budget</h3>
                <Button variant="ghost" size="sm">View Details</Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Budgeted</span>
                  <span className="font-semibold text-foreground">₹{monthlyBudget.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Spent</span>
                  <span className="font-semibold text-foreground">₹{monthlySpent.toLocaleString()}</span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      budgetProgress > 90 ? 'bg-destructive' : 
                      budgetProgress > 75 ? 'bg-warning' : 'bg-gradient-success'
                    }`}
                    style={{ width: `${Math.min(budgetProgress, 100)}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-muted-foreground">
                    {budgetProgress.toFixed(1)}% used
                  </span>
                  <span className={`text-sm font-medium ${
                    remainingBudget >= 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    ₹{Math.abs(remainingBudget).toLocaleString()} {remainingBudget >= 0 ? 'remaining' : 'over budget'}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-card rounded-lg p-6 shadow-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              
              <div className="space-y-3">
                {[
                  { type: 'income', title: 'Salary Deposit', amount: 5500, icon: ArrowUpRight },
                  { type: 'expense', title: 'Grocery Shopping', amount: -180, icon: ArrowDownRight },
                  { type: 'expense', title: 'Netflix Subscription', amount: -15.99, icon: ArrowDownRight },
                  { type: 'income', title: 'Freelance Project', amount: 850, icon: ArrowUpRight },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'income' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                      }`}>
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{activity.title}</span>
                    </div>
                    <span className={`text-sm font-semibold ${
                      activity.type === 'income' ? 'text-success' : 'text-destructive'
                    }`}>
                      {activity.amount > 0 ? '+' : ''}₹{Math.abs(activity.amount).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    };