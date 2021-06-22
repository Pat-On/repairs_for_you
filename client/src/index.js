import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvide } from "./store/authContext";

import App from "./App";
import "./index.scss";

ReactDOM.render(
  <AuthContextProvide>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvide>,

  document.getElementById("root")
);
