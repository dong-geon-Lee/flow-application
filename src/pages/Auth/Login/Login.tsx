import { Link } from "react-router-dom";
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
} from "@mui/material";

import { Google, Twitter, Facebook } from "@mui/icons-material";

import AuthBackground from "../AuthBackground";
import logo from "assets/images/logo.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { blue, pink } from "@mui/material/colors";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container sx={{ zIndex: 2 }}>
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
            >
              <InputLabel sx={{ fontSize: "1.2rem" }}>이메일</InputLabel>
              <OutlinedInput
                type="text"
                label="Email"
                sx={{ fontSize: "1.2rem", height: "4.6rem" }}
                placeholder="이메일을 입력해주세요"
              />
            </FormControl>

            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel sx={{ fontSize: "1.2rem" }}>비밀번호</InputLabel>
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
                sx={{ fontSize: "1.2rem", height: "4.6rem" }}
                placeholder="비밀번호를 입력해주세요"
              />
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
                  sx={{ fontSize: "1.3rem", fontWeight: "400" }}
                >
                  비밀번호를 잊어버렸나요?
                </Typography>
              </Link>
            </Stack>

            <Button
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

/* <InputBox>
                <TextField
                  type="text"
                  label="Email Address"
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-formControl": {
                      fontSize: "1.2rem",
                      width: "100%",
                      height: "4.6rem",
                      display: "block",
                    },
                    "& .MuiInputLabel-formControl": {
                      fontSize: "1.2rem",
                      display: "block",
                    },

                    "& .MuiOutlinedInput-input": {
                      padding: "1.4rem",
                      fontSize: "2rem",
                    },
                    display: "flex",
                    alignItems: "center",
                  }}
                />
              </InputBox> */
