import { forwardRef, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { Controller, FieldError } from "react-hook-form";
import { InputType } from "types/input";
import ReactInputMask from "react-input-mask";
import ClearIcon from "@mui/icons-material/Clear";

const TextInput = forwardRef<HTMLDivElement, InputType>(
  ({ form, name, label, mask, ...otherProps }, ref) => {
    const errors = form.formState.errors;
    const error = (errors[name] as FieldError)?.message;

    const value = form.watch(name);
    const hasValue = value && String(value).length > 1;

    const handleClearField = () => {
      if (mask) form.setValue(name, undefined);
      else form.setValue(name, "");
    };

    const [visibilityClearIcon, setVisibilityClearIcon] = useState(false);
    const hideClearIcon = () => setVisibilityClearIcon(false);
    const showClearIcon = () => setVisibilityClearIcon(true);

    if (mask) {
      return (
        <Controller
          name={name}
          control={form.control}
          render={({ field }) => (
            <ReactInputMask
              mask={String(mask)}
              maskPlaceholder={null}
              value={field.value}
            >
              <TextField
                {...form.register(name)}
                {...otherProps}
                label={label}
                fullWidth
                inputRef={ref}
                variant={otherProps.variant ?? "standard"}
                error={!!error}
                type="text"
                onMouseOver={showClearIcon}
                onMouseOut={hideClearIcon}
                InputProps={{
                  endAdornment:
                    hasValue && visibilityClearIcon ? (
                      <IconButton
                        onClick={handleClearField}
                        sx={{ position: "absolute", right: 0 }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    ) : null,
                }}
                helperText={error}
              />
            </ReactInputMask>
          )}
        />
      );
    }

    return (
      <TextField
        {...form.register(name)}
        {...otherProps}
        label={label}
        fullWidth
        inputRef={ref}
        variant={otherProps.variant ?? "standard"}
        error={!!error}
        type="text"
        onMouseOver={showClearIcon}
        onMouseOut={hideClearIcon}
        InputProps={{
          endAdornment:
            hasValue && visibilityClearIcon ? (
              <IconButton
                onClick={handleClearField}
                sx={{ position: "absolute", right: 0 }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ) : null,
        }}
        helperText={error}
      />
    );
  }
);

export default TextInput;
