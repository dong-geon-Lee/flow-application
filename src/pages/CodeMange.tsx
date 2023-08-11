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
import { fetchCodeListAPI, fetchGroupCodeAPI } from "api";
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

const CodeMange = () => {
  const [selectCode, setSelectCode] = useState("전체");
  const [firstClick, setFirstClick] = useState(false);
  const [codeInfo, setCodeInfo] = useState<any>({});

  const dispatch = useDispatch();

  const onSelectChange = (e: any) => {
    setSelectCode(e.target.value);
  };

  const { codeList, subCodeList, resultLists, selectedGroupCode } = useSelector(
    (state: RootState) => state.code
  );

  const handleCodeListFilter = (row: any) => {
    const { Id, GroupCode } = row;

    // deleteCodeGroupData(Id, GroupCode);
    dispatch(selectSingleCodeList({ Id, GroupCode }));

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

  const fetchData = async () => {
    try {
      const codeDataInfo = await fetchGroupCodeAPI();
      dispatch(getCodeList(codeDataInfo));

      const data = await fetchCodeListAPI();
      dispatch(getSubCodeList(data));
    } catch (error: any) {
      return error.response.data;
    }
  };

  const deleteCodeGroupData = async () => {
    const { Id, GroupCode } = selectedGroupCode;
    console.log(Id, GroupCode, "삭제시도");

    await axios.delete(
      `http://192.168.11.164:8080/Code/GroupCodelist/delete?id=${Id}&strGroupCode=${GroupCode}`
    );
  };

  // * 원본 useEffect
  // useEffect(() => {
  //   const handleFetchData = async () => {
  //     try {
  //       //* 원본코드
  //       // const codeDataInfo = await fetchGroupCodeAPI();
  //       // dispatch(getCodeList(codeDataInfo));

  //       //? 임시 json 데이터
  //       const codeDataInfo: any = await handleDummy();
  //       dispatch(getCodeList(codeDataInfo));
  //     } catch (error: any) {
  //       return error.response.data;
  //     }
  //   };

  //   const handleData = async () => {
  //     //* 원본코드
  //     // const data = await fetchCodeListAPI();
  //     // setSubCodeList(data);

  //     //? 임시 json 데이터
  //     const data: any = await handleDummySubCode();
  //     dispatch(getSubCodeList(data));
  //   };

  //   handleFetchData();
  //   handleData();
  // }, [dispatch]);

  const displayedResults = firstClick ? resultLists : subCodeList;

  useEffect(() => {
    fetchData();
  }, []);

  /*   


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
                  overflowY: "scroll",
                  height: "20rem",
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
                    }}
                  >
                    <TableCell sx={{ borderRight: "1px solid #d3d3d3" }}>
                      {subcode.GroupCode}
                    </TableCell>
                    <TableCell sx={{ borderRight: "1px solid #d3d3d3" }}>
                      {subcode.Code}
                    </TableCell>
                    <TableCell sx={{ borderRight: "1px solid #d3d3d3" }}>
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
              sx={{
                fontSize: "1rem",
                color: "black",
                background: "#efefef",
                border: "1px solid #aaa",
                minWidth: "5rem",
              }}
            >
              편집
            </Button>
            <Button
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
            >
              추가
            </Button>
            <Button
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
            <Stack direction="row" alignItems="center" justifyContent="center">
              <label style={{ flex: 0.2 }}>그룹코드</label>
              <TextField
                fullWidth
                type="text"
                sx={{
                  flex: "1",
                  ".MuiInputBase-input": { padding: "5px 14px" },
                }}
                value={codeInfo.GroupCode || ""}
                name="GroupCode"
                // onChange={onCodeListChange}
              />
            </Stack>

            <Stack direction="row" alignItems="center">
              <label style={{ flex: 0.2 }}>그룹명</label>
              <TextField
                fullWidth
                type="text"
                sx={{
                  flex: "1",
                  ".MuiInputBase-input": { padding: "5px 14px" },
                }}
                value={codeInfo.GroupCodeName || ""}
                name="GroupCodeName"
                // onChange={onCodeListChange}
              />
            </Stack>

            <Stack direction="row" alignItems="center">
              <label style={{ flex: 0.2 }}>설명</label>
              <TextField
                fullWidth
                type="text"
                sx={{
                  flex: "1",
                  ".MuiInputBase-input": { padding: "5px 14px" },
                }}
                value={codeInfo.CreateUserId || ""}
                name="CreateUserId"
                // onChange={onCodeListChange}
              />
            </Stack>

            <Stack direction="row" alignItems="center">
              <label style={{ flex: 0.2 }}>사용여부</label>
              <TextField
                fullWidth
                type="text"
                sx={{
                  flex: "1",
                  ".MuiInputBase-input": { padding: "5px 14px" },
                }}
                value={codeInfo?.IsDeleted ? "Y" : "N"}
                name="IsDeleted"
                // onChange={onCodeListChange}
              />
            </Stack>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default CodeMange;
