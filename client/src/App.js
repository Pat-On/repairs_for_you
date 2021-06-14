import { Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Layout from "./hoc/Layout/Layout";

import "./App.scss";

const App = () => (
	<div className="App container">
		<Layout>
			<Switch>
				<Route path="/" exact component={About} />
				<Route path="/about/this/site"><About /></Route>
			</Switch>
		</Layout>
	</div>
);

export default App;
