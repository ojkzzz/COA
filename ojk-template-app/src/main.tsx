import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import { ruRU } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";

dayjs.locale("ru");
const ruLocale = ruRU.components.MuiLocalizationProvider.defaultProps.localeText;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <LocalizationProvider adapterLocale={"ru"} dateAdapter={AdapterDayjs} localeText={ruLocale}>
          <App />
        </LocalizationProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
