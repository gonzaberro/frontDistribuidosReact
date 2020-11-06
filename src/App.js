import React from "react";
import Logged from "./Components/Logged";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store.js";
import { SnackbarProvider } from "notistack";


function App() {
  return (
    <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
      <Logged />
       </SnackbarProvider>
    </Provider>
  );
}

export default App;
