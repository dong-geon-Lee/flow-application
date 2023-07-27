import * as M from "@mui/material";
import * as I from "@mui/icons-material";

const EditAndCompleteBtn = ({
  status,
  handleEditUpdate,
  handleEditMode,
  cusList,
  editInfo,
  editMode,
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
          }}
        >
          <I.CheckOutlined />
        </M.Button>
      ) : (
        <M.Button
          sx={{ width: "100%", display: "inline-block" }}
          onClick={() => {
            handleEditMode(cusList?.id);
          }}
          disabled={editMode && !cusList.status ? true : false}
        >
          <I.Edit />
        </M.Button>
      )}
    </>
  );
};

export default EditAndCompleteBtn;
