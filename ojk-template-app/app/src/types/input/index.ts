import { TextFieldProps } from "@mui/material";
import { Dayjs } from "dayjs";
import { ChangeEvent } from "react";
import { UseFormReturn } from "react-hook-form";

export type InputType = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  mask?: string | Array<any>;
  shrink?: boolean;
  minTime?: Dayjs;
  maxTime?: Dayjs;
  transformValue?: (event: ChangeEvent<HTMLInputElement>) => string;
} & TextFieldProps;

export type RHFInputType = { type: string } & InputType;

export interface RHFInputTypeWithoutForm extends Omit<RHFInputType, "form"> {}
