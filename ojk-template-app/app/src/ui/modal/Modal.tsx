import { Box, IconButton, Paper, Stack, SxProps, Tooltip, colors, Typography } from "@mui/material";
import ModalMui from "@mui/material/Modal";
import { FC, ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  childrenSX?: any;
  title: string;
}

const styles: Record<string, SxProps> = {
  box: {
    width: "calc(100% - 80px)",
    height: "calc(100% - 80px)",
    m: "40px",
    overflow: "auto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: `1px solid ${colors.grey[500]}`,
  },
  children: {
    padding: "20px",
  },
};

const Modal: FC<Props> = ({ open, handleClose, children, childrenSX = {}, title }) => {
  return (
    <ModalMui open={open} onClose={handleClose}>
      <Paper elevation={10} sx={styles.box}>
        <Stack flexDirection="row" sx={styles.header}>
          <Typography fontWeight={600}>{title}</Typography>
          <Tooltip title="Закрыть окно" placement="top-start">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        <Box sx={{ ...styles.children, ...childrenSX }}>{children}</Box>
      </Paper>
    </ModalMui>
  );
};
export default Modal;
