"use client";

import type { TextFieldProps } from "@mui/material/TextField";
import type { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

interface DatePickerFieldProps {
  label?: string;
  value?: string | null;
  onChange: (value: string | null) => void;
  error?: boolean;
  helperText?: string;
  disableFuture?: boolean; // for DOB use case
  disablePast?: boolean; // for cases like “start date in future”
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

export function DatePickerField({
  label = "Select Date",
  value,
  onChange,
  error,
  helperText,
  disableFuture = false,
  disablePast = false,
  minDate,
  maxDate,
}: DatePickerFieldProps) {
  // Convert stored string to dayjs object
  const dateValue = value ? dayjs(value) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={dateValue}
        onChange={(newValue) =>
          onChange(newValue ? newValue.format("YYYY-MM-DD") : null)
        }
        disableFuture={disableFuture}
        disablePast={disablePast}
        minDate={minDate}
        maxDate={maxDate}
        slotProps={{
          textField: {
            error,
            helperText,
            fullWidth: true,
          } satisfies TextFieldProps,
        }}
      />
    </LocalizationProvider>
  );
}
