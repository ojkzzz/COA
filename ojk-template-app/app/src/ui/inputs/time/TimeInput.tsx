import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { InputType } from "types/input";

const TimeInput = forwardRef<HTMLDivElement, InputType>(
  (
    {
      form,
      name,
      type,
      label,
      mask,
      shrink = true,
      minTime,
      maxTime,
      transformValue,
      ...otherProps
    },
    ref
  ) => {
    return (
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, value } }) => (
          <TimePicker
            ref={ref}
            sx={otherProps.sx}
            label={label}
            value={value ? dayjs(value, "HH:mm") : null}
            onChange={(time) => {
              onChange(time ? time.format("HH:mm") : "");
            }}
            ampm={false}
            minTime={minTime}
            maxTime={maxTime}
          />
        )}
      />
    );
  }
);

export default TimeInput;
