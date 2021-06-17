import { Route, Switch } from "react-router-dom";
import About from "./pages/About";
import HandyPeople from "./pages/HandyPeople";
import Home from "./pages/Home";
import Layout from "./hoc/Layout/Layout";

import "./App.scss";
import HandymanProfile from "./pages/HandymanProfile";

const App = () => (
	<div className="App container">
		<Layout>
			<Switch>
				<Route path="/" exact component={Home} />
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
					path="/handy"
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
							<h1>PLACEHOLDER CONTACTS</h1>
						</div>
					)}
				/>

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
