import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridToolbar,
} from "@mui/x-data-grid";

import { useDispatch } from "react-redux";

import {
  Axios,
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
import EditToolbar from "components/EditToolbar";
import SubEditToolbar from "components/SubEditToolbar";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

export default function Ecommerce() {
  const dispatch = useDispatch();

  // * rows 목록 및 선택상태
  const [rows, setRows]: any = useState([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel | any>(
    {}
  );

  // * subRows 및 선택상태
  const [subRows, setSubRows]: any = useState([]);
  const [subrowModesModel, setSubrowModesModel] = useState<
    GridRowModesModel | any
  >({});
  const [filteredSubRows, setFilteredSubRows] = useState([]);

  // * rows Dialog Open 버튼
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // * rows 생성 시 상태
  const [groupCodeInfo, setGroupCodeInfo] = useState({
    groupCode: "",
    groupCodeName: "",
    createUserId: "",
    isDeleted: false,
  });

  // * subRows Dialog Open 버튼
  const [createSubDialogOpen, setCreateSubDialogOpen] = useState(false);

  // * subRows 생성 시 상태
  const [codeListInfo, setCodeListInfo] = useState({
    code: "",
    codeName: "",
    groupCode: "",
    createUserId: "",
    isDeleted: false,
  });

  // * rows Edit 및 색상 상태관여
  const [columnEditMode, setColumnEditMode] = useState(false);
  const [columnActionMode, setColumnActionMode] = useState(false);

  // * subRows Edit 및 색상 상태관여
  const [subColumnEditMode, setSubColumnEditMode] = useState(false);
  const [subColumnActionMode, setSubColumnActionMode] = useState(false);

  // * rows 클릭 시 1개의 테이블 id와 정보 상태
  const [selectionModel, setSelectionModel] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState<any>({});

  // * subRows 클릭 시 1개의 테이블 id와 정보 상태
  const [selectionSubModel, setSelectionSubModel] = useState<any>([]);
  const [selectedSubRows, setSelectedSubRows] = useState<any>({});

  // * 등록 버튼 클릭 시 groupCode 상태값 반영 (rows 쪽 Dialog)
  const onChange = (e: any) => {
    setGroupCodeInfo({ ...groupCodeInfo, [e.target.name]: e.target.value });
  };

  // * rows Dialog Open
  const handleCreateDialogOpen = () => {
    setCreateDialogOpen(true);
  };

  // * rows Dialog Close
  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
  };

  // * 등록 버튼 클릭 시 codeListInfo 상태값 반영 (subRows 쪽 Dialog)
  const onSubChange = (e: any) => {
    setCodeListInfo({ ...codeListInfo, [e.target.name]: e.target.value });
  };

  // * subRows Dialog Open
  const handleSubCreateDialogOpen = () => {
    setCreateSubDialogOpen(true);
  };

  // * subRows Dialog Close
  const handleSubCreateDialogClose = () => {
    setCreateSubDialogOpen(false);
  };

  // * rows 쪽 싱글 Edit 및 다중 Edit 허요
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = false;
    }
  };

  // * rows Actions 쪽 Edit 아이콘 클릭 시 작동
  const handleEditClick = (id: GridRowId) => () => {
    setColumnEditMode(false);
    setColumnActionMode(true);

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  // * rows Actions 쪽 Save 아이콘 클릭 시 작동
  const handleSaveClick = (id: GridRowId) => () => {
    setColumnEditMode(false);
    setColumnActionMode(false);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  // * rows Actions 쪽 Delete 아이콘 클릭 시 작동
  const handleDeleteClick1 = (id: GridRowId, GroupCode: any) => () => {
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

  const handleDeleteClick = () => () => {
    const { id, groupCode } = selectedRows;
    console.log(id, groupCode);

    const deleteCodeAPI = async (Id: any, GroupCode: any) => {
      try {
        await Axios.delete(
          `Code/GroupCodelist/delete?id=${Id}&strGroupCode=${GroupCode}`
        );
      } catch (error) {
        throw error;
      }
    };

    deleteCodeAPI(id, groupCode);
    setRows(rows.filter((row: any) => row.id !== id));

    // const handleDelete = async () => {
    //   try {
    //     await Axios.delete(`api/traders/${id}`);
    //   } catch (error) {
    //     console.error("Error deleting data:", error);
    //   }
    // };

    // handleDelete();
    // setRows(rows.filter((row: any) => row.id !== id));
  };

  const handleSubDeleteClick = () => () => {
    const { id } = selectedSubRows;
    console.log(id);

    const deleteSubCodeAPI = async (Id: any) => {
      try {
        await Axios.delete(`Code/Codelist/delete?id=${Id}`);
      } catch (error) {
        throw error;
      }
    };

    deleteSubCodeAPI(id);
    setSubRows(subRows.filter((row: any) => row.id !== id));
  };

  // * rows Actions 쪽 Cancel 아이콘 클릭 시 작동
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

  // * 여기부터
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

  // * 여기까지 다 sub로 Actions 함수
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
      console.log(createCodeGroup, "체크");
      await createCodeAPI(createCodeGroup);
      // const [response] = await createCodeAPI(createCodeGroup);
      // const data = codeDataFormatter(response);
      // console.log(data);

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

      alert("그룹코드와 그룹코드명을 모두 작성해주십시오");

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
      width: 500,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Actions",
    //   width: 110,
    //   cellClassName: "actions",
    //   getActions: (params: any) => {
    //     const isInEditMode =
    //       rowModesModel[params.id]?.mode === GridRowModes.Edit;

    //     if (isInEditMode) {
    //       return [
    //         <GridActionsCellItem
    //           icon={<SaveIcon />}
    //           label="Save"
    //           sx={{ color: "primary.main" }}
    //           onClick={handleSaveClick(params.id)}
    //         />,
    //         <GridActionsCellItem
    //           icon={<CancelIcon />}
    //           label="Cancel"
    //           className="textPrimary"
    //           color="inherit"
    //           onClick={handleCancelClick(params.id)}
    //         />,
    //       ];
    //     }

    //     return [
    //       <GridActionsCellItem
    //         icon={<EditIcon />}
    //         label="Edit"
    //         className="textPrimary"
    //         color="inherit"
    //         onClick={handleEditClick(params.id)}
    //         disabled={selectionModel !== params.id}
    //       />,
    //       <GridActionsCellItem
    //         icon={<DeleteIcon />}
    //         label="Delete"
    //         color="inherit"
    //         onClick={handleDeleteClick(params.id, params.row.GroupCode)}
    //         disabled={selectionModel !== params.id}
    //       />,
    //     ];
    //   },
    // },
  ];

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "코드",
      width: 120,
      editable: false,
    },
    {
      field: "codeName",
      headerName: "코드명",
      width: 500,
      editable: true,
    },
    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Actions",
    //   width: 100,
    //   cellClassName: "actions",
    //   getActions: (params: any) => {
    //     const isInEditMode =
    //       subrowModesModel[params.id]?.mode === GridRowModes.Edit;

    //     if (selectedRows.groupCode !== params.row.groupCode) {
    //     }

    //     if (isInEditMode) {
    //       return [
    //         <GridActionsCellItem
    //           icon={<SaveIcon />}
    //           label="Save"
    //           onClick={handleSubSaveClick(params.id, params)}
    //           sx={{ color: "primary.main" }}
    //         />,
    //         <GridActionsCellItem
    //           icon={<CancelIcon />}
    //           label="Cancel"
    //           className="textPrimary"
    //           onClick={handleSubCancelClick(params.id)}
    //           color="inherit"
    //         />,
    //       ];
    //     }
    //     return [
    //       <GridActionsCellItem
    //         icon={<EditIcon />}
    //         label="Edit"
    //         className="textPrimary"
    //         onClick={handleSubEditClick(params.id)}
    //         color="inherit"
    //       />,
    //       <GridActionsCellItem
    //         icon={<DeleteIcon />}
    //         label="Delete"
    //         onClick={handleSubDeleteClick(params.id)}
    //         color="inherit"
    //       />,
    //     ];
    //   },
    // },
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
    // if (!selectedSubRows) {
    // }

    setSelectionModel(rows[0]?.id);
    setSelectedRows(rows[0]);
  }, [rows[0]?.id]);

  // ! ??
  // useEffect(() => {
  //   if (rows.length > 0) {
  //     setSelectionModel([rows[0]?.id]);
  //     setSelectedRows(rows[0]);
  //   } else {
  //     setSelectionModel([]);
  //     setSelectedRows([]);
  //   }
  // }, [rows]);

  // ! 사이드 이펙트 잠시 제거
  // useEffect(() => {
  //   if (
  //     groupCodeInfo.groupCode !== "" &&
  //     groupCodeInfo.groupCodeName !== "" &&
  //     rows.some((r: any) => r?.groupCode === groupCodeInfo?.groupCode)
  //   ) {
  //     if (rows.find((r: any) => r?.groupCode === selectedSubRows?.groupCode)) {
  //       setSelectionModel(selectedRows.id);
  //       setSelectedRows(selectedRows);
  //       return;
  //     }

  //     setSelectionModel(rows[rows.length - 1]?.id);
  //     setSelectedRows(rows[rows.length - 1]);
  //   }
  // }, [groupCodeInfo.groupCode, groupCodeInfo.groupCodeName, rows]);

  // todo subRows Active 사이드 이펙트

  // useEffect(() => {
  //   setSelectionSubModel(filteredCodeLists[0]?.id);
  //   setSelectedSubRows(filteredCodeLists[0]);
  // }, [filteredCodeLists[0]?.id]);

  // useEffect(() => {
  //   if (
  //     codeListInfo.code &&
  //     codeListInfo.codeName &&
  //     subRows.some(
  //       (s: any) =>
  //         s.groupCode === codeListInfo.groupCode &&
  //         s.code === codeListInfo.code &&
  //         s.codeName === codeListInfo.codeName
  //     )
  //   ) {
  //     setSelectionSubModel(subRows[subRows.length - 1]?.id);
  //     setSelectedSubRows(subRows[subRows.length - 1]);
  //   }
  // }, [codeListInfo.code, codeListInfo.codeName, subRows]);

  // * 콘솔 zone
  // console.log(selectedSubRows, "값 안찍히나?");
  // console.log(codeListInfo);

  useEffect(() => {
    const [id] = Object.keys(subrowModesModel);

    if (id) {
      setSubrowModesModel({
        ...subrowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    }
  }, [selectedRows, selectedSubRows]);
  // rowModesModel[params.id]?.mode === GridRowModes.Edit;
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

  const filteredCodeLists = subRows.filter(
    (x: any) => x.groupCode === selectedRows?.groupCode
  );

  // useEffect(() => {
  //   const filteredCodeLists = subRows.filter(
  //     (x: any) => x.groupCode === selectedRows?.groupCode
  //   );
  //   console.log(filteredCodeLists);
  //   setSubRows(filteredCodeLists);

  //   setFilteredSubRows(filteredCodeLists);
  // }, [selectedRows]);

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h6" sx={{ mb: "1.2rem" }}>
        코드관리
      </Typography>

      <Grid sx={{ display: "flex", gap: "2.4rem" }}>
        <Box
          sx={{
            flex: 1,
            minWidth: "40rem",
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
              // background: selectedRows ? "rgba(25, 118, 210, 0.08)" : "inherit",
              background: selectedRows ? "rgba(25, 118, 210, 0.08)" : "inherit",
            },
            ".css-1knaqv7-MuiButtonBase-root-MuiButton-root + button": {
              display: "none",
            },
            ".css-3be3ve-MuiFormControl-root-MuiTextField-root-MuiDataGrid-toolbarQuickFilter":
              { marginRight: "0.4rem", marginTop: "0.4rem" },
          }}
        >
          <DataGrid
            // key={rows.id}
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
              const selectedIDs = new Set(newSelection);
              const [selectedRows] = rows.filter((r: any) =>
                selectedIDs.has(r.id)
              );

              // * 코드리스트에 필터링 해야되는 매개변수들
              // console.log(selectedRows, selectionID);
              const [selectionID] = newSelection;
              setSelectionModel(selectionID);
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

            slots={{ toolbar: EditToolbar }}
            slotProps={{
              toolbar: {
                setRows,
                setRowModesModel,
                handleDeleteClick,
                handleEditClick,
                showQuickFilter: true,
                handleCreateDialogOpen,
                setGroupCodeInfo,
                createDialogOpen,
                handleCreateDialogClose,
                groupCodeInfo,
                onChange,
                createCodeGroupData,
              },
            }}
            disableColumnFilter
            disableColumnSelector
            pageSizeOptions={[100, 200, 300]}
            // initialState={{
            //   pagination: { paginationModel: { pageSize: 100 } },
            // }}
            hideFooterPagination
            getRowId={(row: any) => row.id}
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

          {/* //* rows 쪽 Dialog 주석 처리 */}
          {/* <Button
            variant="contained"
            onClick={() => {
              handleCreateDialogOpen();
              setGroupCodeInfo({
                groupCode: "",
                groupCodeName: "",
                createUserId: "",
                isDeleted: false,
              });
            }}
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
          </Dialog> */}
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
                outline:
                  (subColumnEditMode || subColumnActionMode) &&
                  selectedRows &&
                  selectedSubRows
                    ? "1px solid #e0e0e0"
                    : "inherit",
              },

            ".css-5wly58-MuiDataGrid-root .MuiDataGrid-cell:focus": {
              zIndex: 3,
              outline: "solid #1976d2 1px",
            },

            ".css-5wly58-MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, .css-5wly58-MuiDataGrid-root .MuiDataGrid-cell:focus-within":
              { zIndex: 3, userSelect: "none", outline: "solid #1976d2 1px" },

            ".css-5wly58-MuiDataGrid-root .MuiDataGrid-row.Mui-selected": {
              background: selectedSubRows
                ? "rgba(25, 118, 210, 0.08)"
                : "inherit",
            },
            ".css-1knaqv7-MuiButtonBase-root-MuiButton-root + button": {
              display: "none",
            },
            ".css-3be3ve-MuiFormControl-root-MuiTextField-root-MuiDataGrid-toolbarQuickFilter":
              { marginRight: "0.4rem", marginTop: "0.4rem" },
            // ".css-1hziph0 .css-5wly58-MuiDataGrid-root .MuiDataGrid-row.Mui-selected":
            //   { background: "none" },
            // ".css-5wly58-MuiDataGrid-root .MuiDataGrid-row.Mui-selected": {
            //   background: "none",
            // },

            // ".css-5wly58-MuiDataGrid-root .MuiDataGrid-row.Mui-selected:hover, .css-5wly58-MuiDataGrid-root .MuiDataGrid-row.Mui-selected.Mui-hovered":
            //   {
            //     background: "none",
            //   },

            // ".css-5wly58-MuiDataGrid-root .MuiDataGrid-row:hover, .css-5wly58-MuiDataGrid-root .MuiDataGrid-row.Mui-hovered":
            //   {
            //     background: "none",
            //   },

            // todo 클래스를 바꿔주니 실제로 작동한다.
            // * 원하는 동작이랑은 관계없음
            // ".css-1kwdphh-MuiDataGrid-virtualScrollerContent": {
            //   background: selectedSubRows
            //     ? "rgba(25, 118, 210, 0.08)"
            //     : "inherit",
            // },

            // ".cold": {
            //   background: selectedSubRows
            //     ? "rgba(25, 118, 210, 0.08)"
            //     : "inherit",
            // },
          }}
        >
          <DataGrid
            // getCellClassName={(params: GridCellParams<any, any, any>) => {
            //   const { code, codeName }: any = params.row;

            //   if (
            //     code === selectedSubRows?.code &&
            //     codeName === selectedSubRows?.codeName
            //   ) {
            //     return (
            //       params.row?.code &&
            //       params.row?.codeName &&
            //       selectedSubRows &&
            //       "cold"
            //     );
            //   }

            //   return;
            // }}
            rows={filteredCodeLists}
            // rows={subRows.filter(
            //   (s: any) => s.groupCode === selectedRows?.groupCode
            // )}

            columns={columns}
            editMode="row"
            rowModesModel={subrowModesModel}
            onRowModesModelChange={handleSubRowModesModelChange}
            checkboxSelection={false}
            rowSelectionModel={selectionSubModel}
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
              toolbar: {
                setSubRows,
                setSubrowModesModel,
                handleSubDeleteClick,
                showQuickFilter: true,
                selectedRows,
                handleSubCreateDialogOpen,
                setCodeListInfo,
                createSubDialogOpen,
                codeListInfo,
                onSubChange,
                handleSubCreateDialogClose,
                createSubCodeData,
              },
            }}
            slots={{ toolbar: SubEditToolbar }}
            disableColumnFilter
            disableColumnSelector
            // pageSizeOptions={[30, 60, 90]}
            // initialState={{ pagination: { paginationModel: { pageSize: 30 } } }}
            rowHeight={30}
            hideFooterPagination
            onCellClick={(params: any) => {
              // setSubRows("");
              // console.log(params);
            }}
            getRowId={(row: any) => row.id}
            onCellDoubleClick={(params, e: any) => {
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

          {/* <Box
            sx={{
              width: "100%",
              display: "flex",
              // position: "sticky",
              // top: "50%",
              // right: "0%",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleSubCreateDialogOpen();
                setCodeListInfo({
                  code: "",
                  codeName: "",
                  groupCode: "",
                  createUserId: "",
                  isDeleted: false,
                });
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
          </Dialog> */}
        </Box>
      </Grid>
    </Box>
  );
}
