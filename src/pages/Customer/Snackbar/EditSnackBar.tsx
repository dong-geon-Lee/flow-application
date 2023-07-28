import * as M from "@mui/material";

const EditSnackBar = ({ snackbarEditOpen, handleUpdateSnackBarClose }: any) => {
  return (
    <M.Snackbar
      open={snackbarEditOpen}
      autoHideDuration={5000}
      onClose={handleUpdateSnackBarClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ p: "2rem" }}
    >
      <M.Alert
        onClose={handleUpdateSnackBarClose}
        severity="info"
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          borderRadius: "1rem",
          fontWeight: "500",
        }}
      >
        Customer Card 편집완료!
      </M.Alert>
    </M.Snackbar>
  );
};

export default EditSnackBar;
