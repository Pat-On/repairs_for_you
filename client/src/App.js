import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import React, { useContext, Suspense } from "react";

import "./App.scss";
import Layout from "./hoc/Layout/Layout";
// import AdminPanel from "./components/adminPanel/AdminPanel";
import Login from "./containers/signUp/SignUp";
import MainPage from "./components/mainPage/mainPage";
// import SignIn from "./containers/signIn/SignIn";
// import Contact from "../src/components/contact/Contact";
import SignOut from "./containers/signOut/signOut";
// import HandymanRoutes from "./components/Handyman/HandymanRoutes";
import AuthContext from "./store/authContext";

//Lazy loading
const AdminPanel = React.lazy(() => {
  return import("./components/adminPanel/AdminPanel");
});
const HandymanRoutes = React.lazy(() => {
  return import("./components/Handyman/HandymanRoutes");
});
const Contact = React.lazy(() => {
  return import("../src/components/contact/Contact");
});
const SignIn = React.lazy(() => {
  return import("./containers/signIn/SignIn");
});



const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App container">
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route
            path="/"
            exact
            component={(props) => <MainPage {...props} />}
          />
          <Route
            path="/buyers"
            component={() => (
              <div>
                <h1>PLACEHOLDER buyers</h1>
              </div>
            )}
          />

          <Route
            path="/users/handyman"
            render={(props) => <HandymanRoutes {...props} />}
          />

          <Route
            path="/contact"
            render={() => (
              <div>
                <h1>
                  <Contact />{" "}
                </h1>
              </div>
            )}
          />

          <Route
            path="/signinout"
            component={(props) => <SignOut {...props} />}
          />
          <Route path="/signin" component={(props) => <SignIn {...props} />} />

          {authCtx.isLoggedIn && (
            <Route
              path="/admin-panel"
              render={(props) => <AdminPanel {...props} />}
            />
          )}

          <Route path="/login" component={(props) => <Login {...props} />} />

          <Redirect to="/" />
        </Switch>
        </Suspense>
      </Layout>
    </div>
  );
};

export default withRouter(App);
