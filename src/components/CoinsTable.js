import React, { useContext, useEffect, useState } from "react";
import { Crypto } from "./CurrencyContext";
import {
  Container,
  createTheme,
  LinearProgress,
  Pagination,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TableHeader = styled(Typography)(({ theme }) => ({
  margin: "18px",
  fontFamily: "Montserrat",
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
  },
}));

const CoinsTable = () => {
  const [list, setlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    window.scroll(0, 450);
  };

  const navigate = useNavigate();

  const { currency, symbol } = useContext(Crypto);

  const CoinList = (currency) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      const res = await fetch(CoinList(currency));
      const data = await res.json();
      setlist(data);
      setLoading(false);
    };
    fetchList();
  }, [currency]);

  const handleSearch = () => {
    return list.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center" }}>
        <TableHeader
          variant="h4"
        >
          Cryptocurrency Prices by Market Cap
        </TableHeader>
        <TextField
          label="Search for Crypto Currency"
          variant="outlined"
          sx={{ width: "100%", marginBottom: "20px" }}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((cell) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={cell}
                      align={cell === "Coin" ? "" : "right"}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        key={row.name}
                        onClick={() => navigate(`/coins/${row.id}`)}
                        sx={{
                          backgroundColor: "#16171a",
                          cursor: "pointer",
                          fontFamily: "Montserrat",
                          ":hover": {
                            backgroundColor: "#131111",
                          },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ display: "flex", gap: "15px" }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50px"
                            style={{ marginBottom: "10px" }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                fontSize: "22px",
                                textTransform: "uppercase",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: "20px",
            ul: {
              "& .MuiPaginationItem-root": {
                color: "gold",
              },
            },
          }}
          variant="outlined"
          onChange={handleChange}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
