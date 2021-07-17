import * as userActionsLabels from "../actions/SignIn/user.actions.enum";
import merge from "../../helpers/merge";
import { loadAuthUser } from "../localStorage";

export const userInitialState = Object.seal({
  authUser: loadAuthUser(),
  error: null,
  userCreated: false,
  employees: [],
});

export const userReducer = (state = userInitialState, action) => {
  let newState = state;
  switch (action.type) {
    case userActionsLabels.AUTH_USER: {
      const newStateObject = Object.assign({}, { error: null });
      newState = merge(state, newStateObject);
      break;
    }
    case userActionsLabels.AUTH_USER_SUCCESS: {
      const newStateObject = Object.assign(
        {},
        { authUser: action.payload, error: null }
      );
      newState = merge(state, newStateObject);
      break;
    }
    case userActionsLabels.AUTH_USER_FAILURE: {
      const newStateObject = Object.assign(
        {},
        {
          error: action.payload
            ? action.payload.errors.message
            : "Error de servidor",
        }
      );
      newState = merge(state, newStateObject);
      break;
    }
    case userActionsLabels.CREATE_USER: {
      const newStateObject = Object.assign({}, { error: null });
      newState = merge(state, newStateObject);
      break;
    }
    case userActionsLabels.CREATE_USER_SUCCESS: {
      const newStateObject = Object.assign(
        {},
        { userCreated: true, error: null, authUser: action.payload }
      );
      newState = merge(state, newStateObject);
      break;
    }
    case userActionsLabels.CREATE_USER_FAILURE: {
      const newStateObject = Object.assign(
        {},
        {
          error: action.payload
            ? action.payload.errors.message
            : "Error de servidor",
          userCreated: false,
        }
      );
      newState = merge(state, newStateObject);
      break;
    }
    case userActionsLabels.RESET_PROPERTIES: {
      const newStateObject = Object.assign(
        {},
        { error: null, userCreated: false }
      );
      newState = merge(state, newStateObject);
      break;
    }
    case userActionsLabels.GET_EMPLOYESS: {
      const newStateObject = Object.assign({}, { error: null });
      newState = merge(state, newStateObject);
      break;
    }
    case userActionsLabels.GET_EMPLOYESS_SUCCESS: {
      const newStateObject = Object.assign(
        {},
        { error: null, employees: action.payload }
      );
      newState = merge(state, newStateObject);
      break;
    }
    case userActionsLabels.GET_EMPLOYESS_FAILURE: {
      const newStateObject = Object.assign(
        {},
        {
          error: action.payload
            ? action.payload.errors.message
            : "Error de servidor",
          employees: [],
        }
      );
      newState = merge(state, newStateObject);
      break;
    }
    default:
      break;
  }
  return newState;
};
