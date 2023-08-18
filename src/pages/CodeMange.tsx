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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import {
  createCodeAPI,
  createSubCodeAPI,
  deleteCodeAPI,
  fetchCodeListAPI,
  fetchGroupCodeAPI,
  updateCodeAPI,
} from "api";

import {
  getCodeList,
  getResultsList,
  getSubCodeList,
  selectSingleCodeList,
  selectSingleSubCode,
} from "app/features/codeMange/codeMangeSlice";

import { RootState } from "app/store";

import ActionButton from "components/ActionButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CodeMange = () => {
  const [selectCode, setSelectCode] = useState(false);
  const [firstClick, setFirstClick] = useState(false);
  const [codeInfo, setCodeInfo] = useState<any>({});

  const [groupCodeCreateMode, setGroupCodeCreateMode] = useState(false);
  const [groupSubCodeCreateMode, setGroupSubCodeCreateMode] = useState(false);
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

  const {
    codeList,
    subCodeList,
    resultLists,
    selectedGroupCode,
    selectedSubCode,
  } = useSelector((state: RootState) => state.code);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const onSelectChange = (e: any) => {};

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
    setSelectCode(true);
  };

  const handleSubCodeListActive = (id: any) => {
    const newCodeList = resultLists.map((subcode: any) => {
      if (subcode.Id === id) {
        dispatch(selectSingleSubCode(subcode));
        return { ...subcode, activeSubcode: true };
      }
      return { ...subcode, activeSubcode: false };
    });

    dispatch(getResultsList(newCodeList));
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

  const createSubCodeGroup = async (subCodeList: any) => {
    try {
      await createSubCodeAPI(subCodeList);
      fetchData();
      createSubButtonState();
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

    updateButtonState();
  };

  const editCodeDisplay = async () => {
    const { Id } = selectedGroupCode;

    try {
      await updateCodeAPI(Id, editCodeGroup);
      updateButtonState();
      fetchData();
    } catch (error: any) {
      return error.response?.data;
    }
  };

  const createButtonState = () => {
    setGroupCodeCreateMode((prevState) => !prevState);
  };

  const createSubButtonState = () => {
    setGroupSubCodeCreateMode((prevState) => !prevState);
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
      return error.response?.data;
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
      return error.response?.data;
    }

    window.location.reload();
  };

  const deleteSubCode = async () => {
    if (Object.keys(selectedSubCode).length !== 0) {
      const choice = window.confirm(
        `${selectedSubCode?.CodeName} 그룹 코드를 삭제 하시겠습니까?`
      );

      if (choice) {
        console.log(selectedSubCode, "선택");
        // await
      } else {
        console.log(choice, "취소");
      }
    }
  };

  const displayedResults = firstClick ? resultLists : subCodeList;

  useEffect(() => {
    fetchData();
  }, []);

  console.log(selectedSubCode, subCodeList, "CRUD 데이터", selectCode);

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
            value={"전체"}
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
              "&.MuiPaper-elevation": {
                height: "inherit",
                maxHeight: "20rem",
              },
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
              "&.MuiPaper-elevation": { maxHeight: "29rem" },
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
                  <TableCell
                    sx={{
                      borderRight: "1px solid #d3d3d3",
                      "&:hover": { background: "#d0d0d0" },
                      cursor: "pointer",
                      w: "50%",
                    }}
                    align="center"
                  >
                    그룹유저
                  </TableCell>
                  {selectCode && (
                    <TableCell
                      sx={{
                        borderRight: "1px solid #d3d3d3",
                        "&:hover": { background: "#d0d0d0" },
                        cursor: "pointer",
                        w: "50%",
                      }}
                      align="center"
                      width={100}
                    >
                      그룹관리
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedResults?.map((subcode: any) => (
                  <TableRow
                    key={subcode.Id}
                    sx={{
                      "&:hover": {
                        background: subcode.activeSubcode
                          ? "#fbf9ee"
                          : "#f4f4f4",
                      },
                      cursor: "pointer",
                      "&:last-child td, &:last-child th": {
                        border: 0,
                        borderRight: "1px solid #d3d3d3",
                      },
                      borderRight: "1px solid #d3d3d3",
                      background: subcode.activeSubcode ? "#fbf9ee" : "inherit",
                    }}
                    onClick={() => handleSubCodeListActive(subcode.Id)}
                  >
                    <TableCell
                      sx={{
                        borderRight: "1px solid #d3d3d3",
                        ".MuiTableCell-body": { p: "6px", display: "block" },
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
                    <TableCell
                      sx={{
                        borderRight: "1px solid #d3d3d3",
                      }}
                    >
                      {subcode.CreateUserId}
                    </TableCell>

                    {selectCode && (
                      <TableCell width={100}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Button
                            disabled={selectCode && !subcode.activeSubcode}
                          >
                            <EditIcon
                              sx={{
                                color:
                                  selectCode && subcode.activeSubcode
                                    ? "inherit"
                                    : "#d3d3d3",
                              }}
                            />
                          </Button>

                          <Button
                            onClick={deleteSubCode}
                            disabled={selectCode && !subcode.activeSubcode}
                          >
                            <DeleteIcon
                              sx={{
                                color:
                                  selectCode && subcode.activeSubcode
                                    ? "#ef5350"
                                    : "#d3d3d3",
                              }}
                            />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                )) || []}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {selectCode && (
          <Stack
            direction="row"
            sx={{ p: "2rem 0", w: "100%", ml: "auto", mr: "0%" }}
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleClickOpen}
            >
              코드 생성하기
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              sx={{ ".MuiPaper-elevation24": { p: "2rem" } }}
            >
              <DialogTitle sx={{ fontSize: "1.8rem" }}>codeList</DialogTitle>
              <DialogContent>
                <DialogContentText fontSize="1rem">
                  해당 그룹코드에 코드리스트가 추가됩니다. 아래의 양식에 맞춰서
                  모두 작성해주십시오.
                </DialogContentText>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    rowGap: "0.8rem",
                    columnGap: "1.6rem",
                    mt: "2rem",
                  }}
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="그룹코드"
                    type="email"
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                  />
                  <TextField
                    margin="dense"
                    id="name"
                    label="그룹코드명"
                    type="email"
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                  />
                  <TextField
                    margin="dense"
                    id="name"
                    label="그룹코드이름"
                    type="email"
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                  />
                  <TextField
                    margin="dense"
                    id="name"
                    label="그룹유저"
                    type="email"
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                  />
                </Box>
              </DialogContent>
              <DialogActions sx={{ p: "1rem 1.4rem", gap: "1rem", mt: "1rem" }}>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  fullWidth
                  sx={{ p: "0.4rem" }}
                >
                  취소하기
                </Button>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  fullWidth
                  sx={{ p: "0.4rem" }}
                >
                  생성하기
                </Button>
              </DialogActions>
            </Dialog>
          </Stack>
        )}
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
              onClick={() => {
                setFirstClick(false);
                setSelectCode(false);
                // setSubSelectCode(false);
              }}
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
              // <Button
              //   variant="contained"
              //   color="success"
              //   size="large"
              //   onClick={() => createCodeGroupData(createCodeGroup)}
              // >
              //   추가하기
              // </Button>
              <ActionButton
                createCodeGroupData={createCodeGroupData}
                createCodeGroup={createCodeGroup}
              />
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
