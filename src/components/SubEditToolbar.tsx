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
  setSubRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setSubrowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  showQuickFilter: any;
  handleSubDeleteClick: any;
  // setCodeListInfo: any;
  selectedRows: any;
  // onSubChange: any;
  // createSubCodeData: any;
  handleSubCreateDialogOpen: any;
  setCodeListInfo: any;
  createSubDialogOpen: any;
  codeListInfo: any;
  onSubChange: any;
  handleSubCreateDialogClose: any;
  createSubCodeData: any;
}

const SubEditToolbar = (props: EditToolbarProps) => {
  const {
    setSubRows,
    setSubrowModesModel,
    handleSubDeleteClick,
    showQuickFilter,
    selectedRows,
    handleSubCreateDialogOpen,
    setCodeListInfo,
    createSubDialogOpen,
    codeListInfo,
    onSubChange,
    handleSubCreateDialogClose,
    createSubCodeData,
  } = props;

  // const [codeListInfo] = useState<any>({
  //   code: "",
  //   codeName: "",
  //   groupCode: "",
  //   createUserId: "",
  //   isDeleted: false,
  // });

  // const handleClick = async () => {
  //   const response: any = await Axios.post("Code/Codelist/new", codeListInfo);
  //   console.log(response.data);

  //   const [
  //     {
  //       Id: id,
  //       Code: code,
  //       CodeName: codeName,
  //       IsDeleted: isDeleted,
  //       GroupCode: groupCode,
  //       CreateUserId: createUserId,
  //     },
  //   ] = response.data;

  //   console.log(
  //     id,
  //     code,
  //     codeName,
  //     isDeleted,
  //     groupCode,
  //     createUserId,
  //     "초기값"
  //   );

  //   setSubRows((oldRows) => [
  //     { id, code, codeName, groupCode, createUserId, isDeleted, isNew: true },
  //     ...oldRows,
  //   ]);

  //   setSubrowModesModel((oldModel) => ({
  //     ...oldModel,
  //     [id]: { mode: GridRowModes.Edit, fieldToFocus: "code" },
  //   }));

  //   // const createSubCodeAPI = async (subCodeList: any) => {
  //   //   try {
  //   //     await Axios.post("Code/Codelist/new", subCodeList);
  //   //   } catch (error) {
  //   //     throw error;
  //   //   }
  //   // };

  //   // const [
  //   //   {
  //   //     Id: id,
  //   //     GroupCode: groupCode,
  //   //     GroupCodeName: groupCodeName,
  //   //     IsDeleted: isDeleted,
  //   //     CreateUserId: createUserId,
  //   //   },
  //   // ] = response.data;

  //   // setSubRows((oldRows) => [
  //   //   { id, groupCode, groupCodeName, createUserId, isDeleted, isNew: true },
  //   //   ...oldRows,
  //   // ]);

  //   // setSubrowModesModel((oldModel) => ({
  //   //   ...oldModel,
  //   //   [id]: { mode: GridRowModes.Edit, fieldToFocus: "groupCode" },
  //   // }));
  // };

  return (
    <GridToolbarContainer>
      <Box
        sx={{
          // display: "flex",
          // alignItems: "center",
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
          등록하기1
        </Button> */}

        <Box sx={{ width: "100%", display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AddIcon
              color="primary"
              sx={{ width: "1.3rem", height: "1.3rem" }}
            />
            <Button
              variant="text"
              onClick={() => {
                handleSubCreateDialogOpen();
                setCodeListInfo({
                  code: "",
                  codeName: "",
                  groupCode: "",
                  createUserId: "",
                  isDeleted: false,
                });
                setCodeListInfo((prevState: any) => ({
                  ...prevState,
                  groupCode: selectedRows.groupCode,
                }));
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
            open={createSubDialogOpen}
            onClose={handleSubCreateDialogClose}
            sx={{ ".MuiPaper-elevation24": { p: "2rem" } }}
          >
            <DialogTitle sx={{ fontSize: "1.8rem" }}>codeList</DialogTitle>
            <DialogContent>
              <DialogContentText fontSize="1rem">
                해당 그룹코드에 코드리스트가 추가됩니다. 아래의 양식에 맞춰서
                모두 작성해주십시오.
              </DialogContentText>
              <Box
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(1,1fr)",
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
                  value={codeListInfo.groupCode}
                  onChange={onSubChange}
                  disabled
                />
                <TextField
                  type="text"
                  margin="dense"
                  label="코드"
                  fullWidth
                  variant="outlined"
                  autoComplete="off"
                  name="code"
                  value={codeListInfo.code}
                  onChange={onSubChange}
                  autoFocus
                />
                <TextField
                  type="text"
                  margin="dense"
                  label="코드명"
                  fullWidth
                  variant="outlined"
                  autoComplete="off"
                  name="codeName"
                  value={codeListInfo.codeName}
                  onChange={onSubChange}
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: "1rem 1.4rem", gap: "1rem", mt: "1rem" }}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => handleSubCreateDialogClose()}
                fullWidth
                sx={{ p: "0.4rem" }}
              >
                취소하기
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={() => createSubCodeData(codeListInfo)}
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
            onClick={handleSubDeleteClick()}
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
      </Box>
    </GridToolbarContainer>
  );
};

export default SubEditToolbar;
