import React, { useContext, useEffect, useState } from "react";
import { Crypto } from "../CurrencyContext";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const { currency, symbol } = useContext(Crypto);

  const [trending, setTrending] = useState([]);

  const trendingApi = (currency) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

  // useEffect(() => {
  //   fetch(trendingApi(currency))
  //     .then((res) => res.json())
  //     .then((data) => setTrending(data));
  // }, [currency]);

  // const fetchData = async () => {
  //   try {
  //     const res = await fetch(trendingApi(currency));
  //     const data = await res.json();
  //     setTrending(data);
  //   } catch (error) {
  //     console.log(error, "Not Found");
  //   }
  // };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(trendingApi(currency));
        const data = await res.json();
        setTrending(data);
      } catch (error) {
        console.log(error, "Not Found");
      }
    }
    fetchData();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link
        to={`/coins/${coin.id}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <img
          src={coin?.image}
          height="80px"
          alt={coin.name}
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red",
              fontWeight: 600,
            }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <AliceCarousel
        mouseTracking
        infinite
        disableDotsControls
        disableButtonsControls
        autoPlayInterval={1000}
        animationDuration={1500}
        autoPlay
        items={items}
        responsive={responsive}
      />
    </div>
  );
};

export default Carousel;
