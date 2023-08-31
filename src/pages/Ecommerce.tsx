import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import { randomId } from "@mui/x-data-grid-generator";
import { useDispatch } from "react-redux";

import {
  createCodeAPI,
  createSubCodeAPI,
  deleteCodeAPI,
  deleteSubCodeAPI,
  fetchCodeListAPI,
  fetchGroupCodeAPI,
  updateCodeAPI,
  updateSubCodeAPI,
} from "api";

import {
  getCodeList,
  getSubCodeList,
} from "app/features/codeMange/codeMangeSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

export default function Ecommerce() {
  const dispatch = useDispatch();

  const [rows, setRows]: any = useState([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [subRows, setSubRows]: any = useState([]);
  const [subrowModesModel, setSubrowModesModel] = useState<GridRowModesModel>(
    {}
  );

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [groupCodeInfo, setGroupCodeInfo] = useState({
    groupCode: "",
    groupCodeName: "",
    createUserId: "",
    isDeleted: false,
  });

  const [createSubDialogOpen, setCreateSubDialogOpen] = useState(false);
  const [codeListInfo, setCodeListInfo] = useState({
    code: "",
    codeName: "",
    groupCode: "",
    createUserId: "",
    isDeleted: false,
  });

  const [columnEditMode, setColumnEditMode] = useState(false);
  const [columnActionMode, setColumnActionMode] = useState(false);

  const [subColumnEditMode, setSubColumnEditMode] = useState(false);
  const [subColumnActionMode, setSubColumnActionMode] = useState(false);

  const [selectionModel, setSelectionModel] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState<any>({});

  const [selectionSubModel, setSelectionSubModel] = useState<any>([]);
  const [selectedSubRows, setSelectedSubRows] = useState<any>({});

  // * Dialog 버튼
  const onChange = (e: any) => {
    setGroupCodeInfo({ ...groupCodeInfo, [e.target.name]: e.target.value });
  };

  const handleCreateDialogOpen = () => {
    setCreateDialogOpen(true);
  };

  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
  };

  const onSubChange = (e: any) => {
    setCodeListInfo({ ...codeListInfo, [e.target.name]: e.target.value });
  };

  const handleSubCreateDialogOpen = () => {
    setCreateSubDialogOpen(true);
  };

  const handleSubCreateDialogClose = () => {
    setCreateSubDialogOpen(false);
  };

  // ! 다중 edit  event.defaultMuiPrevented = true
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    console.log(params, event);

    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = false;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setColumnEditMode(false);
    setColumnActionMode(true);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setColumnEditMode(false);
    setColumnActionMode(false);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId, GroupCode: any) => () => {
    const choice = window.confirm(
      `그룹코드 ${selectedRows.groupCode}를 정말 삭제하시겠습니까?`
    );

    if (choice) {
      deleteCodeGroupData(id, GroupCode);
      setRows(rows.filter((row: any) => row.id !== id));
    } else {
      alert("취소되었습니다");
    }

    window.location.reload();
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setColumnEditMode(false);
    setColumnActionMode(false);

    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: any) => row.id === id);

    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.id !== id));
    }
  };

  const handleSubRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = false;
    }
  };

  const handleSubEditClick = (id: GridRowId) => () => {
    setSubColumnEditMode(false);
    setSubColumnActionMode(true);
    setSubrowModesModel({
      ...subrowModesModel,
      [id]: { mode: GridRowModes.Edit },
    });
  };

  const handleSubSaveClick = (id: GridRowId, row: any) => () => {
    setSubColumnEditMode(false);
    setSubColumnActionMode(false);
    setSubrowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    });
  };

  const handleSubDeleteClick = (id: GridRowId) => () => {
    deleteSubCode(id);
    setSubRows(subRows.filter((row: any) => row.id !== id));
  };

  const handleSubCancelClick = (id: GridRowId) => () => {
    setSubColumnEditMode(false);
    setSubColumnActionMode(false);

    setSubrowModesModel({
      ...subrowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = subRows.find((row: any) => row.id === id);

    if (editedRow!.isNew) {
      setSubRows(subRows.filter((row: any) => row.id !== id));
    }
  };

  const createCodeGroupData = async (createCodeGroup: any) => {
    try {
      await createCodeAPI(createCodeGroup);
      fetchData();
      // const data = codeDataFormatter(response);
      // const updatedRow = data;
      // setRows([...rows, updatedRow]);

      // const codeDataInfo = await fetchGroupCodeAPI();
      // const setCodeList = codeDataFormatter(codeDataInfo);
      // setRows(setCodeList);
      handleCreateDialogClose();
      // return updatedRow;
    } catch (error: any) {
      return error.response?.data;
    }
  };

  const createSubCodeData = async (subCode: any) => {
    try {
      await createSubCodeAPI(subCode);
      console.log(subCode);

      fetchData();
      handleSubCreateDialogClose();
    } catch (error: any) {
      return error.response.data;
    }
  };

  const deleteCodeGroupData = async (id: any, GroupCode: any) => {
    if (id) {
      try {
        await deleteCodeAPI(id, GroupCode);
        dispatch(getCodeList(rows));
      } catch (error: any) {
        return error.response?.data;
      }
    } else {
      alert("데이터 삭제에 실패하였습니다");
    }
  };

  const deleteSubCode = async (id: any) => {
    const choice = window.confirm(`코드를 삭제 하시겠습니까?`);

    if (id && choice) {
      try {
        await deleteSubCodeAPI(id);
        dispatch(getSubCodeList(subRows));
      } catch (error: any) {
        return error.response?.data;
      }
    } else {
      alert("데이터 삭제에 실패하였습니다");
    }
  };

  const processRowUpdate = async (newRow: GridRowModel, e: any) => {
    setColumnEditMode(false);

    column.forEach((c: any) => {
      if (c.field === "groupCode") {
        c.editable = false;
      }
    });

    if (!newRow.groupCode || !newRow.groupCodeName) {
      column.forEach((c: any) => {
        if (c.field === "groupCode") {
          c.editable = true;
        }
      });

      alert(
        "등록에 실패하였습니다. 그룹코드와 그룹코드명을 모두 작성해주십시오"
      );

      // ! 등록 실패 시 아예 지워버리는 옵션
      const codeDataInfo = await fetchGroupCodeAPI();
      const setCodeList = codeDataFormatter(codeDataInfo);
      setRows(setCodeList);

      // setColumnActionMode(false);
      // setColumnEditMode(false);

      // ! 새로고침 해서 없애기
      // window.location.reload();
      // return;

      return;
    }

    // if (newRow.status === "create") {

    // const createData = await createCodeAPI(newRow);
    // const response = await fetchGroupCodeAPI();

    // const updatedRow = { ...newRow, isNew: false };
    // console.log(updatedRow);

    // setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));

    // const modifyRow = {
    //   groupCode: newRow.groupCode,
    //   groupCodeName: newRow.groupCodeName,
    //   createUserId: "",
    //   isDeleted: false,
    // };

    // const data = await updateCodeAPI(newRow.id, newRow);
    // fetchData();

    // setSelectionModel(newRow.id);
    // setSelectedRows(newRow);

    //* Edit 로직
    await updateCodeAPI(newRow.id, newRow);
    fetchData();

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleSubRowModesModelChange = (
    newRowModesModel: GridRowModesModel
  ) => {
    setSubrowModesModel(newRowModesModel);
  };

  const processSubRowUpdate = async (newSubRow: GridRowModel) => {
    setSubColumnEditMode(false);

    columns.forEach((c: any) => {
      if (c.field === "code") {
        c.editable = false;
      }
    });

    // if (newSubRow.status === "create") {
    //   setSubColumnEditMode(false);
    //   await createSubCodeAPI(newSubRow);
    //   fetchData();

    //   const updatedRow = { ...newSubRow, isNew: false };

    //   setSubRows(
    //     subRows.map((row: any) => (row.id === newSubRow.id ? updatedRow : row))
    //   );

    //   return updatedRow;
    // }

    // const modifySubRow = {
    //   code: newSubRow.code,
    //   codeName: newSubRow.codeName,
    //   groupCode: newSubRow.groupCode,
    //   createUserId: newSubRow.createUserId,
    //   isDeleted: false,
    // };

    await updateSubCodeAPI(newSubRow.id, newSubRow);
    fetchData();

    const updatedSubRow: any = { ...newSubRow, isNew: false };
    const resultSubRows = subRows.map((row: any) => {
      if (row.id === updatedSubRow.id) {
        return updatedSubRow;
      } else {
        return row;
      }
    });

    setSubRows(resultSubRows);

    return updatedSubRow;
  };

  const column: GridColDef[] = [
    {
      field: "groupCode",
      headerName: "그룹코드",
      width: 120,
      editable: false,
    },
    {
      field: "groupCodeName",
      headerName: "그룹코드명",
      width: 370,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 110,
      cellClassName: "actions",
      getActions: (params: any) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: "primary.main" }}
              onClick={handleSaveClick(params.id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              color="inherit"
              onClick={handleCancelClick(params.id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            color="inherit"
            onClick={handleEditClick(params.id)}
            disabled={selectionModel !== params.id}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            onClick={handleDeleteClick(params.id, params.row.GroupCode)}
            disabled={selectionModel !== params.id}
          />,
        ];
      },
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "코드",
      width: 100,
      editable: false,
    },
    {
      field: "codeName",
      headerName: "코드명",
      width: 370,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params: any) => {
        const isInEditMode =
          subrowModesModel[params.id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSubSaveClick(params.id, params)}
              sx={{ color: "primary.main" }}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleSubCancelClick(params.id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleSubEditClick(params.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleSubDeleteClick(params.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  function codeDataFormatter(dataInfo: any) {
    return dataInfo.map((code: any) => {
      const {
        Id,
        GroupCode,
        GroupCodeName,
        CreateUserId,
        UpdateUserId,
        UpdateDate,
        IsDeleted,
        CreateDate,
      } = code;

      return {
        id: Id,
        groupCode: GroupCode,
        groupCodeName: GroupCodeName,
        isDeleted: IsDeleted,
        createUserId: CreateUserId,
        updateUserId: UpdateUserId,
        updateDate: UpdateDate,
        createDate: CreateDate,
      };
    });
  }

  function codeListDataFormatter(dataInfo: any) {
    return dataInfo.map((code: any) => {
      const {
        Id,
        Code,
        CodeName,
        CreateUserId,
        UpdateUserId,
        UpdateDate,
        IsDeleted,
        CreateDate,
        GroupCode,
      } = code;

      return {
        id: Id,
        code: Code,
        codeName: CodeName,
        isDeleted: IsDeleted,
        createUserId: CreateUserId,
        updateUserId: UpdateUserId,
        updateDate: UpdateDate,
        createDate: CreateDate,
        groupCode: GroupCode,
      };
    });
  }

  const fetchData = async () => {
    try {
      const codeDataInfo = await fetchGroupCodeAPI();
      const setCodeList = codeDataFormatter(codeDataInfo);

      const codeListDataInfo = await fetchCodeListAPI();
      const setSubCodeList = codeListDataFormatter(codeListDataInfo);

      setRows(setCodeList);
      setSubRows(setSubCodeList);
    } catch (error: any) {
      return error.response?.data;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSelectionModel(rows[0]?.id);
    setSelectedRows(rows[0]);
  }, [rows[0]?.id]);

  useEffect(() => {
    if (
      groupCodeInfo.groupCode &&
      groupCodeInfo.groupCodeName &&
      rows.some((r: any) => r.groupCode === groupCodeInfo.groupCode)
    ) {
      setSelectionModel(rows[rows.length - 1]?.id);
      setSelectedRows(rows[rows.length - 1]);
    }
  }, [groupCodeInfo.groupCode, groupCodeInfo.groupCodeName, rows]);

  // todo subRows Active 사이드 이펙트
  useEffect(() => {
    setSelectionSubModel(subRows[0]?.id);
    setSelectedSubRows(subRows[0]);
  }, [subRows[0]?.id]);

  console.log(selectedSubRows, "값 안찍히나?");

  const filteredCodeLists = subRows.filter(
    (x: any) => x.groupCode === selectedRows?.groupCode
  );

  // console.log(selectionModel, selectedRows, "초기값");
  // console.log(columnActionMode, columnEditMode);

  // * 툴바
  // function useCreateToolbar(props: EditToolbarProps | any) {
  //   const { setRows, setRowModesModel, column } = props;

  //   // if (columnEditMode) {
  //   //   column.forEach((c: any) => {
  //   //     if (c.field === "groupCode") {
  //   //       c.editable = true;
  //   //     }
  //   //   });
  //   // }

  //   // const handleClick = () => {
  //   //   setColumnEditMode(true);

  //   //   const id = randomId();

  //   //   console.log(rows, "데이터 클릭", rowModesModel);

  //   //   setRows((oldRows: any) => [
  //   //     {
  //   //       id,
  //   //       groupCode: "",
  //   //       groupCodeName: "",
  //   //       isDeleted: false,
  //   //       createUserId: "",
  //   //       isNew: true,
  //   //       status: "create",
  //   //     },
  //   //     ...oldRows,
  //   //   ]);

  //   //   setRowModesModel((oldModel: any) => ({
  //   //     ...oldModel,
  //   //     [id]: { mode: GridRowModes.Edit, fieldToFocus: "groupCode" },
  //   //   }));

  //   // };

  //   const handleClick = () => {
  //     setColumnEditMode(true);

  //     const id = randomId();

  //     const newDataRow = {
  //       id,
  //       groupCode: "",
  //       groupCodeName: "",
  //       isDeleted: false,
  //       createUserId: "",
  //       isNew: true,
  //     };

  //     setRows((oldRows: any) => [newDataRow, ...oldRows]);
  //     setRowModesModel((oldModel: any) => ({
  //       ...oldModel,
  //       [id]: { mode: GridRowModes.Edit, fieldToFocus: "groupCode" },
  //     }));
  //   };

  //   return (
  //     <GridToolbarContainer>
  //       <Button
  //         color="primary"
  //         startIcon={<AddIcon />}
  //         onClick={handleClick}
  //         disabled={subColumnEditMode}
  //       >
  //         등록하기
  //       </Button>
  //     </GridToolbarContainer>
  //   );
  // }

  // * 서브 툴바
  // function createSubToolbar(props: EditToolbarProps | any) {
  //   const { setSubRows, setSubrowModesModel, columns } = props;

  //   const handleSubClick = () => {
  //     setSubColumnEditMode(true);
  //     const id = randomId();

  //     setSubRows((oldRows: any) => [
  //       ...oldRows,
  //       {
  //         id,
  //         code: "",
  //         codeName: "",
  //         isDeleted: false,
  //         groupCode: "",
  //         createUserId: "",
  //         isNew: true,
  //         status: "create",
  //       },
  //     ]);

  //     setSubrowModesModel((oldModel: any) => ({
  //       ...oldModel,
  //       [id]: { mode: GridRowModes.Edit, fieldToFocus: "code" },
  //     }));
  //   };

  //   return (
  //     <GridToolbarContainer>
  //       <Button
  //         color="primary"
  //         startIcon={<AddIcon />}
  //         onClick={handleSubClick}
  //         disabled={columnEditMode}
  //       >
  //         등록하기
  //       </Button>
  //     </GridToolbarContainer>
  //   );
  // }

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h6" sx={{ mb: "1.2rem" }}>
        코드관리
      </Typography>

      <Grid sx={{ display: "flex", gap: "2.4rem" }}>
        <Box
          sx={{
            flex: 1,
            height: 500,
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },

            ".css-5wly58-MuiDataGrid-root .MuiDataGrid-cell.MuiDataGrid-cell--editing:focus-within":
              {
                zIndex: 3,
                outline: "solid #1976d2 1px",
              },
            ".css-5wly58-MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, .css-5wly58-MuiDataGrid-root .MuiDataGrid-cell:focus-within":
              { zIndex: 3, userSelect: "none" },

            ".css-5wly58-MuiDataGrid-root .MuiDataGrid-columnHeader:focus, .css-5wly58-MuiDataGrid-root .MuiDataGrid-cell":
              {
                outline:
                  columnEditMode || columnActionMode
                    ? "1px solid #e0e0e0"
                    : "inherit",
              },
            ".css-5wly58-MuiDataGrid-root .MuiDataGrid-row.Mui-selected": {
              background:
                selectedRows || selectedSubRows
                  ? "rgba(25, 118, 210, 0.08)"
                  : "inherit",
            },
          }}
        >
          <DataGrid
            key={rows.id}
            rows={rows}
            columns={column}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            rowHeight={30}
            checkboxSelection={false}
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={(newSelection: any) => {
              const [selectionID] = newSelection;
              setSelectionModel(selectionID);

              const selectedIDs = new Set(newSelection);
              const [selectedRows] = rows.filter((r: any) =>
                selectedIDs.has(r.id)
              );

              // * 코드리스트에 필터링 해야되는 매개변수들
              console.log(selectedRows, selectionID);
              setSelectedRows(selectedRows);

              // ! 이 로직 codeList Active 해결 후 해야됨
              // * 이 코드의 의도는 코드리스트 편집 도중 갑자기 그룹코드를 바꿀 떄
              // * 편집 모드를 닫기 위한 코드이다.
              // if(selectedRows.groupCode !== selectedSubRows) {
              //   console.log(columnActionMode, columnEditMode);
              //   setSubColumnActionMode(false);
              //   setSubColumnEditMode(false)
              // }
            }}
            // slots={{ toolbar: useCreateToolbar }}
            slotProps={{ toolbar: { setRows, setRowModesModel, column, rows } }}
            pageSizeOptions={[100, 200, 300]}
            // initialState={{
            //   pagination: { paginationModel: { pageSize: 100 } },
            // }}
            hideFooterPagination
            // ! setting
            onCellClick={(params: any) => {
              setSelectedRows(params.row);
            }}
            onCellDoubleClick={(params) => {
              if (params.field === "groupCodeName") {
                setColumnEditMode(true);

                setGroupCodeInfo({
                  groupCode: "",
                  groupCodeName: "",
                  createUserId: "",
                  isDeleted: false,
                });
              }
            }}
            // sx={{
            //   ".css-5wly58-MuiDataGrid-root .MuiDataGrid-row.Mui-selected": {
            //     background: selectedRows
            //       ? "rgba(25, 118, 210, 0.08)"
            //       : "inherit",
            //   },
            // }}
            // onCellEditStart={(params, event) => {
            //   console.log(params.row, event);
            // }}
            // onCellKeyDown={(params, event) => {
            //   console.log(params, event);
            // }}

            // onRowDoubleClick={(params, event) => {
            //   console.log(params, event);
            // }}
            // onRowClick={(params) => {
            //   console.log(params);
            // }}
          />

          {/* //* Dialog 주석 처리 */}
          <Button
            variant="contained"
            onClick={() => handleCreateDialogOpen()}
            sx={{ mt: "1.6rem" }}
          >
            등록
          </Button>
          <Dialog
            open={createDialogOpen}
            onClose={handleCreateDialogClose}
            sx={{ ".MuiPaper-elevation24": { p: "2rem" } }}
          >
            <DialogTitle sx={{ fontSize: "1.8rem" }}>groupCode</DialogTitle>
            <DialogContent>
              <DialogContentText fontSize="1rem">
                해당 그룹코드에 코드리스트가 추가됩니다. 아래의 양식에 맞춰서
                모두 작성해주십시오.
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
        </Box>

        <Box
          className="bot"
          sx={{
            flex: 1,
            height: 500,
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
            ".css-5wly58-MuiDataGrid-root .MuiDataGrid-columnHeader:focus, .css-5wly58-MuiDataGrid-root .MuiDataGrid-cell":
              {
                outline:
                  subColumnEditMode || subColumnActionMode
                    ? "1px solid #e0e0e0"
                    : "inherit",
              },

            ".css-5wly58-MuiDataGrid-root .MuiDataGrid-cell:focus": {
              zIndex: 3,
              outline: "solid #1976d2 1px",
            },

            ".css-5wly58-MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, .css-5wly58-MuiDataGrid-root .MuiDataGrid-cell:focus-within":
              { zIndex: 3, userSelect: "none", outline: "solid #1976d2 1px" },

            // ! 클래스 중첩 되는 문제 생각해볼것
            // ? 클래스만 별로로 지정하기만 하면 바로 해결되는 문제이다.
            // ".css-5wly58-MuiDataGrid-root .MuiDataGrid-row.Mui-selected": {
            //   background: selectedSubRows
            //     ? "rgba(25, 118, 210, 0.08)"
            //     : "inherit",
            // },

            // todo 클래스를 바꿔주니 실제로 작동한다.
            // * 원하는 동작이랑은 관계없음
            // ".css-1kwdphh-MuiDataGrid-virtualScrollerContent": {
            //   background: selectedSubRows
            //     ? "rgba(25, 118, 210, 0.08)"
            //     : "inherit",
            // },
          }}
        >
          <DataGrid
            rows={filteredCodeLists}
            columns={columns}
            editMode="row"
            rowModesModel={subrowModesModel}
            onRowModesModelChange={handleSubRowModesModelChange}
            onRowSelectionModelChange={(newSelection: any) => {
              const [selectionID] = newSelection;
              setSelectionSubModel(selectionID);

              const selectedIDs = new Set(newSelection);
              const [selectedSubRows] = subRows.filter((r: any) =>
                selectedIDs.has(r.id)
              );

              // todo 현재 선택된 코드리스트
              console.log(selectedSubRows, selectionID);
              setSelectedSubRows(selectedSubRows);
            }}
            onRowEditStop={handleSubRowEditStop}
            processRowUpdate={processSubRowUpdate}
            // slots={{ toolbar: createSubToolbar }}
            slotProps={{
              toolbar: { setSubRows, setSubrowModesModel, columns, rows },
            }}
            // pageSizeOptions={[30, 60, 90]}
            // initialState={{ pagination: { paginationModel: { pageSize: 30 } } }}
            rowHeight={30}
            hideFooterPagination
            onCellDoubleClick={(params) => {
              if (params.field === "codeName") {
                setSubColumnEditMode(true);

                setCodeListInfo({
                  code: "",
                  codeName: "",
                  groupCode: "",
                  createUserId: "",
                  isDeleted: false,
                });
              }
            }}
          />

          <Box sx={{ width: "100%", display: "flex" }}>
            <Button
              variant="contained"
              onClick={() => {
                handleSubCreateDialogOpen();
                setCodeListInfo((prevState) => ({
                  ...prevState,
                  groupCode: selectedRows.groupCode,
                }));
              }}
              sx={{ mt: "1.6rem", ml: "auto", display: "inline-block" }}
            >
              등록
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
        </Box>
      </Grid>
    </Box>
  );
}
