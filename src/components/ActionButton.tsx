import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Alert } from "@mui/material";

export default function ActionButton({
  createCodeGroupData,
  createCodeGroup,
}: any) {
  const [open, setOpen] = useState(false);
  const [messageStatus, setMessageStatus] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      let timeoutId = setTimeout(() => {
        createCodeGroupData(createCodeGroup);
        setOpen(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [open, createCodeGroupData, createCodeGroup]);

  return (
    <div>
      <Button onClick={() => handleOpen()}>생성버튼</Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
