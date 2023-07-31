import AppRoutes from "routes/AppRoutes";
import { ThemeProvider, createTheme } from "@mui/material";
import { blue, orange, yellow } from "@mui/material/colors";

const App = () => {
  const theme = createTheme({
    status: {
      danger: orange[500],
      info: blue[500],
      warn: yellow[500],
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
