import { useMemo, useState } from "react";
import { ChartPieDonutText } from "./pie-chart/PieChart";
import { Calendar } from "./components/ui/calendar";
import { DataTable } from "./table/data-table";
import Navbar from "./components/Navbar";
import { ExpenseProvider, useLocalStorage } from "./lib/local-storage-hook";
import AddExpenseDialogForm from "./components/AddExpenseDialogForm";
import { columns } from "./table/columns";

export default function App() {
  const [date, setDate] = useState<Date>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    getMonthlyCategoryTotalsArray,
    getMonthlyTotal,
    getDailyExpenses,
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

  return (
    <div className="relative">
      <Navbar />
      <div className="grid grid-cols-1 gap-4 p-4 max-w-4xl mx-auto md:grid-cols-2">
        <ExpenseProvider
          deleteExpense={deleteExpense}
          updateExpense={updateExpense}
        >
          <ChartPieDonutText
            classname="md:order-1"
            chartData={monthlyCategoryTotals}
            totalExpenses={monthlyTotal}
            month={month}
          />
          <AddExpenseDialogForm
            addExpense={addExpense}
            className="md:col-span-2 md:order-3"
          />
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            selected={date}
            onSelect={setDate}
            className="w-full md:order-2"
            required
          />
          <DataTable
            columns={columns}
            data={dailyExpenses}
            className="md:col-span-2 md:order-4"
          />
        </ExpenseProvider>
        <p>{date?.toLocaleDateString()}</p>
        <p>{month?.toLocaleDateString()}</p>
      </div>
    </div>
  );
}
