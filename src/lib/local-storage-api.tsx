// hooks/useLocalStorageCRUD.ts
import type { Expense } from "@/table/columns";
import { useState, useEffect } from "react";

export function useLocalStorage(storageKey: string = "expenses") {
  // Get initial data from localStorage
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
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

  // CREATE: Add a new expense
  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  // READ: Get expense by ID
  const getExpense = (id: string): Expense | undefined => {
    return expenses.find((expense) => expense.id === id);
  };

  // UPDATE: Update an existing expense
  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...updates } : expense
      )
    );
  };

  // DELETE: Remove one expense by ID
  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  // DELETE: Remove multiple expenses by IDs
  const deleteExpenses = (ids: string[]) => {
    setExpenses((prev) => prev.filter((expense) => !ids.includes(expense.id)));
  };

  // DELETE: Clear all expenses
  const clearExpenses = () => {
    setExpenses([]);
  };

  return {
    // Data
    expenses,

    // CRUD Operations
    addExpense,
    getExpense,
    updateExpense,
    deleteExpense,
    deleteExpenses,
    clearExpenses,

    // Convenience
    totalExpenses: expenses.reduce((sum, exp) => sum + exp.amount, 0),
    expenseCount: expenses.length,
  };
}

// interface LocalStorageContextType {
//   expenses: Expense[];
//   addExpense: (expense: Expense) => void;
//   getExpense: (id: string) => Expense | undefined;
//   updateExpense: (id: string, updates: Partial<Expense>) => void;
//   deleteExpense: (id: string) => void;
//   deleteExpenses: (ids: string[]) => void;
//   clearExpenses: () => void;
//   totalExpenses: number;
//   expenseCount: number;
// }

// const LocalStorageContext = createContext<LocalStorageContextType | null>(null);

// export function LocalStorageProvider() {
//   const {
//     expenses,
//     addExpense,
//     getExpense,
//     updateExpense,
//     deleteExpense,
//     deleteExpenses,
//     clearExpenses,
//     totalExpenses,
//     expenseCount,
//   } = useLocalStorageHook();

//   return (
//     <LocalStorageContext.Provider
//       value={{
//         expenses,
//         addExpense,
//         getExpense,
//         updateExpense,
//         deleteExpense,
//         deleteExpenses,
//         clearExpenses,
//         totalExpenses,
//         expenseCount,
//       }}
//     ></LocalStorageContext.Provider>
//   );
// }

// export function useLocalStorageContext() {
//   const context = useContext(LocalStorageContext);
//   if (!context) {
//     throw Error("Local storage hook is undefined");
//   }
//   return context;
// }
