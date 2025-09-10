import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { TransactionList } from "@/components/transactions/TransactionList";
import { BudgetList } from "@/components/budget/BudgetList";
import { SubscriptionList } from "@/components/subscriptions/SubscriptionList";
import { LoanList } from "@/components/loans/LoanList";
import { SavingsGoalList } from "@/components/savings/SavingsGoalList";
import type { FinancialSummary, Transaction } from "@/types/financial";
import { mockBudgets, mockSubscriptions, mockLoans, mockSavingsGoals } from "@/data/mockData";

// Mock data for demonstration
const mockSummary: FinancialSummary = {
  totalIncome: 85000,
  totalExpenses: 62000,
  netWorth: 125000,
  totalSavings: 45000,
  totalDebt: 28000,
  monthlyBudget: 5200,
  monthlySpent: 4850,
};

const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "Salary Deposit",
    amount: 5500,
    type: "income",
    category: "Salary",
    date: "2024-01-15",
    account: "Checking",
    description: "Monthly salary from TechCorp"
  },
  {
    id: "2", 
    title: "Grocery Shopping",
    amount: -180,
    type: "expense",
    category: "Food & Dining",
    date: "2024-01-14",
    account: "Credit Card",
    description: "Weekly groceries at Whole Foods"
  },
  {
    id: "3",
    title: "Netflix Subscription", 
    amount: -15.99,
    type: "expense",
    category: "Entertainment",
    date: "2024-01-13",
    account: "Credit Card"
  },
  {
    id: "4",
    title: "Freelance Project",
    amount: 850,
    type: "income", 
    category: "Freelance",
    date: "2024-01-12",
    account: "PayPal",
    description: "Website design project"
  },
  {
    id: "5",
    title: "Electric Bill",
    amount: -120,
    type: "expense",
    category: "Utilities",
    date: "2024-01-11",
    account: "Checking"
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview summary={mockSummary} />;
      case "transactions":
        return <TransactionList transactions={mockTransactions} />;
      case "budget":
        return <BudgetList budgets={mockBudgets} />;
      case "subscriptions":
        return <SubscriptionList subscriptions={mockSubscriptions} />;
      case "loans":
        return <LoanList loans={mockLoans} />;
      case "savings":
        return <SavingsGoalList savingsGoals={mockSavingsGoals} />;
      default:
        return <DashboardOverview summary={mockSummary} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
