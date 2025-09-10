export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  date: string;
  description?: string;
  account?: string;
}

export interface Budget {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  remaining: number;
  period: 'monthly' | 'yearly';
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  nextPayment: string;
  category: string;
  status: 'active' | 'paused' | 'cancelled';
  frequency: 'monthly' | 'yearly' | 'weekly';
}

export interface Loan {
  id: string;
  name: string;
  principal: number;
  currentBalance: number;
  interestRate: number;
  monthlyPayment: number;
  remainingPayments: number;
  nextPayment: string;
  type: 'mortgage' | 'auto' | 'personal' | 'student' | 'credit_card';
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  monthlyContribution: number;
  category: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netWorth: number;
  totalSavings: number;
  totalDebt: number;
  monthlyBudget: number;
  monthlySpent: number;
}