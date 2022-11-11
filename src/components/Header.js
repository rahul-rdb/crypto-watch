import React, { useContext } from "react";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  createTheme,
  styled,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Crypto } from "./CurrencyContext";
import "./Banner/animation.css";

const StyledLogo = styled(Typography)({
  fontWeight: "bold",
  cursor: "pointer",
  flex: 1,
  fontFamily: "Montserrat",
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});


const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency } = useContext(Crypto);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <StyledLogo className="glow" variant="h6" onClick={() => navigate("/crypto-watch")}>
              Crypto Watch
            </StyledLogo>
            <Select
              defaultValue={"USD"}
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginLeft: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
