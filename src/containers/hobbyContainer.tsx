import * as React from "react";
import { connect, useStore } from "react-redux";
import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { Action } from 'redux';
import { IAppState } from "../store/store";

import { IUser, IHobby } from "../reducers/hobbyReducer";

import { getAllUsers, getAllHobbies, deleteHobby, addUser, addHobby } from "../actions/hobbyActions";

// Create the containers interface
interface IProps {
  users: IUser[];
  hobbies: IHobby[];
  selectedUserId: string,
  getAllUsers: typeof getAllUsers;
  getAllHobbies: typeof getAllHobbies;
  deleteHobby: typeof deleteHobby;
  addUser: typeof addUser;
  addHobby: typeof addHobby;
}

class Hobby extends React.Component<IProps> {

  state = {
    userName: '',
    hobbyName: '',
    hobbyYear: '',
    hobbyPassion: 'low'
  }


  onUsernameType(text: string) {
    this.setState({ userName: text })
  }

  onHobbyNameType(text: string) {
    this.setState({ hobbyName: text })
  }

  onHobbyYearType(text: string) {
    this.setState({ hobbyYear: text })
  }

  onHobbyPassionType(text: string) {
    this.setState({ hobbyPassion: text })
  }


  public render() {
    const { users, hobbies, selectedUserId } = this.props
    return (
      <>
        <header>
          User Hobbies <sup>in react-redux-thunk-typescript</sup>
        </header>
        <div className="split-view">
          <div className="resize-x p-25 box-a panel">
            <div className="panelHead">
              <input placeholder="Enter User Name" value={this.state.userName} onChange={(t) => { this.onUsernameType(t.target.value) }}></input>
              <button onClick={() => { this.props.addUser(this.state.userName) }}>Add</button>
            </div>
            <div className="userlist">
              {users &&
                users.map(user => {
                  return (
                    <button key={user.id} className="userItem" onClick={() => { this.props.getAllHobbies(user.id) }}>
                      {user.name}
                    </button>
                  )
                })}
            </div>
          </div>
          <div style={{ backgroundColor: this.props.selectedUserId ? '#FEE5D0' : 'grey' }} className="box-b panel">
            {this.props.selectedUserId!='' && (<div className="panelHead">
              <select id="passion" value={this.state.hobbyPassion} onChange={(e) => { this.onHobbyPassionType(e.target.value) }}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
                <option value="very high">very high</option>
              </select>
              <input placeholder="Enter User Hobby" value={this.state.hobbyName} onChange={(t) => { this.onHobbyNameType(t.target.value) }}></input>
              <input placeholder="Enter year" type="number" value={this.state.hobbyYear} onChange={(t) => { this.onHobbyYearType(t.target.value) }}></input>
              <button onClick={() => { this.props.addHobby(this.state.hobbyName, this.state.hobbyYear, this.state.hobbyPassion, selectedUserId) }}>Add</button>
            </div>)}

            {hobbies &&
              hobbies.map(hobby => {
                return (
                  <div className="hobbyItem" key={hobby.id}>
                    <div> Passion : {hobby.passion}</div>
                    <div> {hobby.name} </div>
                    <div> {hobby.year} </div>
                    <button onClick={() => { if (window.confirm('Are you sure ?')) this.props.deleteHobby(hobby.id) }}>Delete</button>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

// Grab the characters from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
  return {
    users: store.hobbyState.users,
    hobbies: store.hobbyState.hobbies,
    selectedUserId: store.hobbyState.selectedUserId
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => {
  return {
    getAllUsers: () => dispatch<any>(getAllUsers()),
    getAllHobbies: (userId: string) => dispatch<any>(getAllHobbies(userId)),
    deleteHobby: (hobbyId: string) => dispatch<any>(deleteHobby(hobbyId)),
    addUser: (name: string) => dispatch<any>(addUser(name)),
    addHobby: (name: string, year: string, passion: string, userId: string) => dispatch<any>(addHobby(name, year, passion, userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hobby);
