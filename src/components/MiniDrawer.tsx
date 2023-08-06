import React, { useCallback, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Badge, Button, Collapse, Menu, MenuItem, Stack } from "@mui/material";
import {
  Notifications,
  AccountCircle,
  ExpandMore,
  ChevronRight,
  DownloadOutlined,
  UpdateOutlined,
  RadioButtonUncheckedSharp,
} from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { logout } from "app/features/auth/authSlice";

const StyledTreeView = styled(TreeView)`
  .MuiTreeItem-group {
    margin-left: 0;
  }
`;

const StyledTreeItem = styled(TreeItem)`
  .MuiTreeItem-iconContainer {
    display: none;
  }
`;

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const MiniDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [drawerTap, setDrawerTap] = useState("sample");
  const [drawerChildTap, setDrawerChildTap] = useState("list1");

  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const hanldeCustomLinks = (link: string) => {
    let linkText = link.toLowerCase();

    switch (linkText) {
      case "dashboard":
        return "/";
      case "customer":
        return "/customer";
      case "profile":
        return "/profile";
      case "invoice":
        return "/invoice";
      case "e-commerce":
        return "/ecommerce";
      case "contact us":
        return "/contact";
      case "pricing":
        return "/pricing";
      default:
        return "/";
    }
  };

  // import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

  const handleCustomIcons = (link: string) => {
    let linkText = link.toLowerCase();

    switch (linkText) {
      case "dashboard":
        return <DashboardIcon />;
      case "customer":
        return (
          <>
            <SupportAgentIcon />
          </>
        );
      case "profile":
        return <AccountCircleOutlinedIcon />;
      case "invoice":
        return <DescriptionOutlinedIcon />;
      case "e-commerce":
        return <ShoppingCartOutlinedIcon />;
      case "contact us":
        return <PhoneEnabledOutlinedIcon />;
      case "pricing":
        return <MonetizationOnOutlinedIcon />;
      default:
        return;
    }
  };

  const handleClick = (item: any) => {
    setDrawerTap((prevOpen) => (prevOpen === item ? null : item));
  };

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout("로그아웃되었습니다"));

    localStorage.removeItem("authToken");
    localStorage.removeItem("users");
    localStorage.removeItem("singleUser");
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SonaViewer
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: "green",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: "0.4rem",
              ml: "2rem",
            }}
            onClick={() => handleLogout()}
          >
            로그아웃
          </Button>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ ml: "auto" }}>
              <IconButton
                size="small"
                edge="start"
                sx={{
                  color: "inherit",
                  ml: "auto",
                  mr: 2,
                }}
              >
                <Badge badgeContent={2} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="small"
                edge="start"
                sx={{
                  color: "inherit",
                  ml: "auto",
                  mr: 2,
                }}
              >
                <Badge badgeContent={5} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton
                size="medium"
                edge="start"
                sx={{
                  color: "inherit",
                  ml: "auto",
                  mr: 2,
                }}
                onClick={handleMenu}
              >
                <Badge color="error">
                  <AccountCircle />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </Box>
            <Typography variant="h6" noWrap component="div" />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Dashboard", "Customer", "Profile", "Invoice"].map((text) => (
            <Link
              to={hanldeCustomLinks(text)}
              key={text}
              style={{ textDecoration: "none" }}
            >
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {handleCustomIcons(text)}
                  </ListItemIcon>

                  <ListItemText
                    //! 편집
                    primary={text === "" ? "Dashboard" : text}
                    sx={{ opacity: open ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />

        <List>
          {["E-commerce", "Contact US", "Pricing"].map((text) => (
            <Link
              to={hanldeCustomLinks(text)}
              key={text}
              style={{ textDecoration: "none" }}
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {handleCustomIcons(text)}
                  </ListItemIcon>

                  <ListItemText
                    primary={text}
                    sx={{ opacity: open ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>

        {/* 독립적으로 구분해서 진행하는중 
        //* 자연스럽게 텍스트가 나열안되어 임의로 free 컴포넌트 세팅하고 실험 중 
        */}
        <List sx={{ ".css-m69qwo-MuiStack-root": { width: "100%" } }}>
          <Link
            to="free"
            style={{
              textDecoration: "none",
            }}
          >
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack direction="row">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <AccountCircleOutlinedIcon />
                  </ListItemIcon>

                  <ListItemText
                    primary="free"
                    sx={{
                      opacity: open ? 1 : 0,
                      color: "black",
                      margin: "0 auto",
                      textAlign: "left",
                      width: "100%",
                    }}
                  />
                </Stack>
                {open && location.pathname === "/free" && (
                  <StyledTreeView aria-label="tree" sx={{ width: "100%" }}>
                    <StyledTreeItem
                      nodeId="1"
                      label="free information"
                      sx={{ textDecoration: "none", color: "black" }}
                    >
                      <StyledTreeItem nodeId="2" label="free 1-1" />
                    </StyledTreeItem>
                    <StyledTreeItem
                      nodeId="5"
                      label="free action"
                      sx={{ textDecoration: "none", color: "black" }}
                    >
                      <StyledTreeItem nodeId="10" label="Subitem 1-1" />
                      <StyledTreeItem nodeId="6" label="Subitem 1-2">
                        <StyledTreeItem nodeId="8" label="Subitem 1-2-(1)" />
                      </StyledTreeItem>
                    </StyledTreeItem>
                  </StyledTreeView>
                )}
              </ListItemButton>
            </ListItem>
          </Link>

          <Link
            to="freevalid"
            style={{
              textDecoration: "none",
            }}
          >
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack direction="row">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <AccountCircleOutlinedIcon />
                  </ListItemIcon>

                  <ListItemText
                    primary="freevalid"
                    sx={{
                      opacity: open ? 1 : 0,
                      color: "black",
                      margin: "0 auto",
                      textAlign: "left",
                      width: "100%",
                    }}
                  />
                </Stack>
              </ListItemButton>
            </ListItem>
          </Link>

          <List component="div" disablePadding>
            <ListItem disablePadding divider>
              <Link to="/freevalid" style={{ width: "100%" }}>
                <ListItemButton onClick={() => open && handleClick("auth")}>
                  <ListItemIcon>
                    <LockOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Auth" />
                  {drawerTap === "auth" ? (
                    <ExpandMoreIcon style={{ fontSize: "0.75rem" }} />
                  ) : (
                    <KeyboardArrowRightIcon style={{ fontSize: "0.75rem" }} />
                  )}
                </ListItemButton>
              </Link>
            </ListItem>
            <Collapse in={drawerTap === "auth"} timeout="auto" unmountOnExit>
              <Link to="/">
                <ListItemButton sx={{ pl: 5 }}>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </Link>
              <Link to="/customer">
                <ListItemButton sx={{ pl: 5 }}>
                  <ListItemText primary="Customer" />
                </ListItemButton>
              </Link>
            </Collapse>
          </List>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, background: "#fafafb" }}>
        <DrawerHeader />
        {/* //* outlet area */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MiniDrawer;
