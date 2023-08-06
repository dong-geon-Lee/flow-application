import { useState } from "react";

import {
  AppBar,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tabs,
  Tab,
  ThemeProvider,
  Toolbar,
  createTheme,
  styled,
  useTheme,
  Grid,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { blue, green, orange, red, purple } from "@mui/material/colors";
import {
  Tooltip,
  Slider,
  Typography,
  Checkbox,
  CheckboxProps,
  TooltipProps,
} from "@mui/material";
import {
  CheckBox,
  DownloadOutlined,
  LayersOutlined,
  RadioButtonUncheckedSharp,
  SettingsOutlined,
  UpdateOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

interface AProps {
  active: boolean | string;
}

//* palette는 타입 선언이 필요없음
//* color token - main, light, dark, contrastText
//* Default colors - primary, secondary, error, warning, info, success
const theme = createTheme({
  status: { danger: orange[500], info: blue[500] },
  palette: {
    primary: red,
    secondary: {
      main: green[500],
      light: green[50],
      dark: green[800],
      darker: green[900],
    },
    contrastThreshold: 4.5,
  },
});

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.status.danger,
  "&.Mui-checked": { color: theme.status.danger },
  background: theme.palette.secondary.main,
}));

const subTheme = createTheme({
  palette: {
    primary: purple,
    secondary: {
      main: "#83ffe488",
      light: "#778b77",
      dark: "#0fff5b",
      contrastText: "#020302",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "secondary" && {
              fontSize: "5.6rem",
              color: "yellow",
            }),
        }),
      },
    },
  },
});

export const DarkerText = styled(Typography)(() => ({
  background: theme.palette.secondary.darker,
  color: "#fff",
}));

// ? 이게 내가 원한 커스텀으로 다루는 방식이다.
// ! 다른 테마도 스타일 적용이 가능하지만 공식문서에 의하면 동일한 테마 객체를 공유하는게 좋다고 명시되어있다.
const CustomizedSlider = styled(Slider)`
  background-color: ${subTheme.palette.secondary.dark};
  width: 40rem;
  display: block;
  padding: 2.4rem;
  margin: 1rem 15rem;

  & .MuiSlider-rail {
    width: 40rem;
  }

  & .MuiSlider-track {
    color: ${theme.palette.secondary.dark};
  }

  .MuiSlider-thumb {
    color: aqua;
  }
`;

