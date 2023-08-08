import { useState } from "react";

import {
  Box,
  AppBar,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tabs,
  Tab,
  Toolbar,
  Menu,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Modal,
  Stack,
  Link,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
  TextField,
  Drawer,
  Alert,
  AlertTitle,
  Snackbar,
  CircularProgress,
  LinearProgress,
  Rating,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import { Typography, Checkbox } from "@mui/material";
import { green } from "@mui/material/colors";
import { Favorite, MoreVert, Share } from "@mui/icons-material";

const arrayData = ["고양이", "개", "염소", "호랑이", "악어"];
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
];
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
    cols: 2,
  },
];

const FreeValid = () => {
  const [inputStatus, setInputStatus] = useState(false);

  const [age, setAge] = useState(10);
  const [gender, setGender] = useState("gender");

  const [tapIndex, setTapIndex] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [listOpen, setListOpen] = useState(false);

  const [accordion, setAccordion] = useState("");

  const [autoCompleteValue, setAutoCompleteValue] = useState(top100Films[0]);
  const [autoCompleteInputValue, setAutoCompleteInputValue] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [show, setShow] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [ratingValue, setRatingValue] = useState(0);

  const handleChange = (e: any) => {
    setAge(e.target.value);
  };

  const handleOnChange = (e: any) => {
    setGender(e.target.value);
  };

  const handleTapChange = (e: any, newValue: number) => {
    setTapIndex(newValue);
  };

  const CustomTabPanel = (props: any) => {
    const { children, value, index } = props;

    return (
      <Box sx={{ pl: 3 }}>
        {value === index && <Typography>{children}</Typography>}
      </Box>
    );
  };

  const handleClose = (e: any) => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          mt: "2rem",
        }}
      >
        {/* //* #0 Typography */}
        {/* 텍스트를 표현하는 방법은 이거 하나다. */}
        <Typography variant="h6" sx={{ mb: "2.2rem" }}>
          form은 별도의 태그가 없다
        </Typography>

        {/* //* #1 Checkbox */}
        {/* 체크박스로 상태 관리 하는 방법  */}
        <FormGroup sx={{ mb: "2.2rem" }}>
          <FormControlLabel
            control={<Checkbox onChange={() => setInputStatus(!inputStatus)} />}
            label="체크박스"
          />
        </FormGroup>

        {/* //* #2 Select  */}
        {/* 셀렉트로 상태 관리 하는 방법  */}
        <FormControl sx={{ mb: "2.2rem", display: "block" }}>
          <InputLabel>Agea</InputLabel>
          <Select value={age} onChange={handleChange}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        {/* //* #3 Radio  */}
        {/* 레디오로 상태 관리 하는 방법 */}
        <FormControl sx={{ mb: "2.2rem" }}>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            defaultValue="female"
            name="radio-buttons-group"
            value={gender}
            onChange={handleOnChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        {/* //* #4 Appbar */}
        {/* Appbar는 기본적으로 Toolbar 내부에서 콘텐츠를 작성해 나간다 */}
        <AppBar sx={{ zIndex: 5000 }}>
          <Toolbar>
            <Typography>LOGO</Typography>
            <Button
              sx={{ marginLeft: "auto" }}
              color="warning"
              variant="contained"
            >
              Hello
            </Button>
          </Toolbar>
        </AppBar>

        {/* //* #5 Tabs */}
        {/* 다른 onChange와 차이점은 사용자가 받는 값을 2번쨰 인자로 처리 할 수 있다는 점이다. 이것을 의미하는 것은 */}
        {/* AppBar + Toolbar 내부에 Tap을 넣어서 네비게이션 바를 만들 수 있습니다 */}
        <Tabs
          value={tapIndex}
          onChange={handleTapChange}
          indicatorColor="secondary"
          textColor="primary"
          sx={{ mb: "2.2rem" }}
        >
          <Tab label="First" value={0} />
          <Tab label="First2" value={1} />
          <Tab label="First3" value={2} />
        </Tabs>
        <CustomTabPanel value={tapIndex} index={0}>
          Item one
        </CustomTabPanel>
        <CustomTabPanel value={tapIndex} index={1}>
          Item two
        </CustomTabPanel>
        <CustomTabPanel value={tapIndex} index={2}>
          Item three
        </CustomTabPanel>

        {/* //* #6 Menu */}
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{ mb: "2.2rem", mt: "2.2rem" }}
        >
          메뉴
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Dashboard</MenuItem>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>

        {/* //* #7 Card */}
        <Card sx={{ maxWidth: 275 }}>
          <CardHeader
            title="카드를 연습 중인 나"
            subheader="2023.8.5 (토)"
            avatar={<Avatar sx={{ bgcolor: green[500] }}>L</Avatar>}
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
            alt="고양이"
          />
          <CardContent>
            <Typography
              sx={{ fontSize: 20 }}
              variant="h4"
              color="black"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton>
              <Favorite />
            </IconButton>
            <IconButton>
              <Share />
            </IconButton>
            <Button size="small" sx={{ ml: "auto" }}>
              Learn More
            </Button>
          </CardActions>
        </Card>

        {/* //* #8 Dialog */}
        <Button onClick={() => setDialogOpen(true)} sx={{ m: 2 }}>
          다이얼로그
        </Button>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>다이얼로그가 열렸을 떄!</DialogTitle>
          <DialogContent>
            <DialogContentText>다이얼로그는 이런 용도입니다</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setDialogOpen(false)}>Agree</Button>
          </DialogActions>
        </Dialog>

        {/* //* #9 Modals */}
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Stack
            position="absolute"
            top="50%"
            left="50%"
            sx={{ background: "#fff", p: "2rem" }}
          >
            <Typography>이게 모달이다</Typography>
            <Button variant="contained" onClick={() => setModalOpen(false)}>
              닫기
            </Button>
          </Stack>
        </Modal>

        {/* //* #10 Link */}
        <Link href="#" color="secondary" variant="h6" underline="none">
          방문하기
        </Link>
      </Box>

      {/* //* #11 Container */}
      <Container sx={{ background: "green" }} maxWidth="xs">
        xs
      </Container>
      <Container sx={{ background: "green" }} maxWidth="sm">
        sm
      </Container>
      <Container sx={{ background: "green" }} maxWidth="md">
        md
      </Container>
      <Container sx={{ background: "green" }} maxWidth="lg">
        lg
      </Container>
      <Container sx={{ background: "green" }} maxWidth="xl">
        xl
      </Container>

      {/* //* #12 List */}
      <Box>
        <List>
          <ListItem divider onClick={() => setListOpen(!listOpen)}>
            <ListItemButton>
              <ListItemIcon>{listOpen ? "v" : ">"}</ListItemIcon>
              <ListItemText primary={"Expand List"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Collapse in={listOpen}>
          <List
            sx={{ width: 300, background: "beige", mt: "2rem", mb: "2rem" }}
          >
            {arrayData.map((item, index) => (
              <ListItem divider key={index}>
                <ListItemButton>
                  <ListItemIcon>{">"}</ListItemIcon>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Box>

      {/* //* #13 Accordion */}
      <Accordion
        expanded={accordion === "test1"}
        onChange={() => setAccordion("test1")}
      >
        <AccordionSummary expandIcon={">"}>
          <Typography>My Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>내 이름은 이동건이고 고양이를 좋아합니다</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={accordion === "test2"}
        onChange={() => setAccordion("test2")}
      >
        <AccordionSummary expandIcon={">"}>
          <Typography>My Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>내 이름은 이동건이고 고양이를 좋아합니다</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={accordion === "test3"}
        onChange={() => setAccordion("test3")}
      >
        <AccordionSummary expandIcon={">"}>
          <Typography>My Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>내 이름은 이동건이고 고양이를 좋아합니다</Typography>
        </AccordionDetails>
      </Accordion>

      {/* //* #14 AutoComplete */}
      <Autocomplete
        disablePortal
        options={top100Films}
        sx={{ mt: "2rem", mb: "2rem", p: "2rem" }}
        value={autoCompleteValue}
        onChange={(e: any, newValue: any) => setAutoCompleteValue(newValue)}
        inputValue={autoCompleteInputValue}
        onInputChange={(e, inputValue) => setAutoCompleteInputValue(inputValue)}
        renderInput={(params) => <TextField {...params} label="영화리스트" />}
        isOptionEqualToValue={() => true}
      />

      {/* //* #15 Drawer */}
      <Button onClick={() => setDrawerOpen(true)}>DrawerOpen</Button>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List>
          {arrayData.map((data, index) => (
            <ListItemButton key={index} onClick={() => setDrawerOpen(false)}>
              <ListItemText primary={data} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* //* #16 Alert */}
      <Button onClick={() => setShow(true)}>경고</Button>
      {show && (
        <Alert
          variant="filled"
          onClose={() => setShow(false)}
          action={<IconButton onClick={() => setShow(false)}>x</IconButton>}
          color="success"
        >
          <AlertTitle>정보를 알려주고 싶습니다.</AlertTitle>
        </Alert>
      )}

      {/* //* #17 Snackbar */}
      <Button onClick={() => setSnackbarOpen(true)}>스낵바버튼</Button>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={3000}
      >
        <Alert severity="success">제출이 완료되었습니다!</Alert>
      </Snackbar>

      {/* //* #18 Progress */}
      <CircularProgress variant="determinate" value={50} color="secondary" />
      <LinearProgress variant="determinate" value={30} color="info" />

      {/* //* #19 Rating */}
      <Rating
        precision={0.5}
        value={ratingValue}
        onChange={(e, val: any) => setRatingValue(val)}
        size="small"
      />
      <Typography>
        Rated {ratingValue !== undefined ? ratingValue : 0} Starts
      </Typography>

      {/* //* #20 imageList */}
      <ImageList variant="standard" sx={{ width: 400, height: 400 }} cols={3}>
        {itemData.map((image, index) => (
          <ImageListItem key={index}>
            <img src={image.img} alt={image.title} loading="lazy" />
            <ImageListItemBar
              position="below"
              title={image.title}
              subtitle={<p>{image.author}</p>}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

export default FreeValid;
