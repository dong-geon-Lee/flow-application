import * as M from "@mui/material";

export const useSnackbar = (
  snackBarOpen: any,
  handleSnackbarClose: any,
  status: any,
  text: string
) => {
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
        severity={status}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          borderRadius: "1rem",
          fontWeight: "500",
        }}
      >
        {text}
      </M.Alert>
    </M.Snackbar>
  );
};
