import { Alert } from "@mui/material";
import { FC } from "react";

interface Props {
  message: string;
}

const Error: FC<Props> = ({ message }) => {
  return (
    <Alert
      severity="warning"
      sx={{ width: "400px", ml: "auto", mr: "auto", mt: "20px" }}
    >
      {message}
    </Alert>
  );
};

export default Error;
