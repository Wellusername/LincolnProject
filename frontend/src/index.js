import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Navigation";
import { createTheme, ThemeProvider } from "@mui/material";
import EncodePage from "./pages/EncodePage";
import ScanPage from "./pages/ScanPage";
import NewEpicsEventPage from "./pages/NewEpicsEventPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  palette: {
    primary: {
      main: "#A06840",
    },
    secondary: {
      main: "#00000",
    },
  },
});

root.render(
  <React.Fragment>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<EncodePage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/newEvent" element={<NewEpicsEventPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
