import { useContext } from "react";
import { useMutation } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import { useHistory } from "react-router-dom";
import { ActionTypes } from "../../Context/Reducers/App/AppProvider.types";
import { authService } from "../../Modules/AuthModule/Auth.service";
import { notificationMsg } from "../../Services/BaseService";
import { errorMsg, successMsg } from "../../Services/MessageDisplayHandler";
import { TOKEN_LS_NAME } from "../../Constants/Constants";

export function LoginHook() {
  // eslint-disable-next-line
  const [contextState, dispatch] = useContext(AppContext);
  const history = useHistory();

  return useMutation((val: any) => authService.login(val), {
    onMutate: () => {
      dispatch({
        type: ActionTypes.SET_LOADER,
        payload: true,
      });
    },
    onError: (err: any) => {
      errorMsg(notificationMsg(err, null));
    },
    onSettled: (response: any) => {
      localStorage.setItem(TOKEN_LS_NAME, JSON.stringify(response.data.token));
      dispatch({
        type: ActionTypes.SET_LOADER,
        payload: false,
      });
      dispatch({
        type: ActionTypes.SET_USER,
        payload: response.data,
      });
      successMsg(notificationMsg(response, "lOGIN_SUCCESS"));
      if (response.data.user.role === "teacher") {
        history.push("/teacher-home");
      } else {
        history.push("/student-home");
      }
    },
  });
}
