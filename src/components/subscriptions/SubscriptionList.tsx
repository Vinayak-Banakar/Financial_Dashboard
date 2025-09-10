import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign } from "lucide-react";
import type { Subscription } from "@/types/financial";

interface SubscriptionListProps {
  subscriptions: Subscription[];
}

export const SubscriptionList = ({ subscriptions }: SubscriptionListProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "paused":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const totalMonthlyAmount = subscriptions
    .filter(sub => sub.status === "active" && sub.frequency === "monthly")
    .reduce((sum, sub) => sum + sub.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Subscriptions</h1>
        <p className="text-muted-foreground">Manage your recurring subscriptions and services</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">{formatCurrency(totalMonthlyAmount)}</span>
            <span className="text-muted-foreground">total monthly active subscriptions</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {subscriptions.map((subscription) => (
          <Card key={subscription.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{subscription.name}</CardTitle>
                <Badge variant={getStatusVariant(subscription.status)}>
                  {subscription.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-semibold">{formatCurrency(subscription.amount)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Frequency</p>
                  <p className="font-semibold capitalize">{subscription.frequency}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-semibold">{subscription.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Payment</p>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="font-semibold">{formatDate(subscription.nextPayment)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};