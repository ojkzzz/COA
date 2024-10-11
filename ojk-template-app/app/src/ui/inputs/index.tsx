import { FC } from "react";
import { RHFInputType } from "types/input";
import { TextInput } from "./text";
import { PasswordInput } from "./password";
import TimeInput from "./time/TimeInput";

const RHFInput: FC<RHFInputType> = ({
  type,
  form,
  name,
  label,
  minTime,
  maxTime,
  ...otherProps
}) => {
  switch (type) {
    case "text":
      return <TextInput form={form} name={name} label={label} {...otherProps} />;
      break;
    case "password":
      return <PasswordInput form={form} name={name} label={label} {...otherProps} />;
      break;
    case "time":
      return (
        <TimeInput
          form={form}
          name={name}
          label={label}
          {...otherProps}
          minTime={minTime}
          maxTime={maxTime}
        />
      );
      break;
    default:
      return <TextInput form={form} name={name} label={label} {...otherProps} />;
      break;
      break;
  }
};
export default RHFInput;
