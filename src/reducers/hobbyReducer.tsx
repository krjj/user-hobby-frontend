// Import Reducer type
import { Reducer } from "redux";
import {
  hobbyActions,
  hobbyActionTypes
} from "../actions/hobbyActions";


// Define the User type
export interface IUser {
  name: string;
  id: string;
}


// Define the Hobby type
export interface IHobby {
  name: string,
  id: string,
  year: number,
  passion: string
}


// Define the State
export interface IHobbyState {
  users: IUser[];
  hobbies: IHobby[];
  selectedUserId : string;
}


// Define the initial state
const initialUserState: IHobbyState = {
  users: [],
  hobbies: [],
  selectedUserId : ''
};

export const hobbyReducer: Reducer<IHobbyState, hobbyActions> = (
  state = initialUserState,
  action
) => {
  switch (action.type) {
    case hobbyActionTypes.GET_ALL_USERS: {
      return {
        ...state,
        users: action.users
      };
    }
    case hobbyActionTypes.GET_ALL_HOBBIES: {
      return {
        ...state,
        hobbies: action.hobbies,
        selectedUserId : action.userid
      };
    }
    case hobbyActionTypes.ADD_USER: {
      return {
        ...state,
        users : [...state.users, action.user]
      };
    }
    case hobbyActionTypes.ADD_HOBBY: {
      return {
        ...state
      };
    }
    case hobbyActionTypes.DELETE_HOBBY: {
      return {
        ...state,
        hobbies: state.hobbies.filter((v) => v.id != action.hobbyId)
      };
    }
    default:
      return state;
  }
};
