import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as A from "assets";
import { CusProps } from "@types";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import EditIcon from "@mui/icons-material/Edit";

import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const Customer = () => {
  const [cusLists, setCusLists] = useState<CusProps[]>([]);
  const [cusInfo, setCusInfo] = useState<CusProps>({
    callerName: "",
    phoneNumber: "",
    callNotes: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCusInfo({ ...cusInfo, [e.target.name]: e.target.value });
  };

  const handleCreateItem = () => {
    const newCusItem: CusProps = {
      id: cusLists.length + 1,
      callerName: cusInfo.callerName,
      phoneNumber: cusInfo.phoneNumber,
      callNotes: cusInfo.callNotes,
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
      callNotes: "",
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
    <Box sx={{ p: "1.2rem" }}>
      <Typography
        textAlign="left"
        component="p"
        variant="h5"
        width="100%"
        mt="2rem"
        mb="2rem"
        ml="1.6rem"
      >
        Cards
      </Typography>
      <Grid
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
          width: "96%",
          margin: "0 auto",
        }}
      >
        <>
          {cusLists.map((cusList) => (
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              key={cusList.id}
              width="100%"
            >
              <Stack
                height="20rem"
                alignItems="center"
                justifyContent="center"
                sx={{
                  background: "#fff",
                  display: "flex",
                  gap: "1rem",
                  padding: "1.2rem",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="start"
                  sx={{ width: "100%" }}
                  spacing={2}
                >
                  <Avatar
                    sx={{
                      color: "black",
                      marginLeft: " 1.2rem",
                      background: "#fff",
                      ".MuiSvgIcon-fontSizeMedium": { fontSize: "2.4rem" },
                    }}
                  >
                    <PersonPinIcon />
                  </Avatar>
                  <Grid container flexDirection="column" width="100%">
                    <Stack direction="row" pt={1} pb={1}>
                      <Typography
                        variant="h6"
                        component="p"
                        fontSize="1rem"
                        width="100%"
                        noWrap
                      >
                        {cusList.callerName}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography
                        variant="caption"
                        component="p"
                        width="100%"
                        noWrap
                      >
                        {cusList.phoneNumber}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Stack direction="row">
                    <Button
                      onClick={() => handleDeleteItem(cusList.id)}
                      color="error"
                      sx={{ width: "100%", display: "inline-block" }}
                    >
                      <A.DeleteOutlineOutlinedIcon />
                    </Button>
                    <Button sx={{ width: "100%", display: "inline-block" }}>
                      <EditIcon />
                    </Button>
                  </Stack>
                </Stack>

                <Container>
                  <Stack direction="column" width="100%">
                    <Grid item>
                      <Typography mb="1rem">{cusList.callNotes}</Typography>
                      <Divider />
                    </Grid>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <List
                        sx={{
                          "& .css-cveggr-MuiListItemIcon-root": {
                            minWidth: "34px",
                          },
                          display: "block",
                          "& li": { p: 0, color: "#939393" },
                          "& li:last-child": {
                            color: "#3a9eff",
                          },
                        }}
                      >
                        <ListItem>
                          <ListItemIcon>
                            <MailOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary="hug@gmail.com" />
                        </ListItem>

                        <ListItem>
                          <ListItemIcon>
                            <LocationOnOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary="France" />
                        </ListItem>

                        <ListItem>
                          <ListItemIcon>
                            <PhoneEnabledOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary="+1 (923) 392-3521" />
                        </ListItem>

                        <ListItem>
                          <ListItemIcon>
                            <ShareOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="https://thomas.en"
                            sx={{
                              cursor: "pointer",
                              "&:hover": { textDecoration: "underline" },
                            }}
                          />
                        </ListItem>
                      </List>
                    </Box>
                  </Stack>
                </Container>
              </Stack>
            </Grid>
          ))}
        </>
      </Grid>
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
                  노트
                </FormLabel>
                <TextField
                  type="text"
                  sx={{ p: 0 }}
                  onChange={onChange}
                  name="callNotes"
                  value={cusInfo.callNotes}
                  placeholder="노트를 작성하세요"
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
    </Box>
  );
};

export default Customer;
