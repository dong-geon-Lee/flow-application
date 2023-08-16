import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import {
  createCodeAPI,
  deleteCodeAPI,
  fetchCodeListAPI,
  fetchGroupCodeAPI,
} from "api";
import {
  getCodeList,
  getResultsList,
  getSubCodeList,
  selectSingleCodeList,
} from "app/features/codeMange/codeMangeSlice";
import { RootState } from "app/store";

import axios from "axios";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

// function MyApp() {
//   const { enqueueSnackbar } = useSnackbar();

//   const handleClick = () => {
//     enqueueSnackbar('I love snacks.');
//   };

//   const handleClickVariant = (variant: VariantType) => () => {
//     // variant could be success, error, warning, info, or default
//     enqueueSnackbar('This is a success message!', { variant });
//   };

//   return (
//     <React.Fragment>
//       <Button onClick={handleClick}>Show snackbar</Button>
//       <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
//     </React.Fragment>
//   );
// }

// export default function IntegrationNotistack() {
//   return (
//     <SnackbarProvider maxSnack={3}>
//       <MyApp />
//     </SnackbarProvider>
//   );
// }

const CodeMange = () => {
  const [selectCode, setSelectCode] = useState("전체");
  const [firstClick, setFirstClick] = useState(false);
  const [codeInfo, setCodeInfo] = useState<any>({});

  const [groupCodeCreateMode, setGroupCodeCreateMode] = useState(false);
  const [groupCodeUpdateMode, setGroupCodeUpdateMode] = useState(false);
  const [createCodeGroup, setCreateCodeGroup] = useState({
    groupCode: "",
    groupCodeName: "",
    createUserId: "",
    isDeleted: false,
  });

  const [editCodeGroup, setEditCodeGroup] = useState({
    groupCode: "",
    groupCodeName: "",
    createUserId: "",
    isDeleted: false,
  });

  const { codeList, subCodeList, resultLists, selectedGroupCode } = useSelector(
    (state: RootState) => state.code
  );

  const dispatch = useDispatch();

  const onSelectChange = (e: any) => {
    setSelectCode(e.target.value);
  };

  const onGroupCodeChange = (e: any) => {
    setCreateCodeGroup({ ...createCodeGroup, [e.target.name]: e.target.value });
  };

  const onEditCodeGroupChange = (e: any) => {
    setEditCodeGroup({ ...editCodeGroup, [e.target.name]: e.target.value });
  };

  const handleCodeListFilter = (row: any) => {
    const { Id, GroupCode, GroupCodeName, CreateUserId } = row;

    dispatch(
      selectSingleCodeList({ Id, GroupCode, GroupCodeName, CreateUserId })
    );

    const newList: any = codeList?.map((code: any) => {
      if (code.Id === Id) {
        setCodeInfo(code);
        return { ...code, activeCode: true };
      }
      return { ...code, activeCode: false };
    });

    dispatch(getCodeList(newList));

    const selectedLists = subCodeList.filter(
      (subcode: any) => subcode.GroupCode === GroupCode
    );

    dispatch(getResultsList(selectedLists));
    setFirstClick(true);
  };

  //? 임시 json 데이터
  // const handleDummy = async () => {
  //   const dummyDataList = await axios.get("/code_group.json");
  //   return dummyDataList.data;
  // };

  //? 임시 json 데이터
  // const handleDummySubCode = async () => {
  //   const dummyDataList = await axios.get("/code_list.json");
  //   return dummyDataList.data;
  // };

  const createCodeGroupData = async (createCodeGroup: any) => {
    try {
      await createCodeAPI(createCodeGroup);
      fetchData();
      createButtonState();
    } catch (error: any) {
      return error.response.data;
    }
  };

  const editCodeGroupData = () => {
    const { GroupCode, GroupCodeName, CreateUserId } = selectedGroupCode;

    if (!GroupCode || !GroupCodeName || !CreateUserId) {
      alert("편집 대상을 선택해주세요");
      return;
    }

    setEditCodeGroup({
      groupCode: GroupCode,
      groupCodeName: GroupCodeName,
      createUserId: CreateUserId,
      isDeleted: false,
    });

    console.log(editCodeGroup);

    updateButtonState();
  };

  const editCodeDisplay = async () => {
    const { Id } = selectedGroupCode;

    try {
      await axios.put(
        `http://192.168.11.31:8080/Code/GroupCodelist/modify/${Id}`,
        editCodeGroup
      );

      updateButtonState();
      fetchData();
    } catch (error: any) {
      return error.response.data;
    }
  };

  const createButtonState = () => {
    setGroupCodeCreateMode((prevState) => !prevState);
  };

  const updateButtonState = () => {
    setGroupCodeUpdateMode((prevState) => !prevState);
  };

  const fetchData = async () => {
    try {
      // const codeDataInfo = await handleDummy();
      const codeDataInfo = await fetchGroupCodeAPI();
      dispatch(getCodeList(codeDataInfo));

      // const data = await handleDummySubCode();
      const data = await fetchCodeListAPI();
      dispatch(getSubCodeList(data));
    } catch (error: any) {
      return error.response.data;
    }
  };

  const deleteCodeGroupData = async () => {
    const { Id, GroupCode } = selectedGroupCode;

    if (!Id || !GroupCode) {
      alert("그룹코드 또는 그룹코드명을 선택해주세요");
      return;
    }

    try {
      await deleteCodeAPI(Id, GroupCode);

      const [targetLists] = subCodeList.filter(
        (x: any) => x.GroupCode === GroupCode
      );
      const codeDataInfo = codeList.filter(
        (x: any) => x.GroupCode !== targetLists.GroupCode
      );

      dispatch(getCodeList(codeDataInfo));
    } catch (error: any) {
      return error.response.data;
    }

    window.location.reload();
  };

  const displayedResults = firstClick ? resultLists : subCodeList;

  useEffect(() => {
    fetchData();
  }, []);

  /*
   * Edit 제작 순서
   * 1. defaultValue를 보이게 해라
   */

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1.6rem 2rem",
        height: "100%",
        background: "#fafafa",
      }}
    >
      <Typography
        variant="h4"
        fontSize="1.8rem"
        fontWeight="300"
        sx={{ p: "2rem 0 1rem 0" }}
      >
        코드관리
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            border: "1px solid #eee",
            p: "1.6rem 0",
            mb: "2rem",
            boxShadow: "0 0.1rem 0.06rem 0.03rem rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "1.4rem",
          }}
        >
          <Typography
            sx={{ ml: "1rem", fontWeight: "500", fontSize: "1.1rem" }}
          >
            코드구분
          </Typography>
          <Select
            value={selectCode}
            sx={{ minWidth: "10rem" }}
            onChange={onSelectChange}
          >
            <MenuItem value="전체">전체</MenuItem>
            <MenuItem value="A01">A01</MenuItem>
            <MenuItem value="A02">A02</MenuItem>
            <MenuItem value="A03">A03</MenuItem>
            <MenuItem value="A04">A04</MenuItem>
          </Select>
          <Button variant="contained">조회하기</Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "2.4rem",
            alignItems: "baseline",
            overflow: "hidden",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: "20rem",
              height: "100%",
              "&.MuiPaper-elevation": { maxHeight: "17rem" },
              boxShadow: "0 0.1rem 0.06rem 0.03rem rgba(0,0,0,0.1)",
              border: "1px solid #d0d0d0",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#e6e6e6", height: "100%" }}>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #d3d3d3",
                      "&:hover": { background: "#d0d0d0" },
                      cursor: "pointer",
                    }}
                    align="center"
                  >
                    그룹코드
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #d3d3d3",
                      "&:hover": { background: "#d0d0d0" },
                      cursor: "pointer",
                    }}
                    align="center"
                  >
                    그룹코드명
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ overflowY: "scroll", height: "10rem" }}>
                {codeList?.map((row: any) => (
                  <TableRow
                    onClick={() => {
                      handleCodeListFilter(row);
                    }}
                    key={row.Id}
                    sx={{
                      "&:hover": {
                        background: row.activeCode ? "#fbf9ee" : "#f4f4f4",
                      },
                      cursor: "pointer",
                      "&:last-child td, &:last-child th": {
                        border: 0,
                        borderRight: "1px solid #d3d3d3",
                      },
                      background:
                        firstClick && row.activeCode ? "#fbf9ee" : "inherit",
                    }}
                  >
                    <TableCell sx={{ borderRight: "1px solid #d3d3d3" }}>
                      {row.GroupCode}
                    </TableCell>
                    <TableCell sx={{ borderRight: "1px solid #d3d3d3" }}>
                      {row.GroupCodeName}
                    </TableCell>
                  </TableRow>
                )) || []}
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer
            component={Paper}
            sx={{
              "&.MuiPaper-elevation": { maxHeight: "30rem" },
              border: "1px solid #d0d0d0",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#e6e6e6" }}>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #d3d3d3",
                      "&:hover": { background: "#d0d0d0" },
                      cursor: "pointer",
                    }}
                    align="center"
                  >
                    그룹코드
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #d3d3d3",
                      "&:hover": { background: "#d0d0d0" },
                      cursor: "pointer",
                    }}
                    align="center"
                  >
                    그룹코드명
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #d3d3d3",
                      "&:hover": { background: "#d0d0d0" },
                      cursor: "pointer",
                    }}
                    align="center"
                  >
                    그룹코드이름
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  // overflowY: "scroll",
                  height: "100%",
                  // maxHeight: "10rem",
                }}
              >
                {displayedResults?.map((subcode: any) => (
                  <TableRow
                    key={subcode.Id}
                    sx={{
                      "&:hover": {
                        background: "#f4f4f4",
                      },
                      cursor: "pointer",
                      "&:last-child td, &:last-child th": {
                        border: 0,
                        borderRight: "1px solid #d3d3d3",
                      },
                      borderRight: "1px solid #d3d3d3",
                      // overflowY: "scroll",
                    }}
                  >
                    <TableCell
                      sx={{
                        borderRight: "1px solid #d3d3d3",
                      }}
                    >
                      {subcode.GroupCode}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #d3d3d3",
                      }}
                    >
                      {subcode.Code}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #d3d3d3",
                      }}
                    >
                      {subcode.CodeName}
                    </TableCell>
                  </TableRow>
                )) || []}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <form style={{ marginTop: "auto", marginBottom: "10rem" }}>
        <Box
          sx={{
            border: "1px solid #d0d0d0",
            width: "100%",
            margin: "1rem 0",
            position: "relative",
            display: "block",
            p: "1rem 2rem",
          }}
        >
          <Stack direction="row" width="100%" justifyContent="right" gap="1rem">
            <Button
              onClick={editCodeGroupData}
              disabled={groupCodeCreateMode}
              sx={{
                fontSize: "1rem",
                color: "black",
                background: "#efefef",
                border: "1px solid #aaa",
                minWidth: "5rem",
              }}
            >
              {groupCodeUpdateMode ? "취소" : "편집"}
            </Button>
            <Button
              disabled={groupCodeCreateMode || groupCodeUpdateMode}
              onClick={deleteCodeGroupData}
              sx={{
                fontSize: "1rem",
                color: "black",
                background: "#efefef",
                border: "1px solid #aaa",
                minWidth: "5rem",
              }}
            >
              삭제
            </Button>
            <Button
              sx={{
                fontSize: "1rem",
                color: "black",
                background: "#efefef",
                border: "1px solid #aaa",
                minWidth: "5rem",
              }}
              onClick={createButtonState}
              disabled={groupCodeUpdateMode}
            >
              {groupCodeCreateMode ? "취소" : "생성"}
            </Button>
            <Button
              disabled={groupCodeCreateMode || groupCodeUpdateMode}
              onClick={() => setFirstClick(false)}
              sx={{
                fontSize: "1rem",
                color: "black",
                background: "#efefef",
                border: "1px solid #aaa",
                minWidth: "5rem",
              }}
            >
              초기화
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            border: "1px solid #d0d0d0",
            width: "100%",
            margin: "0 auto",
            marginTop: "1.4rem",
            position: "relative",
            display: "block",
          }}
        >
          <Grid
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(2,1fr)",
              gap: "1.2rem",
              p: "1rem 2rem",
            }}
          >
            <Stack direction="row" alignItems="center">
              <label style={{ flex: 0.2 }}>그룹코드</label>
              {groupCodeCreateMode ? (
                <TextField
                  type="text"
                  value={createCodeGroup.groupCode}
                  name="groupCode"
                  onChange={onGroupCodeChange}
                  placeholder="그룹코드를 입력해주세요"
                />
              ) : groupCodeUpdateMode ? (
                <>
                  <TextField
                    variant="standard"
                    value={editCodeGroup.groupCode}
                    // selectedGroupCode?.GroupCode ||
                    // selectedGroupCode?.GroupCodeName ||
                    // selectedGroupCode?.CreateUserId ||
                    name="groupCode"
                    onChange={onEditCodeGroupChange}
                    label="그룹코드를 편집하세요"
                  />
                </>
              ) : (
                <TextField
                  fullWidth
                  type="text"
                  sx={{
                    flex: "1",
                    ".MuiInputBase-input": { padding: "5px 14px" },
                  }}
                  value={codeInfo.GroupCode || ""}
                  name="GroupCode"
                />
              )}
            </Stack>

            <Stack direction="row" alignItems="center">
              <label style={{ flex: 0.2 }}>그룹명</label>
              {groupCodeCreateMode ? (
                <TextField
                  type="text"
                  value={createCodeGroup.groupCodeName}
                  name="groupCodeName"
                  onChange={onGroupCodeChange}
                  placeholder="그룹명을 입력해주세요"
                />
              ) : groupCodeUpdateMode ? (
                <>
                  <TextField
                    variant="standard"
                    value={editCodeGroup.groupCodeName}
                    name="groupCodeName"
                    onChange={onEditCodeGroupChange}
                    label="그룹명을 편집하세요"
                  />
                </>
              ) : (
                <TextField
                  fullWidth
                  type="text"
                  sx={{
                    flex: "1",
                    ".MuiInputBase-input": { padding: "5px 14px" },
                  }}
                  value={codeInfo.GroupCodeName || ""}
                  name="GroupCodeName"
                />
              )}
            </Stack>

            <Stack direction="row" alignItems="center">
              <label style={{ flex: 0.2 }}>사용자</label>
              {groupCodeCreateMode ? (
                <TextField
                  type="text"
                  value={createCodeGroup.createUserId}
                  name="createUserId"
                  onChange={onGroupCodeChange}
                  placeholder="사용자를 입력해주세요"
                />
              ) : groupCodeUpdateMode ? (
                <>
                  <TextField
                    variant="standard"
                    value={editCodeGroup.createUserId}
                    name="createUserId"
                    onChange={onEditCodeGroupChange}
                    label="사용자를 편집하세요"
                  />
                </>
              ) : (
                <TextField
                  fullWidth
                  type="text"
                  sx={{
                    flex: "1",
                    ".MuiInputBase-input": { padding: "5px 14px" },
                  }}
                  value={codeInfo.CreateUserId || ""}
                  name="CreateUserId"
                />
              )}
            </Stack>

            <Stack direction="row" alignItems="center">
              {groupCodeCreateMode ? (
                <></>
              ) : groupCodeUpdateMode ? (
                <></>
              ) : (
                <>
                  <label style={{ flex: 0.2 }}>사용 여부</label>
                  <TextField
                    fullWidth
                    type="text"
                    sx={{
                      flex: "1",
                      ".MuiInputBase-input": { padding: "5px 14px" },
                    }}
                    value={codeInfo?.IsDeleted ? "Y" : "N"}
                    name="IsDeleted"
                  />
                </>
              )}
            </Stack>

            {groupCodeCreateMode ? (
              <Button
                variant="text"
                color="warning"
                size="large"
                onClick={() => setGroupCodeCreateMode(false)}
              >
                취소하기
              </Button>
            ) : (
              groupCodeUpdateMode && (
                <Button onClick={() => setGroupCodeUpdateMode(false)}>
                  취소
                </Button>
              )
            )}
            {groupCodeCreateMode ? (
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={() => createCodeGroupData(createCodeGroup)}
              >
                추가하기
              </Button>
            ) : (
              groupCodeUpdateMode && (
                <Button onClick={() => editCodeDisplay()}>완료</Button>
              )
            )}
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default CodeMange;
