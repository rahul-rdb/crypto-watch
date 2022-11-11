import {
  Box,
  Button,
  CircularProgress,
  createTheme,
  styled,
  ThemeProvider,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { Crypto } from "./CurrencyContext";
import "chart.js/auto"; // ADD THIS

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

const InfoWrapper = styled(Box)(({ theme }) => ({
  width: "70%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "25px",
  padding: "40px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginTop: "0px",
    padding: "20px",
    paddingTop: "0px",
  },
}));

const CoinInfo = () => {
  const { id } = useParams();

  const { currency } = useContext(Crypto);

  const [days, setDays] = useState(1);

  const HistoricalChart = (id, currency, days) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

  const [info, setInfo] = useState();

  useEffect(() => {
    const fetchInfo = async () => {
      const res = await fetch(HistoricalChart(id, currency, days));
      const data = await res.json();
      setInfo(data.prices);
    };
    fetchInfo();
  }, [currency, id, days]);

  return (
    <ThemeProvider theme={darkTheme}>
      <InfoWrapper>
        {!info ? (
          <CircularProgress
            style={{
              color: "gold",
            }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: info.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                      : `${date.getHours()}:${date.getMinutes()}AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: info.map((coin) => coin[1]),
                    label: `Price (Past ${days} ${days===1?"Day":"Days"} ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: { point: { radius: 1 } },
                plugins: { legend: { labels: { color: "#fff" } } },
              }}
            />
            <Box
              sx={{
                display: "flex",
                marginTop: "20px",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((btn) => (
                <Button
                  onClick={() => setDays(btn.value)}
                  key={btn.value}
                  sx={{
                    backgroundColor: btn.value === days ? "gold" : "",
                    color: btn.value === days ? "black" : "",
                    fontWeight: btn.value === days ? "700" : "500",
                    width: "22%",
                    border: "1px solid gold",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    fontFamily: "Montserrat",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "gold",
                      color: "black",
                      fontWeight: "600",
                    },
                  }}
                >
                  {btn.label}
                </Button>
              ))}
            </Box>
          </>
        )}
      </InfoWrapper>
    </ThemeProvider>
  );
};

export default CoinInfo;
