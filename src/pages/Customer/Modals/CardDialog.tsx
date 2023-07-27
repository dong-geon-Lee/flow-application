import * as M from "@mui/material";
import * as I from "@mui/icons-material";

const CardDialog = ({
  handleClickOpen,
  handleClose,
  onSubmit,
  open,
  onChange,
  cusInfo,
}: any) => {
  return (
    <>
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
    </>
  );
};

export default CardDialog;
