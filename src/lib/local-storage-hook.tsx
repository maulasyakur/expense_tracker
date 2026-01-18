// hooks/useLocalStorageCRUD.ts
import type { Expense } from "@/table/columns";
import {
  useState,
  useEffect,
  createContext,
  type ReactNode,
  useContext,
} from "react";

export function useLocalStorage(storageKey: string = "expenses") {
  // Get initial data from localStorage
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      return parsed.map((expense: any) => ({
        ...expense,
        date: new Date(expense.date),
      }));
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  });

  // Save to localStorage whenever expenses change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(expenses));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [expenses, storageKey]);

  // Calculate monthly category totals
  const getMonthlyCategoryTotals = (year?: number, month?: number) => {
    const monthlyTotals: Record<string, number> = {};

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      const expenseYear = expenseDate.getFullYear();
      const expenseMonth = expenseDate.getMonth();

      // If year/month provided, filter by them
      if (year && expenseYear !== year) return;
      if (month && expenseMonth !== month) return;

      const category = expense.category;
      if (!monthlyTotals[category]) {
        monthlyTotals[category] = 0;
      }
      monthlyTotals[category] += expense.amount;
    });

    return monthlyTotals;
  };

  const getMonthlyCategoryTotalsArray = (year?: number, month?: number) => {
    const data = getMonthlyCategoryTotals(year, month);
    if (!data) return [];
    return Object.entries(data).map(([category, total]) => ({
      category,
      total,
    }));
  };

  const getMonthlyTotal = (year?: number, month?: number) => {
    const data = getMonthlyCategoryTotals(year, month);
    if (!data) return 0;
    return Object.values(data).reduce((total, current) => total + current, 0);
  };

  const getMonthlyExpenses = (year?: number, month?: number) => {
    if (!expenses) return [];
    return expenses.filter(
      ({ date }) => date.getMonth() === month && date.getFullYear() === year,
    );
  };

  // CRUD Operations (existing)
  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const getExpense = (id: string): Expense | undefined => {
    return expenses.find((expense) => expense.id === id);
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...updates } : expense,
      ),
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return {
    // Data
    expenses,

    // Monthly calculation functions
    getMonthlyCategoryTotalsArray,
    getMonthlyTotal,
    getMonthlyExpenses,

    // CRUD Operations
    addExpense,
    getExpense,
    updateExpense,
    deleteExpense,

    // Convenience
    expenseCount: expenses.length,
  };
}

interface ExpenseContextType {
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({
  children,
  deleteExpense,
  updateExpense,
}: {
  children: ReactNode;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
}) {
  return (
    <ExpenseContext.Provider value={{ deleteExpense, updateExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within ExpenseProvider");
  }
  return context;
};
