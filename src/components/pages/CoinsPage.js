import { Box, LinearProgress, styled, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Crypto } from "../CurrencyContext";
import parse from "html-react-parser";
import CoinInfo from "../CoinInfo";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "30%",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "25px",
  borderRight: "2px solid grey",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const MarketData = styled(Box)(({ theme }) => ({
  width: "100%",
  alignSelf: "start",
  padding: "25px",
  paddingTop: "10px",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    alignItems: "start",
  },
}));

const CoinsPage = () => {
  const { id } = useParams();

  const SingleCoin = (url) => `https://api.coingecko.com/api/v3/coins/${url}`;

  const { currency, symbol } = useContext(Crypto);

  const [coin, setCoin] = useState();

  useEffect(() => {
    const fetchCoin = async () => {
      const res = await fetch(SingleCoin(id));
      const data = await res.json();
      setCoin(data);
    };
    fetchCoin();
  }, [currency, id]);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Wrapper>
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200px"
          style={{ marginBottom: "20px" }}
        />
        <Typography
          variant="h3"
          sx={{
            marginBottom: "20px",
            fontWeight: "bold",
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            paddingBottom: "15px",
            padding: "25px",
            paddingTop: "0px",
            fontFamily: "Montserrat",
            textAlign: "justify",
          }}
        >
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>
        <MarketData>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                marginBottom: "20px",
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                marginBottom: "20px",
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                marginBottom: "20px",
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </MarketData>
      </Sidebar>

      <CoinInfo coin={coin}></CoinInfo>
    </Wrapper>
  );
};

export default CoinsPage;
