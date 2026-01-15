import { useState } from "react";
import ExpensePieChart from "./pie-chart/PieChart";
import { Calendar } from "./components/ui/calendar";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import Navbar from "./components/Navbar";
import { useLocalStorage } from "./lib/local-storage-api";
import AddExpenseDialogForm from "./components/AddExpenseDialogForm";
export default function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const {
    expenses,
    addExpense,
    getExpense,
    updateExpense,
    deleteExpense,
    deleteExpenses,
    clearExpenses,
    totalExpenses,
    expenseCount,
  } = useLocalStorage();

  return (
    <div className="relative">
      <Navbar />
      <div className="flex flex-col items-center p-4 gap-2">
        <ExpensePieChart />
        <AddExpenseDialogForm />
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border min-w-sm"
        />
        <DataTable columns={columns} data={expenses} />
      </div>
    </div>
  );
}
