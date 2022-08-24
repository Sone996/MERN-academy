import { FC, useContext, useEffect, memo } from "react";
import { Route, useHistory } from "react-router-dom";

import { AppContext } from "../Context/AppProvider";

import { authService } from "../Modules/AuthModule/Auth.service";
// import { useFetchActiveUser } from "./Router.service";

export const ProtectedRoute: FC<any> = ({
  component: Component,
  ...rest
}) => {
  const history = useHistory();

  const [contextState] = useContext(AppContext);

  // TODO :: da li ovo treba
  // useFetchActiveUser();

  useEffect(() => {
      if (!authService.isLogged()) {
          history.push('/login');
      }
  }, [history]);

  // preko context-a
  // if (!contextState.user) {
  //   return null;
  // }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default memo(ProtectedRoute);
