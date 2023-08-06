import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Bottom,
  Container,
  ContentBox,
  Footer,
  Form,
  Img,
  LogoBox,
  Section,
} from "./styles";

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Button,
  Box,
  Checkbox,
  Divider,
  Chip,
  Backdrop,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { Google, Twitter, Facebook } from "@mui/icons-material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

import { RootState } from "app/store";
import { authUserLogin, refreshUserLists } from "app/features/auth/authSlice";

import AuthBackground from "../AuthBackground";
import logo from "assets/images/logo.png";

interface UserProps {
  email: string;
  password: any;
}

const Login = () => {
  const token = localStorage.getItem("authToken");

  const [userInfo, setUserInfo] = useState<UserProps>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [backdropStatus, setBackdropStatus] = useState(false);
  const [inputError, setInputError] = useState(false);

  const { userLists, userInfo: userinfo } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const publicPath = location.pathname === "/login";

  const handleBackdrop = () => {
    setBackdropStatus(true);
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onChange = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    handleBackdrop();
    setInputError(false);

    try {
      const [seletedValidUser] = userLists.filter((userList: any) => {
        if (
          userInfo.email === userList.email &&
          parseInt(userInfo.password) === userList.password
        )
          return userList;
      });

      if (seletedValidUser.hasOwnProperty("email")) {
        const newUserInfo = { ...seletedValidUser, authStatus: true };
        dispatch(authUserLogin(newUserInfo));
        localStorage.setItem("singleUser", JSON.stringify(newUserInfo));

        const newAuthUserLists = userLists.map((userList: any) => {
          if (userList.email === newUserInfo.email) {
            return newUserInfo;
          } else {
            return userList;
          }
        });

        dispatch(refreshUserLists(newAuthUserLists));
        localStorage.setItem("users", JSON.stringify(newAuthUserLists));
        localStorage.setItem("authToken", "get token!");
      }
    } catch (error: any) {
      setBackdropStatus(false);
      setInputError(true);
      return alert("이메일 또는 비밀번호가 존재하지않거나 잘못되었습니다");
    }

    setUserInfo({ email: "", password: "" });
  };

  useEffect(() => {
    if (userinfo.authStatus === true && backdropStatus === true && token) {
      let timeoutID = setTimeout(() => {
        setBackdropStatus(false);
        navigate("/");
      }, 1500);
      return () => clearTimeout(timeoutID);
    }

    if (token && publicPath) navigate("/");
  }, [userinfo.authStatus, token, backdropStatus, navigate, publicPath]);

  return (
    <Container sx={{ zIndex: 2, position: "relative" }}>
      {backdropStatus && (
        <Backdrop
          open={backdropStatus}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <AuthBackground />

      <LogoBox>
        <Img src={logo} alt="logo" />
      </LogoBox>

      <Section>
        <ContentBox>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography component="h1" variant="h4" fontSize="2rem">
              소너 뷰어
            </Typography>
            <Link to="/register">계정이 없으신가요?</Link>
          </Stack>

          <Form
            onSubmit={onSubmit}
            autoComplete="off"
            sx={{
              width: "100%",
            }}
          >
            <FormControl
              sx={{
                width: "100%",
                mt: "2.4rem",
                mb: "3.2rem",
              }}
              variant="outlined"
              error={inputError ?? true}
            >
              <InputLabel sx={{ fontSize: "1.2rem" }}>Email</InputLabel>
              <OutlinedInput
                type="text"
                label="Email"
                sx={{ fontSize: "1.2rem" }}
                name="email"
                value={userInfo.email}
                onChange={onChange}
                placeholder="이메일을 입력해주세요"
              />
              {inputError && (
                <FormHelperText>이메일을 다시 입력해주세요.</FormHelperText>
              )}
            </FormControl>

            <FormControl
              sx={{ width: "100%" }}
              variant="outlined"
              error={inputError ?? true}
            >
              <InputLabel sx={{ fontSize: "1.2rem" }}>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                sx={{ fontSize: "1.2rem" }}
                name="password"
                value={userInfo.password}
                onChange={onChange}
                placeholder="패스워드를 입력해주세요"
              />
              {inputError && (
                <FormHelperText>패스워드를 다시 입력해주세요.</FormHelperText>
              )}
            </FormControl>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              p="1.6rem 0"
            >
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Checkbox
                  id="boxInput"
                  sx={{
                    "&.Mui-checked": {
                      color: blue[500],
                    },
                    "& .css-i4bv87-MuiSvgIcon-root": { fontSize: "1.8rem" },
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "1.2rem",
                    userSelect: "none",
                    cursor: "pointer",
                    mt: "0.2rem",
                  }}
                  htmlFor="boxInput"
                >
                  로그인 유지하기
                </InputLabel>
              </Box>
              <Link to="/register" style={{ color: "black" }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "1.3rem",
                    fontWeight: "400",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  비밀번호를 잊어버렸나요?
                </Typography>
              </Link>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: "100%",
                display: "block",
                p: "0.8rem",
                textTransform: "capitalize",
                fontSize: "1.4rem",
                background: "#1790ff",
              }}
            >
              로그인
            </Button>
          </Form>

          <Stack direction="row">
            <Divider sx={{ width: "100%", height: "1rem", flex: 0.4 }} />
            <Typography
              variant="h5"
              fontSize="1.1rem"
              flex={0.2}
              textAlign="center"
              fontWeight="400"
            >
              간편 로그인
            </Typography>
            <Divider sx={{ width: "100%", height: "1rem", flex: 0.4 }} />
          </Stack>
          <Bottom>
            <Chip
              label="Google"
              component="button"
              sx={{
                background: "inherit",
                color: "#8c8c8c",
                fontSize: "1.4rem",
                border: "1px solid #8c8c8c",
                borderRadius: "0.4rem",
                p: "1.8rem 1.4rem",
                display: "flex",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  border: "1px solid black",
                  color: "black",
                },
              }}
              icon={
                <Google
                  sx={{
                    color: "blue",
                    fontSize: "2rem",
                    fill: "#ff934b",
                    display: "block",
                  }}
                />
              }
            />
            <Chip
              label="Twitter"
              component="button"
              sx={{
                background: "inherit",
                color: "#8c8c8c",
                fontSize: "1.4rem",
                border: "1px solid #8c8c8c",
                borderRadius: "0.4rem",
                p: "1.8rem 1.4rem",
                display: "flex",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  border: "1px solid black",
                  color: "black",
                },
              }}
              icon={
                <Twitter
                  sx={{
                    color: "blue",
                    fontSize: "2rem",
                    fill: "#06a9f4",
                    display: "block",
                  }}
                />
              }
            />
            <Chip
              label="Facebook"
              component="button"
              sx={{
                background: "inherit",
                color: "#8c8c8c",
                fontSize: "1.4rem",
                border: "1px solid #8c8c8c",
                borderRadius: "0.4rem",
                p: "1.8rem 1.4rem",
                display: "flex",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  border: "1px solid black",
                  color: "black",
                },
              }}
              icon={
                <Facebook
                  sx={{
                    color: "blue",
                    fontSize: "2rem",
                    fill: "#4267b2",
                    display: "block",
                  }}
                />
              }
            />
          </Bottom>
        </ContentBox>
      </Section>

      <Footer>
        <Stack direction="row" spacing={0.4}>
          <Typography variant="h6" color="grey">
            This site is protected by{" "}
          </Typography>
          <Link to="/">
            <Typography sx={{ fontSize: "1rem", display: "block" }}>
              Privacy Policy
            </Typography>
          </Link>
        </Stack>
        <Stack direction="row" justifyContent="space-evenly" spacing={3}>
          <Typography component="small" color="#b2b2b2">
            Terms and Conditions
          </Typography>
          <Typography component="small" color="#b2b2b2">
            Privacy Policy
          </Typography>
          <Typography component="small" color="#b2b2b2">
            CA Privacy Notice
          </Typography>
        </Stack>
      </Footer>
    </Container>
  );
};

export default Login;
