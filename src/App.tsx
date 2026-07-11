import { useMemo, useState } from "react";
import { ChartPieDonutText } from "./pie-chart/PieChart";
import { Calendar, CalendarDayButton } from "./components/ui/calendar";
import { DataTable } from "./table/data-table";
import Navbar from "./components/Navbar";
import { ExpenseProvider, useLocalStorage } from "./lib/local-storage-hook";
import AddExpenseDialogForm from "./components/AddExpenseDialogForm";
import { columns } from "./table/columns";

export default function App() {
  const [date, setDate] = useState<Date>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const [isMonthlyView, setIsMonthlyView] = useState<boolean>(true);
  const {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    getMonthlyCategoryTotalsArray,
    getMonthlyTotal,
    getDailyExpenses,
    getMonthlyExpenses,
  } = useLocalStorage();
  const monthlyCategoryTotals = useMemo(
    () =>
      getMonthlyCategoryTotalsArray(month?.getFullYear(), month?.getMonth()),
    [month, expenses],
  );
  const monthlyTotal = useMemo(
    () => getMonthlyTotal(month?.getFullYear(), month?.getMonth()),
    [month, expenses],
  );
  const dailyExpenses = useMemo(() => getDailyExpenses(date), [date, expenses]);
  const monthlyExpenses = useMemo(
    () => getMonthlyExpenses(month.getFullYear(), month.getMonth()),
    [expenses, month],
  );
  const previousMonthTotal = useMemo(() => {
    const prev = new Date(month.getFullYear(), month.getMonth() - 1, 1);
    return getMonthlyTotal(prev.getFullYear(), prev.getMonth());
  }, [month, expenses]);
  const trendPercentage = useMemo(() => {
    if (previousMonthTotal === 0 && monthlyTotal === 0) return 0;
    if (previousMonthTotal === 0) return null;
    return Number(
      (
        ((monthlyTotal - previousMonthTotal) / previousMonthTotal) *
        100
      ).toFixed(1),
    );
  }, [monthlyTotal, previousMonthTotal]);

  return (
    <div className="relative">
      <Navbar />
      <div className="grid grid-cols-1 gap-4 p-4 max-w-4xl mx-auto md:grid-cols-2">
        <ExpenseProvider
          deleteExpense={deleteExpense}
          updateExpense={updateExpense}
          addExpense={addExpense}
        >
          <ChartPieDonutText
            classname="md:order-1"
            chartData={monthlyCategoryTotals}
            totalExpenses={monthlyTotal}
            month={month}
            trendPercentage={trendPercentage}
          />
          <Calendar
            mode="single"
            month={month}
            onMonthChange={(e) => {
              setMonth(e);
              setIsMonthlyView(true);
            }}
            selected={date}
            onSelect={(e) => {
              setDate(e);
              setIsMonthlyView(false);
            }}
            className="w-full md:order-2"
            components={{
              DayButton: ({ children, modifiers, day, ...props }) => {
                return (
                  <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                    {children}
                    {!modifiers.outside && (
                      <span>
                        $
                        {monthlyExpenses
                          .filter(
                            ({ date }) =>
                              date.getDate() === day.date.getDate() &&
                              date.getMonth() === day.date.getMonth() &&
                              date.getFullYear() === day.date.getFullYear(),
                          )
                          .reduce(
                            (total, current) => total + current.amount,
                            0,
                          )}
                      </span>
                    )}
                  </CalendarDayButton>
                );
              },
            }}
            required
          />
          <DataTable
            columns={columns}
            data={isMonthlyView ? monthlyExpenses : dailyExpenses}
            className="md:col-span-2 md:order-4"
            isMonthlyView={isMonthlyView}
            month={month}
            date={date}
          />
        </ExpenseProvider>
      </div>
    </div>
  );
}
