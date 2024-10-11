import * as yup from "yup";
import { messages } from "constants/messages";

export const authSchema = yup
  .object({
    login: yup.string().required(messages.REQUIRED),
    password: yup.string().required(messages.REQUIRED),
  })
  .required();
