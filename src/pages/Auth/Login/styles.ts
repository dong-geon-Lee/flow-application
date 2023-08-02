import { styled } from "@mui/material";

export const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;

  & a {
    text-decoration: none;
    color: #1890ff;
    font-size: 1.4rem;
  }
`;

export const LogoBox = styled("div")`
  width: 100%;
  padding: 1.4rem 1.4rem;
`;

export const Img = styled("img")`
  width: 11rem;
  object-fit: cover;
  display: block;
`;

export const Section = styled("section")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto 0;
  background-color: #fff;
  z-index: 2;
`;

export const ContentBox = styled("div")`
  min-width: 47rem;
  max-height: 50rem;
  padding: 3rem;
`;

export const Label = styled("label")`
  display: block;
  font-size: 1.6rem;
  font-weight: 400;
  color: #959595;
`;

export const Form = styled("form")`
  margin-top: 0.6rem;
  margin-bottom: 2.6rem;
  width: 100%;
`;

export const InputBox = styled("div")`
  margin-bottom: 3rem;
`;

export const Bottom = styled("footer")`
  display: flex;
  justify-content: space-evenly;

  & button {
    margin-top: 2.4rem;
  }
`;

export const Footer = styled("footer")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 3.6rem;

  & a {
    display: flex;
    align-items: center;

    & p {
      font-size: 1.2rem;
    }
  }
`;
