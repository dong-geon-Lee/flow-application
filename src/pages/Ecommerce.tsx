import { useState, useEffect, useRef } from "react";
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

// const initialRows: GridRowsProp = [
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: "25",
//     joinDate: randomCreatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: "36",
//     joinDate: randomCreatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: "19",
//     joinDate: randomCreatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: "28",
//     joinDate: randomCreatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: "23",
//     joinDate: randomCreatedDate(),
//   },
// ];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

export default function Ecommerce() {
  // const { codeList } = useSelector((state: any) => state.code);
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
  const [subColumnEditMode, setSubColumnEditMode] = useState(false);

  const groupCodeRef: any = useRef(null);

  const [selectedGroupCode, setSelectedGroupCode] = useState<any>({});
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectionModel, setSelectionModel] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState<any>({});

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

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = false;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId, row: any) => () => {
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
    setSubrowModesModel({
      ...subrowModesModel,
      [id]: { mode: GridRowModes.Edit },
    });
  };

  const handleSubSaveClick = (id: GridRowId, row: any) => () => {
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
      handleCreateDialogClose();
    } catch (error: any) {
      return error.response.data;
    }
  };

  const createSubCodeData = async (subCode: any) => {
    try {
      await createSubCodeAPI(subCode);
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

  const processRowUpdate = async (newRow: GridRowModel) => {
    column.forEach((c: any) => {
      if (c.field === "groupCode") {
        c.editable = false;
      }
    });

    if (newRow.mode === "create") {
      setColumnEditMode(false);
      await createCodeAPI(newRow);
      fetchData();

      const updatedRow = { ...newRow, isNew: false };
      setRows(
        rows.map((row: any) => (row.id === newRow.id ? updatedRow : row))
      );

      return updatedRow;
    }

    const modifyRow = {
      groupCode: newRow.groupCode,
      groupCodeName: newRow.groupCodeName,
      createUserId: "",
      isDeleted: false,
    };

    await updateCodeAPI(newRow.id, modifyRow);
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
    columns.forEach((c: any) => {
      if (c.field === "code") {
        c.editable = false;
      }
    });

    if (newSubRow.mode === "create") {
      setSubColumnEditMode(false);
      await createSubCodeAPI(newSubRow);
      fetchData();

      const updatedRow = { ...newSubRow, isNew: false };
      setSubRows(
        subRows.map((row: any) => (row.id === newSubRow.id ? updatedRow : row))
      );

      return updatedRow;
    }

    const modifySubRow = {
      code: newSubRow.code,
      codeName: newSubRow.codeName,
      groupCode: newSubRow.groupCode,
      createUserId: newSubRow.createUserId,
      isDeleted: false,
    };

    await updateSubCodeAPI(newSubRow.id, modifySubRow);
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

  // const columns: GridColDef[] = [
  //   { field: "name", headerName: "Name", width: 180, editable: false },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "text",
  //     width: 80,
  //     align: "left",
  //     headerAlign: "left",
  //     editable: true,
  //   },
  //   {
  //     field: "joinDate",
  //     headerName: "Join date",
  //     type: "date",
  //     width: 180,
  //     editable: true,
  //   },
  //   {
  //     field: "actions",
  //     type: "actions",
  //     headerName: "Actions",
  //     width: 100,
  //     cellClassName: "actions",
  //     getActions: ({ id }) => {
  //       const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

  //       if (isInEditMode) {
  //         return [
  //           <GridActionsCellItem
  //             icon={<SaveIcon />}
  //             label="Save"
  //             sx={{
  //               color: "primary.main",
  //             }}
  //             onClick={handleSaveClick(id)}
  //           />,
  //           <GridActionsCellItem
  //             icon={<CancelIcon />}
  //             label="Cancel"
  //             className="textPrimary"
  //             onClick={handleCancelClick(id)}
  //             color="inherit"
  //           />,
  //         ];
  //       }

  //       return [
  //         <GridActionsCellItem
  //           icon={<EditIcon />}
  //           label="Edit"
  //           className="textPrimary"
  //           onClick={handleEditClick(id)}
  //           color="inherit"
  //         />,
  //         <GridActionsCellItem
  //           icon={<DeleteIcon />}
  //           label="Delete"
  //           onClick={handleDeleteClick(id)}
  //           color="inherit"
  //         />,
  //       ];
  //     },
  //   },
  // ];

  const column: GridColDef[] = [
    {
      field: "groupCode",
      headerName: "그룹코드",
      width: 120,
      editable: false,
      cellClassName: "super__tree",
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
              onClick={handleSaveClick(params.id, params)}
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
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            onClick={handleDeleteClick(params.id, params.row.GroupCode)}
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

  // function EditToolbar(props: EditToolbarProps) {
  //   const { setRows, setRowModesModel } = props;

  //   const handleClick = () => {
  //     const id = randomId();

  //     setRows((oldRows) => [
  //       ...oldRows,
  //       { id, GroupCode: "", GroupCodeName: "", isNew: true },
  //     ]);

  //     setRowModesModel((oldModel) => ({
  //       ...oldModel,
  //       [id]: { mode: GridRowModes.Edit, fieldToFocus: "GroupCode" },
  //     }));
  //   };

  //   return (
  //     <GridToolbarContainer>
  //       <Button
  //         color="primary"
  //         startIcon={<AddIcon />}
  //         onClick={() => {
  //           handleClick();
  //         }}
  //       >
  //         그룹코드 추가
  //       </Button>
  //     </GridToolbarContainer>
  //   );
  // }

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
  }, [rows[0]?.id]);

  // ? map 데이터 active 속성 추가 해야된다고 본다.
  // useEffect(() => {
  //   if (activeIdx === 0) {
  //     rows.forEach((r: any, idx: number) => {
  //       if (idx === activeIdx) {
  //         r.activeStatus = true;
  //       } else {
  //         r.activeStatus = false;
  //       }
  //     });
  //   }
  // }, []);

  function useCreateToolbar(props: EditToolbarProps | any) {
    const { setRows, setRowModesModel, column } = props;

    if (columnEditMode) {
      column.forEach((c: any) => {
        if (c.field === "groupCode") {
          c.editable = true;
        }
      });
    }

    const handleClick = () => {
      setColumnEditMode(true);
      const id = randomId();

      setRows((oldRows: any) => [
        ...oldRows,
        {
          id,
          groupCode: "",
          groupCodeName: "",
          isDeleted: false,
          createUserId: "",
          isNew: true,
          mode: "create",
        },
      ]);

      setRowModesModel((oldModel: any) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "groupCode" },
      }));
    };

    // ! get
    // useEffect(() => {
    //   setSelectedGroupCode(rows[activeIdx]);
    // }, []);

    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClick}
          disabled={subColumnEditMode}
        >
          등록하기
        </Button>
      </GridToolbarContainer>
    );
  }

  function createSubToolbar(props: EditToolbarProps | any) {
    const { setSubRows, setSubrowModesModel, columns } = props;

    if (subColumnEditMode) {
      columns?.forEach((c: any) => {
        if (c.field === "code") {
          c.editable = true;
        }
      });
    }

    const handleSubClick = () => {
      setSubColumnEditMode(true);
      const id = randomId();

      setSubRows((oldRows: any) => [
        ...oldRows,
        {
          id,
          code: "",
          codeName: "",
          isDeleted: false,
          groupCode: "",
          createUserId: "",
          isNew: true,
          mode: "create",
        },
      ]);

      setSubrowModesModel((oldModel: any) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "code" },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleSubClick}
          disabled={columnEditMode}
        >
          등록하기
        </Button>
      </GridToolbarContainer>
    );
  }

  console.log(selectionModel);
  console.log(selectedRows);

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
            ".css-5wly58-MuiDataGrid-root .MuiDataGrid-columnHeader:focus, .css-5wly58-MuiDataGrid-root .MuiDataGrid-cell":
              {
                outline: columnEditMode ? "1px solid #e0e0e0" : "inherit",
              },

            // ".MuiDataGrid-row.Mui-selected": {
            //   background: selectedGroupCode ? "beige" : "inherit",
            // },
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

              setSelectedRows(selectedRows);
            }}
            slots={{ toolbar: useCreateToolbar }}
            slotProps={{ toolbar: { setRows, setRowModesModel, column, rows } }}
            pageSizeOptions={[10, 20, 30]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            // sx={{
            //   ".MuiDataGrid-row.Mui-selected, .MuiDataGrid-row.Mui-selected:hover, .MuiDataGrid-row":
            //     {
            //       background: selectedGroupCode ? "beige" : "inherit",
            //       background: "beige",
            //       outline: columnEditMode ? "1px solid #e0e0e0" : "inherit",
            //     },
            // }}
            onRowClick={(params: any, e) => {
              setSelectedGroupCode(params.row);

              const idx = rows.findIndex((r: any) => r.id === params.row.id);
              setActiveIdx(idx);
            }}
          />

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
                onClick={() => createCodeGroupData(groupCodeInfo)}
                fullWidth
                sx={{ p: "0.4rem" }}
              >
                등록하기
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

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
            ".css-5wly58-MuiDataGrid-root .MuiDataGrid-columnHeader:focus, .css-5wly58-MuiDataGrid-root .MuiDataGrid-cell":
              {
                outline: subColumnEditMode ? "1px solid #e0e0e0" : "inherit",
              },
          }}
        >
          <DataGrid
            rows={subRows}
            columns={columns}
            editMode="row"
            rowModesModel={subrowModesModel}
            onRowModesModelChange={handleSubRowModesModelChange}
            onRowEditStop={handleSubRowEditStop}
            processRowUpdate={processSubRowUpdate}
            slots={{ toolbar: createSubToolbar }}
            slotProps={{
              toolbar: { setSubRows, setSubrowModesModel, columns, rows },
            }}
            pageSizeOptions={[30, 60, 90]}
            initialState={{ pagination: { paginationModel: { pageSize: 30 } } }}
            rowHeight={30}
          />

          <Box sx={{ width: "100%", display: "flex" }}>
            <Button
              variant="contained"
              onClick={() => handleSubCreateDialogOpen()}
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
