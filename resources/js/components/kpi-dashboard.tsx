
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ReactNode } from "react";

interface KpiDashboardProps {
  title: string;
  value: number;
  icon: ReactNode;
  description: string;
}
export function KpiDashboard({ title, value, icon, description }: KpiDashboardProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>
          {icon}
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">
          {description}
        </div>
      </CardFooter>
    </Card>
  )
}
