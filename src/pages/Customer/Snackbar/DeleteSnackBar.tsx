import * as M from "@mui/material";

const DeleteSnackBar = ({
  snackbarDeleteOpen,
  handleDeleteSnackBarClose,
}: any) => {
  return (
    <M.Snackbar
      open={snackbarDeleteOpen}
      autoHideDuration={5000}
      onClose={handleDeleteSnackBarClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ p: "2rem" }}
    >
      <M.Alert
        onClose={handleDeleteSnackBarClose}
        severity="error"
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          borderRadius: "1rem",
          fontWeight: "500",
        }}
      >
        Customer Card가 삭제되었습니다.
      </M.Alert>
    </M.Snackbar>
  );
};

export default DeleteSnackBar;
