import { FC } from "react";
import { RHFInputType } from "types/input";
import { TextInput } from "./text";
import { PasswordInput } from "./password";
import TimeInput from "./time/TimeInput";

const RHFInput: FC<RHFInputType> = (props) => {
  switch (props.type) {
    case "text":
      return <TextInput {...props} />;
    case "password":
      return <PasswordInput {...props} />;
    case "time":
      return <TimeInput {...props} />;
    default:
      return <TextInput {...props} />;
  }
};
export default RHFInput;
