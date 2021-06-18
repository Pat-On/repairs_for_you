import { Route, Switch } from "react-router-dom";
import About from "./pages/About";
import HandyPeople from "./pages/HandyPeople";
import Home from "./pages/Home";
import Layout from "./hoc/Layout/Layout";
import AdminPanel from "./components/adminPanel/AdminPanel";
import Login from "./containers/signUp/SignUp";
import MainPage from "./components/mainPage/mainPage";

import "./App.scss";
import HandymanProfile from "./pages/HandymanProfile";
import HandymanRegistrationForm from "./components/HandymanRegistrationForm/HandymanRegistrationForm";

const App = () => (
	<div className="App container">
		<Layout>
			<Switch>

				<Route path="/" exact component={(props) => <MainPage {...props} />} />
				<Route path="/buyers" exact component={() => <div><h1>PLACEHOLDER buyers</h1></div>} />
				<Route path="/handy" exact component={() => <div><HandyPeople /> </div>} />

				<Route path="/contact" exact component={() => <div><h1>PLACEHOLDER CONTACTS</h1></div>} />

				<Route path="/about/this/site"><About /></Route>
				<Route path="/admin-panel" component={(props) => <AdminPanel {...props} />} />
				<Route path="/login" component={(props) => <Login {...props} />} />
				<Route path="/register"> <HandymanRegistrationForm /> </Route>

				<Route path="/about/this/site">
					<About />
				</Route>
				<Route
					path="/handy/:id"
					exact
					render={({ match }) => <HandymanProfile id={match.params.id} />}
				/>

			</Switch>
		</Layout>
	</div>
);

export default App;
