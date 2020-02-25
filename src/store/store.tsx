/*  Imports from Redux:
 applyMiddleware: Applies middleware to the dispatch method of the Redux store
 combineReducers: Merges reducers into one
 createStore: Creates a Redux store that holds the state tree
 Store: The TS Type used for the store, or state tree
 */
import { applyMiddleware, combineReducers, createStore, Store, compose } from "redux";
/*  Thunk
Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
*/
import thunk, { ThunkDispatch } from "redux-thunk";
// Import reducers and state type
import {
  hobbyReducer,
  IHobbyState
} from "../reducers/hobbyReducer";

// Create an interface for the application state
export interface IAppState {
  hobbyState: IHobbyState;
}

// Create the root reducer
const rootReducer = combineReducers<IAppState>({
  hobbyState: hobbyReducer
});



// Create a configure store function of type `IAppState`
/* export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  ));
  return store;
} */

export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer,
    applyMiddleware(thunk));
  return store;
}