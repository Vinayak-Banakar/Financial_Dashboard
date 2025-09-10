import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Percent, DollarSign } from "lucide-react";
import type { Loan } from "@/types/financial";

interface LoanListProps {
  loans: Loan[];
}

export const LoanList = ({ loans }: LoanListProps) => {
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

  const getProgressValue = (currentBalance: number, principal: number) => {
    return ((principal - currentBalance) / principal) * 100;
  };

  const getLoanTypeColor = (type: string) => {
    switch (type) {
      case "mortgage":
        return "default";
      case "auto":
        return "secondary";
      case "student":
        return "outline";
      case "personal":
        return "secondary";
      case "credit_card":
        return "destructive";
      default:
        return "outline";
    }
  };

  const totalDebt = loans.reduce((sum, loan) => sum + loan.currentBalance, 0);
  const totalMonthlyPayments = loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Loans & Debt</h1>
        <p className="text-muted-foreground">Track your loans and debt payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-destructive" />
              <span className="text-2xl font-bold">{formatCurrency(totalDebt)}</span>
              <span className="text-muted-foreground">total debt</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{formatCurrency(totalMonthlyPayments)}</span>
              <span className="text-muted-foreground">monthly payments</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {loans.map((loan) => {
          const progressValue = getProgressValue(loan.currentBalance, loan.principal);
          
          return (
            <Card key={loan.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{loan.name}</CardTitle>
                  <Badge variant={getLoanTypeColor(loan.type)}>
                    {loan.type.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Balance</p>
                      <p className="font-semibold">{formatCurrency(loan.currentBalance)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Original Amount</p>
                      <p className="font-semibold">{formatCurrency(loan.principal)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <div className="flex items-center space-x-1">
                        <Percent className="h-4 w-4 text-muted-foreground" />
                        <p className="font-semibold">{loan.interestRate}%</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="font-semibold">{formatCurrency(loan.monthlyPayment)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{progressValue.toFixed(1)}% paid off</span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Remaining Payments</p>
                      <p className="font-semibold">{loan.remainingPayments} payments</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Next Payment</p>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="font-semibold">{formatDate(loan.nextPayment)}</p>
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