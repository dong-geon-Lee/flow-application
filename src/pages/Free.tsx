import Checkbox from "@mui/material/Checkbox";
import {
  ThemeProvider,
  createTheme,
  styled,
  useTheme,
} from "@mui/material/styles";
import { blue, green, orange } from "@mui/material/colors";
import { Typography } from "@mui/material";

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
  //* 루트 Theme와 컴포넌트 Theme 간의 nesting Theme 사용하기
  const rootTheme = useTheme();

  const Title = styled(Typography)(() => ({
    color: rootTheme.status.warn,
  }));

  return (
    <ThemeProvider theme={theme}>
      <Checkbox defaultChecked color="primary" />
      <CustomCheckbox defaultChecked />
      <Title>나는 root Theme를 사용하고 있습니다</Title>
    </ThemeProvider>
  );
};

export default Free;
