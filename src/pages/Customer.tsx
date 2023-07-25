import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as A from "assets";
import { CusProps } from "@types";

const Customer = () => {
  const [cusLists, setCusLists] = useState<CusProps[]>([]);
  const [cusInfo, setCusInfo] = useState<CusProps>({
    callerName: "",
    phoneNumber: "",
    status: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCusInfo({ ...cusInfo, [e.target.name]: e.target.value });
  };

  const handleCreateItem = () => {
    const newCusItem: CusProps = {
      id: cusLists.length + 1,
      callerName: cusInfo.callerName,
      phoneNumber: cusInfo.phoneNumber,
      status: cusInfo.status,
    };
    setCusLists((prevState) => [...prevState, newCusItem]);
  };

  const handleDeleteItem = (targetID: number | undefined) => {
    const newLists = cusLists.filter(
      (cusList: CusProps) => cusList.id !== targetID
    );
    setCusLists(newLists);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleCreateItem();
    setCusInfo({
      callerName: "",
      phoneNumber: "",
      status: "",
    });
  };

  useEffect(() => {
    const fetchDatas = async () => {
      const response = await fetch("/mock_data.json");
      const datas = await response.json();
      setCusLists(datas);
    };
    fetchDatas();
  }, []);

  return (
    <Container
      sx={{
        width: "100%",
        m: "0 auto",
      }}
    >
      <Grid
        container
        mt={4}
        p={2}
        sx={{
          background: "#fff",
          width: "100%",
          borderRadius: "1rem",
        }}
      >
        <Typography textAlign="center" component="p" variant="h4" width="100%">
          Card 제작
        </Typography>
        {cusLists.map((cusList) => (
          <Grid item xs={12} key={cusList.id} sx={{ borderRadius: "2rem" }}>
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "left",
              }}
            >
              <Stack
                spacing={3}
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  background: "#f0f0f0",
                  borderRadius: "2.6rem",
                  p: 2,
                  ml: 3,
                  mr: 3,
                  mt: 1,
                }}
              >
                <Avatar sx={{ color: "black", background: "#fff" }}>
                  <A.AdbIcon />
                </Avatar>
                <Grid container flexDirection="column">
                  <Stack direction="row" pt={1} pb={1}>
                    <Typography variant="h5" component="p">
                      {`[ ${cusList.id} ]`} {cusList.callerName}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h6" component="p">
                      {cusList.phoneNumber}
                    </Typography>
                    <Typography variant="h6" component="p" fontSize="1rem">
                      {cusList.status}
                    </Typography>
                  </Stack>
                </Grid>
                <Button
                  sx={{ display: "flex", m: 0, width: "40%" }}
                  onClick={() => handleDeleteItem(cusList.id)}
                >
                  <A.DeleteOutlineOutlinedIcon />
                </Button>
              </Stack>
            </Box>
          </Grid>
        ))}

        <Grid container p={8}>
          <Grid item xs={12}>
            <Box component="form" onSubmit={onSubmit}>
              <Typography
                variant="caption"
                fontSize="1.6rem"
                mb={2}
                display="block"
              >
                카드 양식
              </Typography>
              <Stack
                direction="column"
                spacing={2}
                sx={{
                  ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                    p: 1.2,
                  },
                }}
              >
                <FormControl>
                  <FormLabel sx={{ fontSize: "1.2rem", mb: "0.4rem" }}>
                    이름
                  </FormLabel>
                  <TextField
                    type="text"
                    sx={{ p: 0 }}
                    onChange={onChange}
                    name="callerName"
                    value={cusInfo.callerName}
                    placeholder="이름을 작성하세요"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel sx={{ fontSize: "1.2rem", mb: "0.4rem" }}>
                    번호
                  </FormLabel>
                  <TextField
                    type="text"
                    sx={{ p: 0 }}
                    onChange={onChange}
                    name="phoneNumber"
                    value={cusInfo.phoneNumber}
                    placeholder="번호를 작성하세요"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel sx={{ fontSize: "1.2rem", mb: "0.4rem" }}>
                    상태
                  </FormLabel>
                  <TextField
                    type="text"
                    sx={{ p: 0 }}
                    onChange={onChange}
                    name="status"
                    value={cusInfo.status}
                    placeholder="상태를 작성하세요"
                  />
                </FormControl>
              </Stack>
              <ButtonGroup
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: "1.6rem",
                  mt: "2.4rem",
                }}
              >
                <Button
                  type="button"
                  variant="text"
                  sx={{ flex: 1, fontSize: "1.2rem", width: "50%" }}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ flex: 1, fontSize: "1.2rem", width: "50%" }}
                >
                  제출
                </Button>
              </ButtonGroup>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Customer;
