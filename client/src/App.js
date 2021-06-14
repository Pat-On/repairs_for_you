import { Route, Switch } from "react-router-dom";

import About from "./pages/About";
import HandyPeople from "./pages/HandyPeople";
import Home from "./pages/Home";

const App = () => (
	<Switch >
		<Route path="/" exact><Home /></Route>
		<Route path="/about/this/site"><About /></Route>
		<Route path="/this/site/handyPeople"><HandyPeople /></Route>
	</Switch>
);

export default App;
