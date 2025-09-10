import { useState } from "react";
import { 
  Search, 
  Filter, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Transaction } from "@/types/financial";

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'income':
        return ArrowUpRight;
      case 'expense':
        return ArrowDownRight;
      case 'transfer':
        return ArrowLeftRight;
      default:
        return ArrowUpRight;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'income':
        return 'text-success';
      case 'expense':
        return 'text-destructive';
      case 'transfer':
        return 'text-primary';
      default:
        return 'text-foreground';
    }
  };

  const categories = Array.from(new Set(transactions.map(t => t.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">Track all your income and expenses</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          Add Transaction
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-gradient-card rounded-lg p-6 shadow-card border border-border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge
            variant={selectedCategory === "all" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory("all")}
          >
            All Categories
          </Badge>
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-gradient-card rounded-lg shadow-card border border-border overflow-hidden">
        <div className="divide-y divide-border">
          {filteredTransactions.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No transactions found matching your criteria.</p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => {
              const Icon = getTransactionIcon(transaction.type);
              const colorClass = getTransactionColor(transaction.type);
              
              return (
                <div key={transaction.id} className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-${transaction.type === 'income' ? 'success' : transaction.type === 'expense' ? 'destructive' : 'primary'}/10`}>
                        <Icon className={`w-5 h-5 ${colorClass}`} />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground">{transaction.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {transaction.category}
                          </Badge>
                          {transaction.account && (
                            <span className="text-xs text-muted-foreground">
                              {transaction.account}
                            </span>
                          )}
                        </div>
                        {transaction.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {transaction.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`text-lg font-bold ${colorClass}`}>
                        {transaction.type === 'expense' ? '-' : transaction.type === 'income' ? '+' : ''}
                        ₹{Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};