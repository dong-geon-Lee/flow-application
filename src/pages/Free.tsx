import Checkbox from "@mui/material/Checkbox";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { blue, green, orange } from "@mui/material/colors";

//* palette는 타입 선언이 필요없음
const theme = createTheme({
  status: { danger: orange[500], info: blue[500] },
  palette: { secondary: { main: green[500] } },
});

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.status.danger,
  "&.Mui-checked": { color: theme.status.danger },
  background: theme.palette.secondary.main,
}));

const Free = () => {
  return (
    <ThemeProvider theme={theme}>
      <Checkbox defaultChecked color="primary" />
      <CustomCheckbox defaultChecked />
    </ThemeProvider>
  );
};

export default Free;
