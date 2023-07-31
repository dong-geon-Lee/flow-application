import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider, styled } from "@mui/material";
import { blue, orange } from "@mui/material/colors";

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.status.danger,
  "&.Mui-checked": {
    color: theme.status.danger,
  },
}));

const theme = createTheme({
  status: {
    danger: orange[500],
    info: blue[500],
  },
});

const Free = () => {
  return (
    <ThemeProvider theme={theme}>
      <CustomCheckbox defaultChecked />
    </ThemeProvider>
  );
};

export default Free;
