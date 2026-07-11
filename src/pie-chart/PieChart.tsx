"use client";

import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export const description = "A donut chart with text";

const categoryColorMap: Record<string, string> = {
  daily: "var(--chart-1)",
  food: "var(--chart-2)",
  transportation: "var(--chart-3)",
  recreation: "var(--chart-4)",
};

const monthsDict: Record<number, string> = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const chartConfig = {
  total: {
    label: "Total Expense",
  },
  daily: {
    label: "Daily",
    color: "var(--chart-1)",
  },
  food: {
    label: "Food",
    color: "var(--chart-2)",
  },
  transportation: {
    label: "Transportation",
    color: "var(--chart-3)",
  },
  recreation: {
    label: "Recreation",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function ChartPieDonutText({
  classname,
  chartData,
  totalExpenses,
  month,
  trendPercentage,
}: {
  classname?: string;
  chartData: {
    category: string;
    total: number;
  }[];
  totalExpenses: number;
  month: Date;
  trendPercentage: number | null | undefined;
}) {
  const hasData = chartData.length > 0 && totalExpenses > 0;

  const transformedData = React.useMemo(() => {
    if (!hasData) {
      return [{ category: "empty", total: 1, fill: "var(--muted-foreground)" }];
    }
    return chartData.map((item) => ({
      category: item.category,
      total: item.total,
      fill: categoryColorMap[item.category],
    }));
  }, [chartData, hasData]);

  console.log("transformedData", transformedData);

  return (
    <Card className={cn("flex flex-col", classname)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Expense This Month</CardTitle>
        <CardDescription>
          {monthsDict[month.getMonth()]} {month.getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            {hasData && (
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
            )}
            <Pie
              data={transformedData}
              dataKey="total"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ${totalExpenses.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Expense
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {hasData && (
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            {trendPercentage == null ? (
              <>No data from last month <TrendingUp className="h-4 w-4" /></>
            ) : trendPercentage > 0 ? (
              <>Trending up by {trendPercentage}% this month <TrendingUp className="h-4 w-4 text-green-500" /></>
            ) : trendPercentage < 0 ? (
              <>Trending down by {Math.abs(trendPercentage)}% this month <TrendingDown className="h-4 w-4 text-red-500" /></>
            ) : (
              <>Same as last month</>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
