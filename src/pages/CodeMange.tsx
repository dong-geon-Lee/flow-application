import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const CodeMange = () => {
  const [selectCode, setSelectCode] = useState("전체");
  const [codeData, setCodeData] = useState([]);

  const onSelectChange = (e: any) => {
    setSelectCode(e.target.value);
  };

  // * /Code/GroupCodelist => 그룹코드전체출력
  // * /Code/GroupCodelist/{id} => 특정그룹코드출력
  // * /Code/CodelistbyGroup/{groupcode} => 그룹별개별코드출력

  console.log(codeData);

  useEffect(() => {
    const fetchCodeData = async () => {
      const response = await axios.get(
        "http://192.168.11.164:8080/Code/GroupCodelist"
      );

      setCodeData(response.data);
    };
    fetchCodeData();
  }, []);

  return (
    <Container>
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
          border: "1px solid #eee",
          p: "1.6rem 0",
          mb: "2rem",
          boxShadow: "0 0.1rem 0.06rem 0.03rem rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "1.4rem",
        }}
      >
        <Typography sx={{ ml: "1rem", fontWeight: "500", fontSize: "1.1rem" }}>
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                ID
              </TableCell>
              <TableCell
                sx={{
                  borderRight: "1px solid #d3d3d3",
                  "&:hover": { background: "#d0d0d0" },
                  cursor: "pointer",
                }}
                align="center"
              >
                GroupCode
              </TableCell>
              <TableCell
                sx={{
                  borderRight: "1px solid #d3d3d3",
                  "&:hover": { background: "#d0d0d0" },
                  cursor: "pointer",
                }}
                align="center"
              >
                GroupCodeName
              </TableCell>
              <TableCell
                sx={{
                  borderRight: "1px solid #d3d3d3",
                  "&:hover": { background: "#d0d0d0" },
                  cursor: "pointer",
                }}
                align="center"
              >
                userID
              </TableCell>
              <TableCell
                sx={{
                  borderRight: "1px solid #d3d3d3",
                  "&:hover": { background: "#d0d0d0" },
                  cursor: "pointer",
                }}
                align="center"
              >
                UpdateDate
              </TableCell>
              <TableCell
                sx={{
                  borderRight: "1px solid #d3d3d3",
                  "&:hover": { background: "#d0d0d0" },
                  cursor: "pointer",
                }}
                align="center"
              >
                CreateUserId
              </TableCell>
              <TableCell
                align="center"
                sx={{ "&:hover": { background: "#d0d0d0" }, cursor: "pointer" }}
              >
                IsDeleted
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {codeData?.map((row: any) => (
              <TableRow
                key={row.Id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                    borderRight: "1px solid #d3d3d3",
                  },
                }}
              >
                <TableCell
                  sx={{
                    borderRight: "1px solid #d3d3d3",
                  }}
                >
                  {row.Id}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #d3d3d3" }}>
                  {row.GroupCode}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #d3d3d3" }}>
                  {row.GroupCodeName}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #d3d3d3" }}>
                  {row.CreateUserId}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #d3d3d3" }}>
                  {row.UpdateDate || "Empty"}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #d3d3d3" }}>
                  {row.CreateDate}
                </TableCell>
                <TableCell>{row.isDeleted ? "O" : "X"}</TableCell>
              </TableRow>
            )) || []}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CodeMange;
