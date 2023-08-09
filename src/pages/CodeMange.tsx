import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
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
import { getCodeList } from "app/features/codeMange/codeMangeSlice";
import { RootState } from "app/store";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// * /Code/GroupCodelist => 그룹코드전체출력
// * /Code/GroupCodelist/{id} => 특정그룹코드출력
// * /Code/CodelistbyGroup/{groupcode} => 그룹별개별코드출력
// * /Code/Codelist => 코드전체출력
// * /Code/Codelist/{id} => 특정코드출력

const CodeMange = () => {
  const [selectCode, setSelectCode] = useState("전체");
  const [subCodeList, setSubCodeList] = useState([]);

  const dispatch = useDispatch();

  const onSelectChange = (e: any) => {
    setSelectCode(e.target.value);
  };

  const { codeList } = useSelector((state: RootState) => state.code);

  console.log(codeList);
  console.log(subCodeList);

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const codeDataInfo = await fetchGroupCodeAPI();
        dispatch(getCodeList(codeDataInfo));
      } catch (error: any) {
        return error.response.data;
      }
    };

    const handleData = async () => {
      const data = await fetchCodeListAPI();
      setSubCodeList(data);
    };

    handleFetchData();
    handleData();
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1.6rem 2rem",
        height: "100%",
        background: "#fafafa",
      }}
      // sx={{ height: "100%" }}
      // sx={{ background: "#e6e6e6" }}
      // sx={{
      //   position: "relative",
      //   "& .MuiContainer-maxWidthLg": { height: "100%" },
      // }}
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
                    key={row.Id}
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
                      {row.GroupCode}
                    </TableCell>
                    <TableCell sx={{ borderRight: "1px solid #d3d3d3" }}>
                      {row.GroupCodeName}
                    </TableCell>
                  </TableRow>
                )) || []}

                {/* //* 스크롤 보고 싶을 떄 아래 코드 추가하기 */}
                {/* {codeList?.map((row: any) => (
                <TableRow
                  key={row.Id}
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
                    {row.GroupCode}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #d3d3d3" }}>
                    {row.GroupCodeName}
                  </TableCell>
                </TableRow>
              )) || []} */}
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
                {subCodeList?.map((subcode: any) => (
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

                {/* //* 스크롤 보고 싶을 떄 아래 코드 추가하기 */}
                {/* {subCodeList?.map((subcode: any) => (
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
              )) || []} */}
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
            margin: "auto",
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
              />
            </Stack>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default CodeMange;