//todo Portal 이용하기
const Free = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState("sample");
  const [openChild, setOpenChild] = useState("list1");

  const [inputStatus, setInputStatus] = useState(false);
  const [age, setAge] = useState(10);
  const [gender, setGender] = useState("gender");

  const handleChange = (e: any) => {
    setAge(e.target.value);
  };

  const handleOnChange = (e: any) => {
    setGender(e.target.value);
  };

  //* useTheme()
  const theme = useTheme();

  //* createTheme()
  const InnerTheme = createTheme({
    palette: {
      primary: { main: green[500] },
      tonalOffset: 0.5,
    },
    tonalOffset: 0.5,
  });

  // * primary, secondary가 아닌 별개의 스타일 테마를 만드려면 별도로 모듈 타입을 선언한 다음 작성해야됩니다.
  const ocTheme = createTheme({
    palette: {
      ochre: {
        main: "#E3D026",
        light: "#E9DB5D",
        dark: "#A29415",
        contrastText: "#242105",
      },
    },
  });

  //* styled & Components
  const H2 = styled(Typography)(() => ({
    fontSize: "2rem",
    color: theme.status.info,
  }));

  const H3 = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
  }));

  // todo, Theme를 수용하면서 styled-components 처럼 커스텀마이징 가능하다.
  const Title2 = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: "2.4rem",
    fontWeight: "800",
    border: "1px solid red",
  }));

  const Button1 = styled("button")`
    padding: 1.2rem 2rem;
    border: none;
    border-radius: 1rem;
    margin-left: 2rem;
    margin-top: 2rem;
    background-color: ${theme.palette.primary.main};
    cursor: pointer;

    &:hover {
      background-color: beige;
    }
  `;

  const Main = styled("main")`
    padding: 2rem;
    background-color: green;
    color: #fff;
  `;

  const Text = styled(Typography)<AProps>`
    font-size: 2.4rem;
    font-weight: 900;
    color: ${(props) => (props.active === false ? "red" : "blue")};
    border: 1px solid ${theme.palette.primary.light};
  `;

  //* 루트 Theme와 컴포넌트 Theme 간의 nesting Theme 사용하기
  const rootTheme = useTheme();

  const Title = styled(Typography)(() => ({
    color: rootTheme.status.warn,
    margin: rootTheme.spacing(10, 2),
  }));

  const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))`
    & .MuiTooltip-tooltip {
      background: navy;
    }
  `;

  const StyledCheckbox = styled(({ className, ...props }: CheckboxProps) => (
    <Checkbox {...props} classes={{ colorPrimary: className }} />
  ))`
    & .MuiCheckbox-colorInfo {
      color: red;
    }
  `;

  const handleClick = (item: any) => {
    setOpen((prevOpen) => (prevOpen === item ? null : item));
  };

  const handleChildClick = (item: any) => {
    setOpenChild((prevOpen) => (prevOpen === item ? null : item));
  };

  const dummyDatas = [
    { id: 1, name: "리", role: "개발자", skills: "소프트 스킬" },
    { id: 2, name: "수", role: "사업가", skills: "커리어 스킬" },
    { id: 3, name: "루", role: "작가", skills: "넥스트 스킬" },
  ];

  return (
    <>
      {/* <ThemeProvider theme={theme}>
        <hr />
        <h1>테스트</h1>
        <Checkbox color="info" defaultChecked />
        <StyledCheckbox defaultChecked />
        <hr />

        <Checkbox defaultChecked color="primary" />
        <CustomCheckbox defaultChecked />
        <Title>나는 root Theme를 사용하고 있습니다</Title>

        <ThemeProvider theme={subTheme}></ThemeProvider>
        <DarkerText>야 더더</DarkerText>

        <Slider
          defaultValue={30}
          sx={{
            width: 300,
            color: "success.main",

            "& .MuiSlider-thumb": { borderRadius: "1px" },
          }}
        />
        <CustomizedSlider defaultValue={10} />

        <H2>Pricing</H2>
        <ThemeProvider theme={InnerTheme}>
          <H3> 녹색</H3>
          <Title>별도의 주제</Title>
          <Button>버튼</Button>

          <Main>
            <Text
              active={active && active.toString()}
              onClick={() => setActive(!active)}
            >
              Text
            </Text>
          </Main>
        </ThemeProvider>
      </ThemeProvider> */}

      {/* <List sx={{ p: 0, mb: "5rem" }}>
        <List component="div" disablePadding>
          <ListItem disablePadding divider>
            <ListItemButton onClick={() => handleClick("sample")}>
              <ListItemIcon>
                <LayersOutlined />
              </ListItemIcon>
              <ListItemText primary="Sample" />
              {open === "sample" ? (
                <DownloadOutlined style={{ fontSize: "0.75rem" }} />
              ) : (
                <UpdateOutlined style={{ fontSize: "0.75rem" }} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={open === "sample"} timeout="auto" unmountOnExit>
            <ListItemButton sx={{ pl: 5 }}>
              <ListItemText primary="List item 01" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 5 }}
              onClick={() => handleChildClick("list1")}
            >
              <ListItemText primary="List item 02" />
              {openChild === "list1" ? (
                <DownloadOutlined style={{ fontSize: "0.75rem" }} />
              ) : (
                <UpdateOutlined style={{ fontSize: "0.75rem" }} />
              )}
            </ListItemButton>
            <Collapse in={openChild === "list1"} timeout="auto" unmountOnExit>
              <ListItemButton sx={{ pl: 7 }}>
                <ListItemText primary="List item 05" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 7 }}>
                <ListItemText primary="List item 06" />
              </ListItemButton>
            </Collapse>
          </Collapse>
        </List>

        <List component="div" disablePadding>
          <ListItem disablePadding divider>
            <ListItemButton onClick={() => handleClick("ui")}>
              <ListItemIcon>
                <RadioButtonUncheckedSharp />
              </ListItemIcon>
              <ListItemText primary="User" />
              {open === "ui" ? (
                <DownloadOutlined style={{ fontSize: "0.75rem" }} />
              ) : (
                <UpdateOutlined style={{ fontSize: "0.75rem" }} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={open === "ui"} timeout="auto" unmountOnExit>
            <Link to="/profile">
              <ListItemButton sx={{ pl: 5 }}>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </Link>
            <Link to="/profile">
              <ListItemButton sx={{ pl: 5 }}>
                <ListItemText primary="Product" />
              </ListItemButton>
            </Link>
          </Collapse>
        </List>

        <List component="div" disablePadding>
          <ListItem disablePadding divider>
            <ListItemButton onClick={() => handleClick("auth")}>
              <ListItemIcon>
                <RadioButtonUncheckedSharp />
              </ListItemIcon>
              <ListItemText primary="Auth" />
              {open === "auth" ? (
                <DownloadOutlined style={{ fontSize: "0.75rem" }} />
              ) : (
                <UpdateOutlined style={{ fontSize: "0.75rem" }} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={open === "auth"} timeout="auto" unmountOnExit>
            <Link to="/">
              <ListItemButton sx={{ pl: 5 }}>
                <ListItemText primary="authentication" />
              </ListItemButton>
            </Link>
            <Link to="/">
              <ListItemButton sx={{ pl: 5 }}>
                <ListItemText primary="userInterface" />
              </ListItemButton>
            </Link>
          </Collapse>
        </List>
      </List> */}

      <TableContainer sx={{ xs: 12, sm: 8, md: 6, lg: 3, xl: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ marginBottom: { xs: 22, sm: 11, md: 5 } }}>
                ID
              </TableCell>
              <TableCell>이름</TableCell>
              <TableCell>역할</TableCell>
              <TableCell>스킬</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dummyDatas.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.role}</TableCell>
                <TableCell>{data.skills}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Free;
