import { TextFieldProps } from "@mui/material";
import { UseFormReturn } from "react-hook-form";

export type InputType = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
} & TextFieldProps;

export type RHFInputType = { type: string } & InputType;

export interface RHFInputTypeWithoutForm extends Omit<RHFInputType, "form"> {}
