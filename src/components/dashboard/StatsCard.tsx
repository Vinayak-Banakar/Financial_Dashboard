import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  trend?: number[];
  className?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  className 
}: StatsCardProps) => {
  return (
    <div className={cn(
      "bg-gradient-card rounded-lg p-6 shadow-card border border-border hover:shadow-elevated transition-all duration-200",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {change && (
            <p className={cn(
              "text-sm font-medium mt-2",
              changeType === 'positive' && "text-success",
              changeType === 'negative' && "text-destructive",
              changeType === 'neutral' && "text-muted-foreground"
            )}>
              {change}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          changeType === 'positive' && "bg-success/10 text-success",
          changeType === 'negative' && "bg-destructive/10 text-destructive",
          changeType === 'neutral' && "bg-primary/10 text-primary"
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};