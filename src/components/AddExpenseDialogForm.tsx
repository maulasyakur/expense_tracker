import { Calendar, DollarSign, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import z, { date } from "zod";
import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import type { Expense } from "@/table/columns";

const formSchema = z.object({
  amount: z.number().gt(0, "Expense amount must be greater than $0"),
  date: z.date("Please select a date."),
  category: z.enum(
    ["food", "daily", "transportation", "recreation"],
    "Please choose a category."
  ),
  description: z
    .string()
    .min(1, "Please Provide some description")
    .max(100, "Description must be less than 100 letters"),
});

const formatDateForInput = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Helper function to parse date from input
const parseDateFromInput = (dateString: string) => {
  return new Date(dateString + "T00:00:00"); // Add time to avoid timezone issues
};

export default function AddExpenseDialogForm() {
  const form = useForm({
    defaultValues: {
      amount: 1,
      date: new Date(),
      category: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      console.log("Form submitted successfully", value);
      const expense: Expense = {
        id: crypto.randomUUID(),
        amount: value.amount,
        date: value.date,
        category: value.category,
        description: value.description,
      };
      // handleAddExpense(expense);
      form.reset();
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Log an Expense
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add an expense</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="date"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Date of Expense
                    </FieldLabel>
                    <Input
                      placeholder="59"
                      type="date"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      value={formatDateForInput(field.state.value)}
                      onChange={(e) =>
                        field.handleChange(parseDateFromInput(e.target.value))
                      }
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="amount"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Amount of expense
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        placeholder="59"
                        type="number"
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                        aria-invalid={isInvalid}
                      />
                      <InputGroupAddon>
                        <DollarSign />
                      </InputGroupAddon>
                    </InputGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="category"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor="form-tanstack-select-category">
                        Category
                      </FieldLabel>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        id="form-tanstack-select-category"
                        aria-invalid={isInvalid}
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectItem value="food" autoFocus>
                          Food
                        </SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="transportation">
                          Transportation
                        </SelectItem>
                        <SelectItem value="recreation">Recreation</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            />
            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Eating out..."
                        aria-invalid={isInvalid}
                      />
                    </InputGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <Button type="submit">"Save"</Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
