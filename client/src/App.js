import { Route, Switch } from "react-router-dom";

import About from "./pages/About";
import Handypeople from "./pages/Handypeople";
import Home from "./pages/Home";

const App = () => (
	<Switch >
		<Route path="/" exact><Home /></Route>
		<Route path="/about/this/site"><About /></Route>
		<Route path="/this/site/handyPeople"><Handypeople /></Route>
	</Switch>
);

export default App;
