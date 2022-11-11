import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import CoinsPage from "./components/pages/CoinsPage";
import HomePage from "./components/pages/HomePage";

function App() {
  
  return (
    <div className="App">
      <Header path="/"/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route exact path="/coins/:id" element={<CoinsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
