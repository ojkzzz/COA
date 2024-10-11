import { yupResolver } from "@hookform/resolvers/yup";
import { Paper, Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Slide, ToastContainer } from "react-toastify";
import { useAppDispatch } from "../../store/hooks/hooks";
import { authSchema } from "validation/login/login.yup";
import { RHFInputTypeWithoutForm } from "types/input";
import RHFInput from "ui/inputs";

const styles = {
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mt: "70px",
  },
  paper: {
    p: "30px",
    width: "450px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
};

const fields: RHFInputTypeWithoutForm[] = [
  {
    name: "login",
    label: "Логин",
    type: "text",
  },
  {
    name: "password",
    label: "Пароль",
    type: "password",
  },
];

interface IForm {
  login: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const form = useForm<IForm>({
    resolver: yupResolver(authSchema),
  });
  const submit: SubmitHandler<IForm> = (data) => {
    console.log(data);
    dispatch;
  };

  return (
    <Stack sx={styles.root}>
      <form onSubmit={form.handleSubmit(submit)}>
        <Paper sx={styles.paper} elevation={10}>
          <Typography alignSelf="center" fontWeight={700} fontSize={18}>
            Авторизация
          </Typography>
          <Stack gap="12px" my="20px">
            {fields.map((field) => (
              <RHFInput key={field.name} form={form} {...field} />
            ))}
          </Stack>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={false}
            sx={{ my: "20px" }}
          >
            Войти
          </LoadingButton>
        </Paper>
      </form>
      <ToastContainer
        transition={Slide}
        position="bottom-right"
        hideProgressBar
      />
    </Stack>
  );
};

export default LoginPage;
