import type { Budget, Subscription, Loan, SavingsGoal } from "@/types/financial";

export const mockBudgets: Budget[] = [
  {
    id: "1",
    category: "Food & Dining",
    budgeted: 800,
    spent: 650,
    remaining: 150,
    period: "monthly"
  },
  {
    id: "2", 
    category: "Transportation",
    budgeted: 400,
    spent: 380,
    remaining: 20,
    period: "monthly"
  },
  {
    id: "3",
    category: "Entertainment", 
    budgeted: 200,
    spent: 245,
    remaining: -45,
    period: "monthly"
  },
  {
    id: "4",
    category: "Utilities",
    budgeted: 300,
    spent: 275,
    remaining: 25,
    period: "monthly"
  },
  {
    id: "5",
    category: "Shopping",
    budgeted: 500,
    spent: 320,
    remaining: 180,
    period: "monthly"
  }
];

export const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    name: "Netflix",
    amount: 15.99,
    nextPayment: "2024-02-15",
    category: "Entertainment",
    status: "active",
    frequency: "monthly"
  },
  {
    id: "2",
    name: "Spotify Premium",
    amount: 9.99,
    nextPayment: "2024-02-08",
    category: "Entertainment", 
    status: "active",
    frequency: "monthly"
  },
  {
    id: "3",
    name: "Adobe Creative Suite",
    amount: 52.99,
    nextPayment: "2024-02-20",
    category: "Software",
    status: "active",
    frequency: "monthly"
  },
  {
    id: "4",
    name: "Gym Membership",
    amount: 45.00,
    nextPayment: "2024-02-01",
    category: "Health & Fitness",
    status: "active",
    frequency: "monthly"
  },
  {
    id: "5",
    name: "Cloud Storage",
    amount: 99.99,
    nextPayment: "2024-08-15",
    category: "Software",
    status: "paused",
    frequency: "yearly"
  }
];

export const mockLoans: Loan[] = [
  {
    id: "1",
    name: "Home Mortgage",
    principal: 350000,
    currentBalance: 287500,
    interestRate: 3.75,
    monthlyPayment: 1620,
    remainingPayments: 276,
    nextPayment: "2024-02-01",
    type: "mortgage"
  },
  {
    id: "2",
    name: "Car Loan",
    principal: 25000,
    currentBalance: 18750,
    interestRate: 4.2,
    monthlyPayment: 465,
    remainingPayments: 42,
    nextPayment: "2024-02-05",
    type: "auto"
  },
  {
    id: "3",
    name: "Student Loan",
    principal: 45000,
    currentBalance: 32000,
    interestRate: 5.8,
    monthlyPayment: 285,
    remainingPayments: 148,
    nextPayment: "2024-02-10",
    type: "student"
  },
  {
    id: "4",
    name: "Credit Card",
    principal: 8500,
    currentBalance: 3200,
    interestRate: 18.99,
    monthlyPayment: 150,
    remainingPayments: 24,
    nextPayment: "2024-02-15",
    type: "credit_card"
  }
];

export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    targetAmount: 15000,
    currentAmount: 8500,
    targetDate: "2024-12-31",
    monthlyContribution: 650,
    category: "Emergency"
  },
  {
    id: "2", 
    name: "Vacation to Europe",
    targetAmount: 5000,
    currentAmount: 2800,
    targetDate: "2024-07-15",
    monthlyContribution: 400,
    category: "Travel"
  },
  {
    id: "3",
    name: "New Car Down Payment", 
    targetAmount: 8000,
    currentAmount: 3500,
    targetDate: "2025-03-01",
    monthlyContribution: 350,
    category: "Transportation"
  },
  {
    id: "4",
    name: "Home Renovation",
    targetAmount: 25000,
    currentAmount: 12000,
    targetDate: "2025-06-30", 
    monthlyContribution: 800,
    category: "Home"
  }
];