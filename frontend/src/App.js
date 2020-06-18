import React from "react";
import "./App.css";
import MenuSwitch from "./components/MenuSwitch/MenuSwitch";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { SnackbarProvider } from "notistack";
import store from "./store";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          getState={(state) => state.toastr} // This is the default
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />

        <MenuSwitch />
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
