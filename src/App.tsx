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
      <div className="grid grid-cols-1 gap-4 p-4 max-w-4xl mx-auto md:grid-cols-2">
        <ChartPieDonutText classname="md:order-1" />
        <AddExpenseDialogForm
          addExpense={addExpense}
          className="md:col-span-2 md:order-3"
        />
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full md:order-2"
        />
        <DataTable
          columns={columns}
          data={expenses}
          className="md:col-span-2 md:order-4"
        />
      </div>
    </div>
  );
}
