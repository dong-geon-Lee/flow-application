import * as M from "@mui/material";
import * as I from "@mui/icons-material";

import { useSnackbar } from "hooks/useSnackBar";

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
  const AppEditSnackBar = useSnackbar(
    snackbarEditOpen,
    handleUpdateSnackBarClose,
    "info",
    "Customer Card 편집완료!"
  );

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
          {AppEditSnackBar}
        </>
      )}
    </>
  );
};

export default EditAndCompleteBtn;
