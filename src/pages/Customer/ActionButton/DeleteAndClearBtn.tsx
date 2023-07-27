import * as M from "@mui/material";
import * as I from "@mui/icons-material";
import DeleteSnackBar from "../Snackbar/DeleteSnackBar";

const DeleteAndClearBtn = ({
  status,
  cusList,
  handleDeleteSnackBarClose,
  snackbarDeleteOpen,
  handleDeleteSnackBarOpen,
  handleDeleteItem,
  handleEditExit,
  editMode,
}: any) => {
  return (
    <>
      {status ? (
        <M.Button
          onClick={() => {
            handleEditExit(cusList.id);
          }}
          color="error"
          sx={{ width: "100%", display: "inline-block" }}
        >
          <I.ClearOutlined />
        </M.Button>
      ) : (
        <>
          <M.Button
            onClick={() => {
              handleDeleteItem(cusList.id);
              handleDeleteSnackBarOpen();
            }}
            color="error"
            sx={{
              width: "100%",
              display: "inline-block",
            }}
            disabled={editMode && !cusList.status ? true : false}
          >
            <I.DeleteOutlineOutlined />
          </M.Button>
          <DeleteSnackBar
            snackbarDeleteOpen={snackbarDeleteOpen}
            handleDeleteSnackBarClose={handleDeleteSnackBarClose}
          />
        </>
      )}
    </>
  );
};

export default DeleteAndClearBtn;
