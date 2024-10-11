import { CircularProgress, Stack } from "@mui/material";

const Loader = () => {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        mt: "20px",
      }}
    >
      <CircularProgress />
    </Stack>
  );
};

export default Loader;
