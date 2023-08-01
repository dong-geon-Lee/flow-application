import { createTheme } from "@mui/material";
import { blue, orange, yellow } from "@mui/material/colors";

export const theme = createTheme({
  status: {
    danger: orange[500],
    info: blue[500],
    warn: yellow[500],
  },
});
