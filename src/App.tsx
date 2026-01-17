import { useState } from "react";
import { ChartPieDonutText } from "./pie-chart/PieChart";
import { Calendar } from "./components/ui/calendar";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import Navbar from "./components/Navbar";
import { useLocalStorage } from "./lib/local-storage-api";
import AddExpenseDialogForm from "./components/AddExpenseDialogForm";
export default function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { expenses, addExpense } = useLocalStorage();

  return (
    <div className="relative">
      <Navbar />
      <div className="space-y-4 p-4">
        <ChartPieDonutText />
        <AddExpenseDialogForm addExpense={addExpense} className="w-full" />
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full"
        />
        <DataTable columns={columns} data={expenses} />
      </div>
    </div>
  );
}
