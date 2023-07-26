import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
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
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AddIcon from "@mui/icons-material/Add";

const Customer = () => {
  const [cusLists, setCusLists] = useState<CusProps[]>([]);
  const [cusInfo, setCusInfo] = useState<CusProps>({
    callerName: "",
    phoneNumber: "",
    callNotes: "",
    status: false,
  });

  const [editMode, setEditMode] = useState(false);
  const [editInfo, setEditInfo] = useState({
    editName: "",
    editPhone: "",
    editNotes: "",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditMode = (id: number | undefined) => {
    const newLists = cusLists.map((cusList: any) => {
      if (cusList.id === id) {
        setEditInfo({
          ...editInfo,
          editName: cusList.callerName,
          editPhone: cusList.phoneNumber,
          editNotes: cusList.callNotes,
        });
        return { ...cusList, status: true };
      } else {
        return cusList;
      }
    });

    setCusLists(newLists);
    setEditMode(true);
  };

  const handleEditExit = (id: number | undefined) => {
    const newLists = cusLists.map((cusList: any) => {
      if (cusList.id === id) {
        return { ...cusList, status: false };
      } else {
        return cusList;
      }
    });

    setCusLists(newLists);
    setEditMode(false);
  };

  const handleEditUpdate = (
    id: number | undefined,
    editName: string,
    editPhone: string,
    editNotes: string
  ) => {
    const newLists = cusLists.map((cusList: any) => {
      if (cusList.id === id) {
        return {
          ...cusList,
          callerName: editName,
          phoneNumber: editPhone,
          callNotes: editNotes,
          status: false,
        };
      } else {
        return cusList;
      }
    });

    setCusLists(newLists);
    setEditMode(false);
    setEditInfo({ editName: "", editPhone: "", editNotes: "" });
  };

  const handleEditOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInfo({ ...editInfo, [e.target.name]: e.target.value });
  };

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
    handleClose();
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
    <Box sx={{ position: "relative" }}>
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
            <Grid key={cusList.id} width="100%">
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
                    <Stack direction="row" pt={1} pb={1} alignItems="center">
                      {cusList.status ? (
                        <TextField
                          type="text"
                          label="이름"
                          variant="standard"
                          size="small"
                          name="editName"
                          value={editInfo.editName}
                          onChange={handleEditOnChange}
                        />
                      ) : (
                        <Typography
                          variant="h6"
                          component="p"
                          fontSize="1rem"
                          width="100%"
                          noWrap
                        >
                          {cusList.callerName}
                        </Typography>
                      )}
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      {cusList.status ? (
                        <TextField
                          type="text"
                          label="번호"
                          variant="standard"
                          size="medium"
                          name="editPhone"
                          value={editInfo.editPhone}
                          onChange={handleEditOnChange}
                        />
                      ) : (
                        <Typography
                          variant="caption"
                          component="p"
                          width="100%"
                          noWrap
                        >
                          {cusList.phoneNumber}
                        </Typography>
                      )}
                    </Stack>
                  </Grid>

                  <Stack direction="row">
                    {cusList.status ? (
                      <>
                        <Button
                          sx={{ width: "100%", display: "inline-block" }}
                          onClick={() => {
                            handleEditUpdate(
                              cusList.id,
                              editInfo.editName,
                              editInfo.editPhone,
                              editInfo.editNotes
                            );
                          }}
                        >
                          <CheckOutlinedIcon />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          sx={{
                            width: "100%",
                            display: "inline-block",
                          }}
                          onClick={() => handleEditMode(cusList?.id)}
                          disabled={editMode && !cusList.status ? true : false}
                        >
                          <EditIcon />
                        </Button>
                      </>
                    )}

                    {cusList.status ? (
                      <>
                        <Button
                          onClick={() => handleEditExit(cusList.id)}
                          color="error"
                          sx={{ width: "100%", display: "inline-block" }}
                        >
                          <ClearOutlinedIcon />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleDeleteItem(cusList.id)}
                          color="error"
                          sx={{
                            width: "100%",
                            display: "inline-block",
                          }}
                          disabled={editMode && !cusList.status ? true : false}
                        >
                          <A.DeleteOutlineOutlinedIcon />
                        </Button>
                      </>
                    )}
                  </Stack>
                </Stack>

                <Container>
                  <Stack direction="column" width="100%">
                    <Grid item>
                      {cusList.status ? (
                        <TextField
                          type="text"
                          label="설명"
                          variant="outlined"
                          size="medium"
                          name="editNotes"
                          value={editInfo.editNotes}
                          onChange={handleEditOnChange}
                          fullWidth
                        />
                      ) : (
                        <Typography mb="1rem">{cusList.callNotes}</Typography>
                      )}
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

      <Box sx={{ position: "fixed", bottom: "5%", right: "5%" }}>
        <Fab color="primary" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Box>

      <Dialog open={open} onClose={handleClose} sx={{ position: "absolute" }}>
        <Grid container p={8}>
          <Grid item xs={12}>
            <Box component="form" onSubmit={onSubmit}>
              <DialogTitle
                variant="caption"
                fontSize="1.6rem"
                mb={2}
                display="block"
              >
                카드 양식
              </DialogTitle>
              <DialogContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                  minWidth: "30rem",
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
              </DialogContent>
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
                  onClick={handleClose}
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
      </Dialog>
    </Box>
  );
};

export default Customer;
