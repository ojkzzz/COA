import { forwardRef, useState } from "react";
import { InputType } from "types/input";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { FieldError } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordInput = forwardRef<HTMLDivElement, InputType>(
  ({ form, name, label, ...otherProps }, ref) => {
    const [inputType, setInputType] = useState<"text" | "password">("password");
    const changeInputType = () => {
      if (inputType === "password") setInputType("text");
      else setInputType("password");
    };

    const form_errors = form.formState.errors;
    const this_error = (form_errors[name] as FieldError)?.message;

    return (
      <TextField
        {...otherProps}
        {...form.register(name)}
        label={label}
        variant="standard"
        type={inputType}
        error={!!this_error}
        helperText={this_error}
        InputProps={{
          ref,
          endAdornment: (
            <Tooltip title={inputType === "password" ? "Показать пароль" : "Скрыть пароль"}>
              <IconButton onClick={changeInputType}>
                {inputType === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </Tooltip>
          ),
        }}
      />
    );
  }
);

export default PasswordInput;
