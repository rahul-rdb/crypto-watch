import { Box, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import banner from "../../images/banner2.jpg";
import Carousel from "./Carousel";

const BannerWrapper = styled(Box)({
  backgroundImage: `url(${banner})`,
});

const HeaderWrapper = styled("div")({
  height: "40%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Carouselwrapper = styled("div")({
  height: "50%",
  display: "flex",
  alignItems: "center",
});

const BannerHeader = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: "15px",
  fontFamily: "Montserrat",
  [theme.breakpoints.down("sm")]: {
    fontSize: "30px",
  },
}));

const Banner = () => {
  return (
    <BannerWrapper>
      <Container
        sx={{
          height: "400px",
          display: "flex",
          flexDirection: "column",
          paddingTop: "25px",
          justifyContenct: "space-around",
        }}
      >
        <HeaderWrapper>
          <BannerHeader variant="h2">Crypto Watch</BannerHeader>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgray",
              fontFamily: "Montserrat",
              textTransform: "capitalize",
            }}
          >
            Get All The Info Regarding Your Favorite Crypto Currency
          </Typography>
        </HeaderWrapper>
        <Carouselwrapper>
          <Carousel />
        </Carouselwrapper>
      </Container>
    </BannerWrapper>
  );
};

export default Banner;
