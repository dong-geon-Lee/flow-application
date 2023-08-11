import React, { useEffect, useState } from "react";

import * as M from "@mui/material";
import * as I from "@mui/icons-material";
import * as T from "@types";

import EditandCompleteBtn from "./ActionButton/EditAndCompleteBtn";
import DeleteAndClearBtn from "./ActionButton/DeleteAndClearBtn";
import UserInfo from "./UserField/UserInfo";
import UserInput from "./UserField/UserInput";
import CardDialog from "./Modals/CardDialog";

import { fetchCustomerData } from "api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import {
  addCustomer,
  customerEditExit,
  customerEditMode,
  deleteCustomer,
  editCustomer,
} from "app/features/customer/customerSlice";

import { useSnackbar } from "hooks/useSnackBar";

const Customer = () => {
  const customer = useSelector((state: RootState) => state.customer);
  const dispatch = useDispatch();

  const [cusInfo, setCusInfo] = useState<T.CusProps>({
    callerName: "",
    phoneNumber: "",
    callNotes: "",
    status: false,
  });

  const [editInfo, setEditInfo] = useState<T.EditProps>({
    editName: "",
    editPhone: "",
    editNotes: "",
  });

  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackbarDeleteOpen, setSnackbarDeleteOpen] = useState(false);
  const [snackbarEditOpen, setSnackbarEditOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSnackbarOpen = () => setSnackBarOpen(true);
  const handleSnackbarClose = () => setSnackBarOpen(false);
  const handleDeleteSnackBarOpen = () => setSnackbarDeleteOpen(true);
  const handleDeleteSnackBarClose = () => setSnackbarDeleteOpen(false);
  const handleUpdateSnackBarOpen = () => setSnackbarEditOpen(true);
  const handleUpdateSnackBarClose = () => setSnackbarEditOpen(false);

  const handleEditMode = (id: T.IDProps) => {
    const newLists = customer.cusLists.map((cusList: T.CusProps) => {
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

    dispatch(customerEditMode(newLists));
  };

  const handleEditExit = (id: number | undefined) => {
    const newLists = customer.cusLists.map((cusList: T.CusProps) => {
      if (cusList.id === id) return { ...cusList, status: false };
      else return cusList;
    });

    dispatch(customerEditExit(newLists));
  };

  const handleEditUpdate = (
    id: number | undefined,
    editName: string,
    editPhone: string,
    editNotes: string
  ) => {
    const newLists = customer?.cusLists.map((cusList: T.CusProps) => {
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

    dispatch(editCustomer(newLists));
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
      id: customer.cusLists.length + 5,
      callerName: cusInfo.callerName,
      phoneNumber: cusInfo.phoneNumber,
      callNotes: cusInfo.callNotes,
      status: cusInfo.status,
    };

    dispatch(addCustomer(newCusItem));
  };

  const handleDeleteItem = (targetID: number | undefined) => {
    const newLists = customer.cusLists.filter(
      (cusList: T.CusProps) => cusList.id !== targetID
    );

    dispatch(deleteCustomer(newLists));
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

  const CreateSnackbar = useSnackbar(
    snackBarOpen,
    handleSnackbarClose,
    "success",
    "Customer Card를 추가하였습니다."
  );

  useEffect(() => {
    dispatch(fetchCustomerData());
  }, [dispatch]);

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
        {customer.cusLists?.map((cusList: T.CusProps) => (
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
                <UserInput
                  cusList={cusList}
                  editInfo={editInfo}
                  handleEditOnChange={handleEditOnChange}
                />
                <M.Stack direction="row">
                  <EditandCompleteBtn
                    handleEditUpdate={handleEditUpdate}
                    handleEditMode={handleEditMode}
                    status={cusList.status}
                    cusList={cusList}
                    editInfo={editInfo}
                    editMode={customer.editMode}
                    snackbarEditOpen={snackbarEditOpen}
                    handleUpdateSnackBarOpen={handleUpdateSnackBarOpen}
                    handleUpdateSnackBarClose={handleUpdateSnackBarClose}
                  />
                  <DeleteAndClearBtn
                    handleEditExit={handleEditExit}
                    handleDeleteItem={handleDeleteItem}
                    handleDeleteSnackBarOpen={handleDeleteSnackBarOpen}
                    snackbarDeleteOpen={snackbarDeleteOpen}
                    handleDeleteSnackBarClose={handleDeleteSnackBarClose}
                    status={cusList.status}
                    cusList={cusList}
                    editMode={customer.editMode}
                  />
                </M.Stack>
              </M.Stack>
              <UserInfo
                cusList={cusList}
                editInfo={editInfo}
                handleEditOnChange={handleEditOnChange}
              />
            </M.Stack>
          </M.Grid>
        ))}
      </M.Grid>
      <CardDialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        onSubmit={onSubmit}
        open={open}
        onChange={onChange}
        cusInfo={cusInfo}
      />

      {CreateSnackbar}
    </M.Box>
  );
};

export default Customer;
