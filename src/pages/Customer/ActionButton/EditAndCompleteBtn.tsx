import * as M from "@mui/material";
import * as I from "@mui/icons-material";
import EditSnackBar from "../Snackbar/EditSnackBar";

const EditAndCompleteBtn = ({
  status,
  handleEditUpdate,
  handleEditMode,
  cusList,
  editInfo,
  editMode,
  snackbarEditOpen,
  handleUpdateSnackBarOpen,
  handleUpdateSnackBarClose,
}: any) => {
  return (
    <>
      {status ? (
        <M.Button
          sx={{ width: "100%", display: "inline-block" }}
          onClick={() => {
            handleEditUpdate(
              cusList.id,
              editInfo.editName,
              editInfo.editPhone,
              editInfo.editNotes
            );
            handleUpdateSnackBarOpen();
          }}
        >
          <I.CheckOutlined />
        </M.Button>
      ) : (
        <>
          <M.Button
            sx={{ width: "100%", display: "inline-block" }}
            onClick={() => handleEditMode(cusList?.id)}
            disabled={editMode && !cusList.status ? true : false}
          >
            <I.Edit />
          </M.Button>
          <EditSnackBar
            snackbarEditOpen={snackbarEditOpen}
            handleUpdateSnackBarClose={handleUpdateSnackBarClose}
          />
        </>
      )}
    </>
  );
};

export default EditAndCompleteBtn;
