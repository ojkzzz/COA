import { Paper, Button, Typography } from "@mui/material";
import { useAppDispatch } from "store/hooks/hooks";
import { setAuth } from "store/auth/auth.slice";
import {
  removeAccessTokenFromStorage,
  removeRefreshTokenFromStorage,
} from "utils/tokens";

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "60px",
    padding: "12px",
    position: "relative",
  },
  title: {
    position: "absolute",
    left: "12px",
    padding: "5px 10px",
    animation: "3s border infinite",
    borderWidth: "4px",
    fontWeight: "600",
    borderStyle: "solid",
    "@keyframes border": {
      "0%": {
        borderColor: "transparent",
      },
      "50%": {
        borderColor: "red",
      },
      "100%": {
        borderColor: "transparent",
      },
    },
  },
};

const Header = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(setAuth(false));
    removeAccessTokenFromStorage();
    removeRefreshTokenFromStorage();
  };

  return (
    <Paper sx={styles.root}>
      <Typography sx={styles.title}>Лидогенерация</Typography>
      <Button sx={{ justifySelf: "flex-end" }} onClick={logout}>
        Выйти
      </Button>
    </Paper>
  );
};
export default Header;
