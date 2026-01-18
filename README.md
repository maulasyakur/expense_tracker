# Expense Tracker App

A beautiful, modern expense tracking application built with React, TypeScript, and Tailwind CSS. Features include expense CRUD operations, monthly expense visualization, and data persistence with localStorage.

## 🚀 Features

### 📊 **Expense Management**

- **Add Expenses**: Track expenses with amount, date, category, and description
- **Edit/Delete**: Update or remove expenses with confirmation dialogs
- **Local Storage**: All data persists in browser localStorage
- **CRUD Operations**: Full Create, Read, Update, Delete functionality

### 📅 **Calendar Integration**

- Interactive calendar component with month navigation
- Visual date selection for expense tracking
- Sync between calendar view and expense data

### 📈 **Data Visualization**

- **Pie/Donut Chart**: Visual breakdown of expenses by category
- **Monthly Analysis**: View expenses filtered by selected month
- **Category Breakdown**: See spending distribution across categories

### 🎨 **UI/UX Features**

- Responsive grid layout that works on mobile and desktop
- Shadcn/ui components for consistent design
- TanStack Table for data table with sorting and filtering
- Custom form validation with Zod
- Dark/light mode compatible design

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **TanStack** ecosystem:
  - TanStack Table for data tables
  - TanStack Form for form management
- **Recharts** for data visualization
- **Zod** for schema validation
- **Lucide React** for icons
- **React Day Picker** for calendar component

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Shadcn/ui components
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── ...
│   ├── AddExpenseDialogForm.tsx
│   ├── UpdateExpenseDialogForm.tsx
│   ├── Navbar.tsx
│   └── DataTablePagination.tsx
├── table/
│   ├── columns.tsx           # Table column definitions
│   └── data-table.tsx        # Data table component
├── pie-chart/
│   └── PieChart.tsx          # Expense visualization chart
├── lib/
│   ├── local-storage-hook.ts # Custom hook for localStorage CRUD
│   └── utils.ts              # Utility functions
└── App.tsx                   # Main application component
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd expense-tracker
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📋 Usage Guide

### Adding an Expense

1. Click the "Add Expense" button
2. Fill in the form:
   - **Date**: Select expense date
   - **Amount**: Enter expense amount (positive number)
   - **Category**: Choose from Food, Daily, Transportation, or Recreation
   - **Description**: Add a brief description (1-100 characters)
3. Click "Save" to add the expense

### Viewing Expenses

- All expenses are displayed in a sortable, filterable table
- Use the search box to filter by description
- Click column headers to sort by date, category, or amount
- Use pagination controls to navigate through expenses

### Editing an Expense

1. Click the three dots (⋯) on any expense row
2. Select "Edit" from the dropdown menu
3. Modify the expense details in the dialog
4. Click "Save" to update

### Deleting an Expense

1. Click the three dots (⋯) on any expense row
2. Select "Delete" from the dropdown menu
3. Confirm deletion in the alert dialog

### Monthly Analysis

- Use the calendar to select a specific month
- The pie chart updates to show category breakdown for the selected month
- The expense table filters to show only expenses from that month
- Navigate between months using the calendar controls

## 🎯 Key Components

### `useLocalStorage` Hook

A custom React hook that provides:

- **Persistence**: Automatically saves to localStorage
- **Monthly Calculations**: Get category totals by month
- **CRUD Operations**: Full expense management
- **Memoization**: Optimized performance with useMemo

### Expense Calendar

- Interactive month/year navigation
- Date selection with visual feedback
- Syncs with expense data visualization
- Built with React Day Picker

### Data Visualization

- Donut chart showing expense distribution
- Dynamic colors based on categories
- Shows total expenses in the center
- Updates in real-time as expenses change

### Responsive Data Table

- Built with TanStack Table
- Column sorting and filtering
- Pagination support
- Row selection capabilities
- Mobile-responsive design

## 🧪 Form Validation

Expense forms are validated using:

- **Zod schemas** for type safety
- **TanStack Form** for form state management
- Real-time validation feedback
- Custom error messages for each field

### Validation Rules:

- **Amount**: Must be greater than 0
- **Date**: Valid date selection required
- **Category**: Must be one of predefined categories
- **Description**: 1-100 characters required

## 📱 Responsive Design

The application is fully responsive:

- **Mobile**: Single column layout
- **Tablet**: Two-column grid with optimized spacing
- **Desktop**: Four-column grid with all components visible

## 🎨 Theming

Uses CSS variables for theming:

- Chart colors defined as CSS custom properties
- Dark/light mode compatibility
- Consistent spacing and typography scales

## 🔧 Customization

### Adding New Categories

1. Update the category enum in `UpdateExpenseDialogForm.tsx`
2. Add corresponding color in the pie chart configuration
3. Update the form validation schema

### Modifying Chart Colors

Edit the CSS variables in your global styles:

```css
:root {
  --chart-1: hsl(220, 70%, 50%);
  --chart-2: hsl(160, 60%, 45%);
  --chart-3: hsl(30, 80%, 55%);
  --chart-4: hsl(340, 75%, 55%);
}
```

### Changing Date Format

Modify the `formatDateForInput` and `parseDateFromInput` functions in the form components.

## 🚀 Deployment

Build for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 📝 Future Enhancements

Potential features to add:

- [ ] Export data to CSV/PDF
- [ ] Monthly expense reports
- [ ] Budget tracking with alerts
- [ ] Recurring expenses
- [ ] Data backup/import
- [ ] Multiple currency support
- [ ] Expense tagging system
- [ ] Advanced filtering and search
- [ ] Data charts for trend analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [TanStack](https://tanstack.com/) for amazing React tools
- [Recharts](https://recharts.org/) for charting library
- [Lucide](https://lucide.dev/) for icons

## 📧 Support

For support, questions, or feature requests, please open an issue in the GitHub repository.

---

**Built with ❤️ using modern web technologies**
