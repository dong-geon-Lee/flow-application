import { ThemeProvider, Typography, createTheme, styled } from "@mui/material";
import { green } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";

const Pricing = () => {
  //* useTheme()
  const theme = useTheme();

  //* createTheme()
  const InnerTheme = createTheme({
    palette: { primary: { main: green[500] } },
  });

  //* styled & Components
  const H2 = styled(Typography)(() => ({
    fontSize: "2rem",
    color: theme.status.info,
  }));

  const H3 = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
  }));

  return (
    <>
      <H2>Pricing</H2>

      <ThemeProvider theme={InnerTheme}>
        <H3>나는 녹색이야</H3>
      </ThemeProvider>
    </>
  );
};

export default Pricing;
