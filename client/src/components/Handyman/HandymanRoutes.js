import { Route, Switch, useRouteMatch } from "react-router-dom";
import HandymanProfile from "../../pages/HandymanProfile";
import HandyPeople from "../../pages/HandyPeople";
import RegistrationForm from "../../pages/RegistrationForm";
import RequestForQuote from "../../pages/RequestForQuote";

const HandymanRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route
          exact
          path={path}
          render={(props) => <HandyPeople {...props} />}
        />
        <Route
          path={`${path}/register`}
          render={() => <RegistrationForm formId="handyman" />}
        />
        <Route
          path={`${path}/:id/forms/request-for-quote`}
          render={(props) => <RequestForQuote {...props} isAuthed={true} />}
        />
        <Route
          path={`${path}/:id`}
          render={(props) => <HandymanProfile {...props} />}
        />
      </Switch>
    </div>
  );
};
export default HandymanRoutes;
