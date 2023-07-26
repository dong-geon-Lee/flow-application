import * as M from "@mui/material";

const SnackBar = ({ snackBarOpen, handleSnackbarClose }: any) => {
  return (
    <M.Snackbar
      open={snackBarOpen}
      autoHideDuration={5000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ p: "2rem" }}
    >
      <M.Alert
        onClose={handleSnackbarClose}
        severity="success"
        sx={{
          width: "100%",
          p: "1.2rem",
          display: "flex",
          alignItems: "center",
          borderRadius: "1rem",
          fontWeight: "500",
        }}
      >
        Customer Card를 추가하였습니다.
      </M.Alert>
    </M.Snackbar>
  );
};

export default SnackBar;
