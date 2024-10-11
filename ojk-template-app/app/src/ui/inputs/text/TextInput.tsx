import { forwardRef } from "react";
import { TextField } from "@mui/material";
import { FieldError } from "react-hook-form";
import { InputType } from "types/input";

const TextInput = forwardRef<HTMLDivElement, InputType>(
  ({ form, name, label, ...otherProps }, ref) => {
    const form_errors = form.formState.errors;
    const this_error = (form_errors[name] as FieldError)?.message;
    return (
      <TextField
        {...otherProps}
        {...form.register(name)}
        label={label}
        variant="standard"
        helperText={this_error}
        error={!!this_error}
        InputProps={{ ref }}
      />
    );
  }
);

export default TextInput;
