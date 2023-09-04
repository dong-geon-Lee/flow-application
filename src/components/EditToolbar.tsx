import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  GridToolbarContainer,
  GridToolbar,
} from "@mui/x-data-grid";

import { useState } from "react";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  DialogActions,
} from "@mui/material";
import { Axios } from "api";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  handleAllDelete: any;
  showQuickFilter: any;
  handleDeleteClick: any;
  selectedRows: any;

  handleCreateDialogOpen: any;
  setGroupCodeInfo: any;
  createDialogOpen: any;
  handleCreateDialogClose: any;
  groupCodeInfo: any;
  onChange: any;
  createCodeGroupData: any;
}

const EditToolbar = (props: EditToolbarProps) => {
  const {
    setRows,
    setRowModesModel,
    handleDeleteClick,
    showQuickFilter,
    handleCreateDialogOpen,
    setGroupCodeInfo,
    createDialogOpen,
    handleCreateDialogClose,
    groupCodeInfo,
    onChange,
    createCodeGroupData,
  } = props;

  const [groupCodeData] = useState<any>({
    groupCode: "",
    groupCodeName: "",
    createUserId: "",
    isDeleted: false,
  });

  const handleClick = async () => {
    const response: any = await Axios.post(
      "Code/GroupCodelist/new",
      groupCodeData
    );

    const [
      {
        Id: id,
        GroupCode: groupCode,
        GroupCodeName: groupCodeName,
        IsDeleted: isDeleted,
        CreateUserId: createUserId,
      },
    ] = response.data;

    setRows((oldRows) => [
      { id, groupCode, groupCodeName, createUserId, isDeleted, isNew: true },
      ...oldRows,
    ]);

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "groupCode" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClick}
          sx={{
            width: "10rem",
            p: 0,
            display: "flex",
            justifyContent: "start",
            ml: "0.4rem",
          }}
        >
          등록하기
        </Button> */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AddIcon color="primary" sx={{ width: "1.3rem", height: "1.3rem" }} />
          <Button
            variant="text"
            onClick={() => {
              handleCreateDialogOpen();
              setGroupCodeInfo({
                groupCode: "",
                groupCodeName: "",
                createUserId: "",
                isDeleted: false,
              });
            }}
            sx={{
              display: "inline-block",
              width: "6rem",
              p: "0rem",
              ml: "-1rem",
            }}
          >
            등록하기
          </Button>
        </Box>

        <Dialog
          open={createDialogOpen}
          onClose={handleCreateDialogClose}
          sx={{ ".MuiPaper-elevation24": { p: "2rem" } }}
        >
          <DialogTitle sx={{ fontSize: "1.8rem" }}>groupCode</DialogTitle>
          <DialogContent>
            <DialogContentText fontSize="1rem">
              해당 그룹코드에 코드리스트가 추가됩니다. 아래의 양식에 맞춰서 모두
              작성해주십시오.
            </DialogContentText>
            <Box
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                rowGap: "0.8rem",
                columnGap: "1.6rem",
                marginTop: "2rem",
              }}
            >
              <TextField
                type="text"
                margin="dense"
                label="그룹코드"
                fullWidth
                variant="outlined"
                autoComplete="off"
                name="groupCode"
                value={groupCodeInfo.groupCode}
                onChange={onChange}
                autoFocus
              />
              <TextField
                type="text"
                margin="dense"
                label="그룹코드명"
                fullWidth
                variant="outlined"
                autoComplete="off"
                name="groupCodeName"
                value={groupCodeInfo.groupCodeName}
                onChange={onChange}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: "1rem 1.4rem", gap: "1rem", mt: "1rem" }}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => handleCreateDialogClose()}
              fullWidth
              sx={{ p: "0.4rem" }}
            >
              취소하기
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                createCodeGroupData(groupCodeInfo);
              }}
              fullWidth
              sx={{ p: "0.4rem" }}
            >
              등록하기
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          color="primary"
          startIcon={<Delete />}
          onClick={handleDeleteClick()}
          sx={{
            width: "10rem",
            p: 0,
            display: "flex",
            justifyContent: "start",
          }}
        >
          삭제하기
        </Button>

        <GridToolbar
          showQuickFilter={showQuickFilter}
          sx={{ width: "100%", display: "flex", p: 0 }}
        />
      </Box>
    </GridToolbarContainer>
  );
};

export default EditToolbar;
