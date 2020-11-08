import React from "react";
import LoginSwitch from "./Components/LoginSwitch";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store.js";
import { SnackbarProvider } from "notistack";


function App() {
  return (
    <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
      <LoginSwitch />
       </SnackbarProvider>
    </Provider>
  );
}

export default App;
