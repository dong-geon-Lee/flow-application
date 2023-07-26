import React, { useEffect, useState } from "react";

import * as M from "@mui/material";
import * as I from "@mui/icons-material";
import * as T from "@types";

import SnackBar from "./SnackBar";

const Customer = () => {
  const [cusLists, setCusLists] = useState<T.CusProps[]>([]);
  const [cusInfo, setCusInfo] = useState<T.CusProps>({
    callerName: "",
    phoneNumber: "",
    callNotes: "",
    status: false,
  });

  const [editMode, setEditMode] = useState(false);
  const [editInfo, setEditInfo] = useState<T.EditProps>({
    editName: "",
    editPhone: "",
    editNotes: "",
  });

  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarOpen = () => setSnackBarOpen(true);
  const handleSnackbarClose = () => setSnackBarOpen(false);

  const handleEditMode = (id: number | undefined) => {
    const newLists = cusLists.map((cusList: T.CusProps) => {
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
    const newLists = cusLists.map((cusList: T.CusProps) => {
      if (cusList.id === id) return { ...cusList, status: false };
      else return cusList;
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
    const newLists = cusLists.map((cusList: T.CusProps) => {
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
    const newCusItem: T.CusProps = {
      id: cusLists.length + 1,
      callerName: cusInfo.callerName,
      phoneNumber: cusInfo.phoneNumber,
      callNotes: cusInfo.callNotes,
      status: cusInfo.status,
    };

    setCusLists((prevState) => [...prevState, newCusItem]);
  };

  const handleDeleteItem = (targetID: number | undefined) => {
    const newLists = cusLists.filter(
      (cusList: T.CusProps) => cusList.id !== targetID
    );

    setCusLists(newLists);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    handleCreateItem();
    handleClose();
    handleSnackbarOpen();

    setCusInfo({
      callerName: "",
      phoneNumber: "",
      callNotes: "",
      status: false,
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
    <M.Box sx={{ position: "relative" }}>
      <M.Typography
        textAlign="left"
        component="p"
        variant="h5"
        width="100%"
        mt="2rem"
        mb="2rem"
        ml="1.6rem"
      >
        Cards
      </M.Typography>
      <M.Grid
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
          width: "96%",
          margin: "0 auto",
        }}
      >
        {cusLists.map((cusList: T.CusProps) => (
          <M.Grid key={cusList.id} width="100%">
            <M.Stack
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
              <M.Stack
                direction="row"
                alignItems="center"
                justifyContent="start"
                sx={{ width: "100%" }}
                spacing={2}
              >
                <M.Avatar
                  sx={{
                    color: "black",
                    marginLeft: " 1.2rem",
                    background: "#fff",
                    ".MuiSvgIcon-fontSizeMedium": { fontSize: "2.4rem" },
                  }}
                >
                  <I.PersonPin />
                </M.Avatar>
                <M.Grid container flexDirection="column" width="100%">
                  <M.Stack direction="row" pt={1} pb={1} alignItems="center">
                    {cusList.status ? (
                      <M.TextField
                        type="text"
                        label="이름"
                        variant="standard"
                        size="small"
                        name="editName"
                        value={editInfo.editName}
                        onChange={handleEditOnChange}
                      />
                    ) : (
                      <M.Typography
                        variant="h6"
                        component="p"
                        fontSize="1rem"
                        width="100%"
                        noWrap
                      >
                        {cusList.callerName}
                      </M.Typography>
                    )}
                  </M.Stack>

                  <M.Stack direction="row" spacing={1} alignItems="center">
                    {cusList.status ? (
                      <M.TextField
                        type="text"
                        label="번호"
                        variant="standard"
                        size="medium"
                        name="editPhone"
                        value={editInfo.editPhone}
                        onChange={handleEditOnChange}
                      />
                    ) : (
                      <M.Typography
                        variant="caption"
                        component="p"
                        width="100%"
                        noWrap
                      >
                        {cusList.phoneNumber}
                      </M.Typography>
                    )}
                  </M.Stack>
                </M.Grid>

                <M.Stack direction="row">
                  {cusList.status ? (
                    <>
                      <M.Button
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
                        <I.CheckOutlined />
                      </M.Button>
                    </>
                  ) : (
                    <>
                      <M.Button
                        sx={{
                          width: "100%",
                          display: "inline-block",
                        }}
                        onClick={() => handleEditMode(cusList?.id)}
                        disabled={editMode && !cusList.status ? true : false}
                      >
                        <I.Edit />
                      </M.Button>
                    </>
                  )}

                  {cusList.status ? (
                    <>
                      <M.Button
                        onClick={() => handleEditExit(cusList.id)}
                        color="error"
                        sx={{ width: "100%", display: "inline-block" }}
                      >
                        <I.ClearOutlined />
                      </M.Button>
                    </>
                  ) : (
                    <>
                      <M.Button
                        onClick={() => handleDeleteItem(cusList.id)}
                        color="error"
                        sx={{
                          width: "100%",
                          display: "inline-block",
                        }}
                        disabled={editMode && !cusList.status ? true : false}
                      >
                        <I.DeleteOutlineOutlined />
                      </M.Button>
                    </>
                  )}
                </M.Stack>
              </M.Stack>

              <M.Container>
                <M.Stack direction="column" width="100%">
                  <M.Grid item>
                    {cusList.status ? (
                      <M.TextField
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
                      <M.Typography mb="1rem">{cusList.callNotes}</M.Typography>
                    )}
                    <M.Divider />
                  </M.Grid>
                  <M.Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <M.List
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
                      <M.ListItem>
                        <M.ListItemIcon>
                          <I.MailOutlined />
                        </M.ListItemIcon>
                        <M.ListItemText primary="hug@gmail.com" />
                      </M.ListItem>

                      <M.ListItem>
                        <M.ListItemIcon>
                          <I.LocationOnOutlined />
                        </M.ListItemIcon>
                        <M.ListItemText primary="France" />
                      </M.ListItem>

                      <M.ListItem>
                        <M.ListItemIcon>
                          <I.PhoneEnabledOutlined />
                        </M.ListItemIcon>
                        <M.ListItemText primary="+1 (923) 392-3521" />
                      </M.ListItem>

                      <M.ListItem>
                        <M.ListItemIcon>
                          <I.ShareOutlined />
                        </M.ListItemIcon>
                        <M.ListItemText
                          primary="https://thomas.en"
                          sx={{
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        />
                      </M.ListItem>
                    </M.List>
                  </M.Box>
                </M.Stack>
              </M.Container>
            </M.Stack>
          </M.Grid>
        ))}
      </M.Grid>

      <M.Box sx={{ position: "fixed", bottom: "5%", right: "5%" }}>
        <M.Fab color="primary" onClick={handleClickOpen}>
          <I.Add />
        </M.Fab>
      </M.Box>

      <M.Dialog open={open} onClose={handleClose} sx={{ position: "absolute" }}>
        <M.Grid container p={8}>
          <M.Grid item xs={12}>
            <M.Box component="form" onSubmit={onSubmit}>
              <M.DialogTitle
                variant="caption"
                fontSize="1.6rem"
                mb={2}
                display="block"
              >
                Customer Form
              </M.DialogTitle>
              <M.DialogContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                  minWidth: "30rem",
                }}
              >
                <M.FormControl>
                  <M.FormLabel sx={{ fontSize: "1.2rem", mb: "0.4rem" }}>
                    이름
                  </M.FormLabel>
                  <M.TextField
                    type="text"
                    sx={{ p: 0 }}
                    onChange={onChange}
                    name="callerName"
                    value={cusInfo.callerName}
                    placeholder="이름을 작성하세요"
                  />
                </M.FormControl>

                <M.FormControl>
                  <M.FormLabel sx={{ fontSize: "1.2rem", mb: "0.4rem" }}>
                    번호
                  </M.FormLabel>
                  <M.TextField
                    type="text"
                    sx={{ p: 0 }}
                    onChange={onChange}
                    name="phoneNumber"
                    value={cusInfo.phoneNumber}
                    placeholder="번호를 작성하세요"
                  />
                </M.FormControl>

                <M.FormControl>
                  <M.FormLabel sx={{ fontSize: "1.2rem", mb: "0.4rem" }}>
                    노트
                  </M.FormLabel>
                  <M.TextField
                    type="text"
                    sx={{ p: 0 }}
                    onChange={onChange}
                    name="callNotes"
                    value={cusInfo.callNotes}
                    placeholder="노트를 작성하세요"
                  />
                </M.FormControl>
              </M.DialogContent>
              <M.ButtonGroup
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: "1.6rem",
                  mt: "2.4rem",
                }}
              >
                <M.Button
                  type="button"
                  variant="text"
                  sx={{ flex: 1, fontSize: "1.2rem", width: "50%" }}
                  onClick={handleClose}
                >
                  취소
                </M.Button>
                <M.Button
                  type="submit"
                  variant="contained"
                  sx={{ flex: 1, fontSize: "1.2rem", width: "50%" }}
                >
                  제출
                </M.Button>
              </M.ButtonGroup>
            </M.Box>
          </M.Grid>
        </M.Grid>
      </M.Dialog>

      <SnackBar
        snackBarOpen={snackBarOpen}
        handleSnackbarClose={handleSnackbarClose}
      />
    </M.Box>
  );
};

export default Customer;