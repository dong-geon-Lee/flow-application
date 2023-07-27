import * as M from "@mui/material";

const UserInput = ({ cusList, editInfo, handleEditOnChange }: any) => {
  return (
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
          <M.Typography variant="caption" component="p" width="100%" noWrap>
            {cusList.phoneNumber}
          </M.Typography>
        )}
      </M.Stack>
    </M.Grid>
  );
};

export default UserInput;
