// hooks/useLocalStorageCRUD.ts
import type { Expense } from "@/table/columns";
import {
  useState,
  useEffect,
  createContext,
  type ReactNode,
  useContext,
  useMemo,
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

  // Calculate category totals - memoized for performance
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    expenses.forEach((expense) => {
      const category = expense.category;
      if (!totals[category]) {
        totals[category] = 0;
      }
      totals[category] += expense.amount;
    });

    return totals;
  }, [expenses]);

  // Calculate total of all expenses
  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  // Get categories as an array of objects with name and total
  const categoryTotalsArray = useMemo(() => {
    return Object.entries(categoryTotals).map(([category, total]) => ({
      category,
      total,
    }));
  }, [categoryTotals]);

  // Get categories sorted by amount (highest first)
  const sortedCategoryTotals = useMemo(() => {
    return categoryTotalsArray.sort((a, b) => b.total - a.total);
  }, [categoryTotalsArray]);

  // Get top spending category
  const topCategory = useMemo(() => {
    if (sortedCategoryTotals.length === 0) return null;
    return sortedCategoryTotals[0];
  }, [sortedCategoryTotals]);

  // Get expenses by category
  const getExpensesByCategory = (category: string) => {
    return expenses.filter((expense) => expense.category === category);
  };

  // Get category total (individual category)
  const getCategoryTotal = (category: string): number => {
    return categoryTotals[category] || 0;
  };

  // Get category percentage of total
  const getCategoryPercentage = (category: string): number => {
    if (totalExpenses === 0) return 0;
    return ((categoryTotals[category] || 0) / totalExpenses) * 100;
  };

  // Calculate monthly category totals
  const getMonthlyCategoryTotals = (year?: number, month?: number) => {
    const monthlyTotals: Record<string, number> = {};

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      const expenseYear = expenseDate.getFullYear();
      const expenseMonth = expenseDate.getMonth() + 1; // 1-12

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

  // Calculate category totals for a specific month
  const getCategoryTotalsForMonth = (year: number, month: number) => {
    return getMonthlyCategoryTotals(year, month);
  };

  // Calculate category totals for current month
  const getCurrentMonthCategoryTotals = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    return getCategoryTotalsForMonth(currentYear, currentMonth);
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

  const deleteExpenses = (ids: string[]) => {
    setExpenses((prev) => prev.filter((expense) => !ids.includes(expense.id)));
  };

  const clearExpenses = () => {
    setExpenses([]);
  };

  return {
    // Data
    expenses,

    // Category calculations
    categoryTotals, // Object: { food: 150, transportation: 75, ... }
    categoryTotalsArray, // Array: [{category: "food", total: 150, percentage: 60}, ...]
    sortedCategoryTotals, // Array sorted by total descending
    topCategory, // Top spending category object
    totalExpenses, // Total of all expenses

    // Category calculation functions
    getExpensesByCategory,
    getCategoryTotal,
    getCategoryPercentage,
    getMonthlyCategoryTotals,
    getCategoryTotalsForMonth,
    getCurrentMonthCategoryTotals,

    // CRUD Operations
    addExpense,
    getExpense,
    updateExpense,
    deleteExpense,
    deleteExpenses,
    clearExpenses,

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
