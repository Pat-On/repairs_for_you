import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import React, { useContext } from "react";

import "./App.scss";
import About from "./pages/About";
import HandyPeople from "./pages/HandyPeople";
import Layout from "./hoc/Layout/Layout";
import AdminPanel from "./components/adminPanel/AdminPanel";
import Login from "./containers/signUp/SignUp";
import MainPage from "./components/mainPage/mainPage";
import HandymanProfile from "./pages/HandymanProfile";
import RegistrationForm from "./pages/RegistrationForm";
import SignIn from "./containers/signIn/SignIn";
import Contact from "../src/"
import SignOut from "./containers/signOut/signOut";

import RequestForQuote from "./pages/RequestForQuote";


import AuthContext from "./store/authContext";

const App = () => {
	const authCtx = useContext(AuthContext);


	return (
		<div className="App container">
			<Layout>
				<Switch>
					<Route
						path="/"
						exact
						component={(props) => <MainPage {...props} />}
					/>
					<Route
						path="/buyers"
						exact
						component={() => (
							<div>
								<h1>PLACEHOLDER buyers</h1>
							</div>
						)}
					/>
					<Route
						path="/users/handyman"
						exact
						component={() => (
							<div>
								<HandyPeople />{" "}
							</div>
						)}
					/>


					<Route
						path="/contact"
						exact
						component={() => (
							<div>
								<h1><Contact />  </h1>
							</div>
						)}
					/>

					<Route
						path="/signinout"
						component={(props) => <SignOut {...props} />}
					/>
					<Route path="/signin" component={(props) => <SignIn {...props} />} />

					<Route path="/about/this/site">
						<About />
					</Route>
					{authCtx.isLoggedIn && (
						<Route
							path="/admin-panel"
							component={(props) => <AdminPanel {...props} />}
						/>
					)}

					<Route path="/login" component={(props) => <Login {...props} />} />

					<Route path="/about/this/site">
						<About />
					</Route>

					<Route
						path="/users/:usergroup/register"
						exact
						render={({ match }) => (
							<RegistrationForm formId={match.params.usergroup} />
						)}
					/>

					<Route
						path="/users/handyman/:id"
						exact
						render={({ match }) => <HandymanProfile id={match.params.id} />}
					/>

					<Route
						path="/forms/request-for-quote"
						render={(props) => <RequestForQuote {...props} isAuthed={true} />}
					/>

					<Redirect to="/" />
				</Switch>
			</Layout>
		</div>
	);
};


export default withRouter(App);
