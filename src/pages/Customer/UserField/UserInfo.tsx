import * as M from "@mui/material";
import * as I from "@mui/icons-material";

const UserInfo = ({ cusList, editInfo, handleEditOnChange }: any) => {
  return (
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
  );
};

export default UserInfo;
