import { useState } from "react";

import {
  Accordion,
  AccordionSummary,
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { Favorite, MoreVert, Share } from "@mui/icons-material";

const menuOptions = [
  "메뉴를 골라주세요",
  "맥북 M1 Pro",
  "삼성 A34 5g",
  "LG Gram",
];

const Test = () => {
  const [checkValue, setCheckValue]: any = useState({
    agree: false,
    disagree: false,
  });

  const [selectValue, setSelectValue] = useState("아이폰");

  const [radioValue, setRadioValue] = useState("");

  const [tabValue, setTabValue] = useState(0);

  const [anchorEl, setAnchorEl]: any = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [listOpen, setListOpen] = useState(false);

  const onCheckChange = (e: any) => {
    setCheckValue({ ...checkValue, [e.target.name]: e.target.checked });
  };

  const onSelectChange = (e: any) => {
    setSelectValue(e.target.value);
  };

  const onRadioChange = (e: any) => {
    setRadioValue(e.target.value);
  };

  const onTabChange = (e: any, newValue: any) => {
    setTabValue(newValue);
  };

  const handleMenuButton = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuItemClick = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* //* #0 Typography */}
      <div>
        <Typography variant="h6">안녕하세요</Typography>
        <Typography variant="body1">안녕하세요</Typography>
        <Typography variant="subtitle1">안녕하세요</Typography>
        <Typography variant="body2">안녕하세요</Typography>
        <Typography variant="subtitle2">안녕하세요</Typography>
        <Typography variant="button" sx={{ display: "block" }}>
          안녕하세요
        </Typography>
        <Typography variant="caption" sx={{ display: "block" }}>
          안녕하세요
        </Typography>
        <Typography variant="overline" sx={{ display: "block" }}>
          안녕하세요
        </Typography>
      </div>

      {/* //* #1 Checkbox */}
      <div>
        <FormGroup sx={{ flexDirection: "row" }}>
          <FormControlLabel
            control={<Checkbox />}
            label="동의"
            name="agree"
            checked={checkValue.agree}
            onChange={onCheckChange}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="거절"
            name="disagree"
            checked={checkValue.disagree}
            onChange={onCheckChange}
          />
        </FormGroup>
      </div>

      {/* //* #2 Select */}
      <div>
        <FormControl sx={{ mt: "2rem", width: "10rem" }}>
          <InputLabel>전자제품</InputLabel>
          <Select value={selectValue} onChange={onSelectChange}>
            <MenuItem value="아이폰">아이폰</MenuItem>
            <MenuItem value="플레이스테이션">플레이스테이션</MenuItem>
            <MenuItem value="과일세트">과일세트</MenuItem>
            <MenuItem value="외장모니터">외장모니터</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* //* #3 Radio */}
      <div>
        <FormControl>
          <FormLabel>메뉴를 선택해주세요</FormLabel>
          <RadioGroup onChange={onRadioChange} value={radioValue}>
            <FormControlLabel
              control={<Radio />}
              label="radio1"
              value="radio1"
            />
            <FormControlLabel
              control={<Radio />}
              label="radio2"
              value="radio2"
            />
          </RadioGroup>
        </FormControl>
      </div>

      {/* //* #4 AppBar */}
      <div>
        <AppBar sx={{ zIndex: 1 }}>
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography>바르보사</Typography>
              <Button color="warning">버튼 굿잡</Button>
            </Box>
          </Toolbar>
        </AppBar>
      </div>

      {/* //* #5 Tabs */}
      <div>
        <Tabs
          value={tabValue}
          onChange={onTabChange}
          indicatorColor="secondary"
          textColor="primary"
        >
          <Tab label={"맥북"} value={0} />
          <Tab label={"아이폰"} value={1} />
          <Tab label={"USB"} value={2} />
        </Tabs>
        <Box>{tabValue === 0 && <Typography>Item 첫번째 </Typography>}</Box>
        <Box>{tabValue === 1 && <Typography>Item 두번쨰 </Typography>}</Box>
        <Box>{tabValue === 2 && <Typography>Item 세번쨰 </Typography>}</Box>
      </div>

      {/* //* #6 Menu */}
      <div>
        <Button onClick={handleMenuButton}>옵션</Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {menuOptions.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
        <Typography>{menuOptions[selectedIndex]}</Typography>
      </div>

      {/* //* #7 Card */}
      <div>
        <Card sx={{ maxWidth: 275 }}>
          <CardHeader
            title="삼성 갤럭시 A34"
            subheader="2023.8.7 (월)"
            avatar={<Avatar sx={{ bgcolor: green[400] }}>L</Avatar>}
            action={
              <IconButton>
                <MoreVert />
              </IconButton>
            }
          />
          <CardMedia
            src={
              "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            }
            component="img"
            height="160"
            alt="image_cat"
          />

          <CardContent>
            <Typography variant="h6">안녕하세요</Typography>
            <Typography variant="subtitle1">삼성 갤럭시 유저입니다~</Typography>
          </CardContent>

          <CardActions>
            <IconButton>
              <Favorite />
            </IconButton>
            <IconButton>
              <Share />
            </IconButton>
            <Button sx={{ ml: "auto", width: "100%", display: "block" }}>
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>

      {/* //* #8 Dialog */}
      <div>
        <Button onClick={() => setDialogOpen(true)}>다이얼로그</Button>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>다이얼로그 화면</DialogTitle>
          <DialogContent>
            <DialogContentText>1. 갤럭시 A34</DialogContentText>
            <DialogContentText>2. 맥북 M1 Pro</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setDialogOpen(false);
                alert("조항에 동의하셨습니다");
              }}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* //* #9 Modals */}
      <div>
        <Button onClick={() => setModalOpen(true)}>Modals</Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Stack
            sx={{ background: "#fff", p: "2rem" }}
            position="absolute"
            top="50%"
            left="50%"
          >
            <Typography>모달 open 상태</Typography>
            <Button variant="contained" onClick={() => setModalOpen(false)}>
              닫기
            </Button>
          </Stack>
        </Modal>
      </div>

      {/* //* #10 Link */}
      <div>
        <Link href="#" underline="none">
          일반 링크
        </Link>
      </div>

      {/* //* #11 Container */}
      <div>
        <Container maxWidth="xs" sx={{ background: "green" }}>
          xs
        </Container>
        <Container maxWidth="sm" sx={{ background: "green" }}>
          sm
        </Container>
        <Container maxWidth="md" sx={{ background: "green" }}>
          md
        </Container>
        <Container maxWidth="lg" sx={{ background: "green" }}>
          lg
        </Container>
        <Container maxWidth="xl" sx={{ background: "green" }}>
          xl
        </Container>
      </div>

      {/* //* #12 List */}
      <div>
        <List>
          <ListItem onClick={() => setListOpen(!listOpen)} divider>
            <ListItemButton>
              <ListItemIcon>{listOpen ? "v" : ">"}</ListItemIcon>
              <ListItemText primary="목록 조회" />
            </ListItemButton>
          </ListItem>
        </List>
        <Collapse in={listOpen}>
          <List disablePadding sx={{ width: "100%", background: "beige" }}>
            {menuOptions.map((item, index) => (
              <ListItem disablePadding key={index} divider>
                <ListItemButton>{item}</ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </div>

      {/* //* #13 Accordion */}
      {/* <div>
        <Accordion expanded={}>
          <AccordionSummary>
            <Typography>My Details</Typography>
          </AccordionSummary>
        </Accordion>
      </div> */}
    </>
  );
};

export default Test;
