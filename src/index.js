import React from "react";
import ReactDOM from "react-dom/client";
import App from "Containers/App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "redux/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
    <ToastContainer />
  </Provider>
);
