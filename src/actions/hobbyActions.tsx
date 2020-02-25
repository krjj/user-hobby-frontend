// Import redux types
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction} from "redux-thunk";
import axios from "axios";

// Import Hobby Typing
import { IUser, IHobby, IHobbyState } from "../reducers/hobbyReducer";

import {BASE_API_URL} from "../constants"

// Create Action Constants
export enum hobbyActionTypes {
  GET_ALL_USERS = "GET_ALL_USERS",
  GET_ALL_HOBBIES = "GET_ALL_HOBBIES",
  ADD_USER = "ADD_USER",
  ADD_HOBBY = "ADD_HOBBY",
  DELETE_HOBBY = "DELETE_HOBBY"
}

// Interface for Get All Users Action Type
export interface IGetAllUsersAction {
  type: hobbyActionTypes.GET_ALL_USERS;
  users: IUser[];
}

// Interface for Get All Hobbies Action Type
export interface IGetAllHobbiesAction {
  type: hobbyActionTypes.GET_ALL_HOBBIES;
  hobbies: IHobby[];
  userid : string
}

// Interface for Add User Action Type
export interface IAddUserAction {
  type: hobbyActionTypes.ADD_USER;
  user: IUser;
}

// Interface for Add Hobby Action Type
export interface IAddHobbyAction {
  type: hobbyActionTypes.ADD_HOBBY;
  hobby: IHobby;
}

// Interface for Delete Hobby Action Type
export interface IDeleteHobbyAction {
  type: hobbyActionTypes.DELETE_HOBBY;
  hobbyId: string;
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type hobbyActions = IGetAllUsersAction | IGetAllHobbiesAction | IAddUserAction | IAddHobbyAction | IDeleteHobbyAction;

/* Get All Users Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllUsers: ActionCreator<
  ThunkAction<Promise<any>, IHobbyState, null, IGetAllUsersAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/users`);
      let users: IUser[] = []
      for (let d of response.data.data.users) {
        users.push({ id: d['_id'], name: d['name'] })
      }
      dispatch({
        users: users,
        type: hobbyActionTypes.GET_ALL_USERS
      });
    } catch (err) {
      alert('Cannot get users') // Disclaimer = ideal way to display error is by storing the error message in store and rendering it by component, for the sake of brevity alert is used directly 
      console.error(err);
    }
  };
};

/* Get All Hobbies Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllHobbies: ActionCreator<
  ThunkAction<Promise<any>, IHobbyState, null, IGetAllHobbiesAction>
> = (userId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/hobbies/` + userId);
      let hobbies: IHobby[] = []
      for (let d of response.data.data) {
        hobbies.push({ id: d['_id'], name: d['name'], passion: d['passion'], year: d['year'] })
      }
      dispatch({
        hobbies: hobbies,
        userid : userId,
        type: hobbyActionTypes.GET_ALL_HOBBIES
      });
    } catch (err) {
      console.error(err);
    }
  };
};


/* Add User Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const addUser: ActionCreator<
  ThunkAction<Promise<any>, IHobbyState, null, IAddUserAction>
> = (name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/user`, {
        "name": name
      });
      dispatch({
        user: { id: response.data.data.id, name: response.data.data.name },
        type: hobbyActionTypes.ADD_USER
      });
    } catch (err) {
      alert('Cannot add user, username should be at least 3 chars') // Disclaimer = ideal way to display error is by storing the error message in store and rendering it by component, for the sake of brevity alert is used directly 
      console.error(err);
    }
  };
};

/* Add Hobby Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const addHobby: ActionCreator<
  ThunkAction<Promise<any>, IHobbyState, null, IAddHobbyAction>
> = (name: string, year: string, passion: string, userid : string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/hobby/` + userid, {
        "name": name,
        "year": year,
        "passion": passion
      });
      dispatch<any>(getAllHobbies(userid));
    } catch (err) {
      alert('Cannot add hobby') // Disclaimer = ideal way to display error is by storing the error message in store and rendering it by component, for the sake of brevity alert is used directly 
      console.error(err);
    }
  };
};

/* Delete Hobby Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const deleteHobby: ActionCreator<
  ThunkAction<Promise<any>, IHobbyState, null, IDeleteHobbyAction>
> = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.delete(`${BASE_API_URL}/hobby/` + id);
      dispatch({
        hobbyId: id,
        type: hobbyActionTypes.DELETE_HOBBY
      });
    } catch (err) {
      alert('Cannot delete hobby') // Disclaimer = ideal way to display error is by storing the error message in store and rendering it by component, for the sake of brevity alert is used directly 
      console.error(err);
    }
  };
};