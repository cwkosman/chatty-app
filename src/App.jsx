import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Chuck'},
      messages: [
       {
         id: '1',
         username: 'Bob',
         content: 'Has anyone seen my marbles?'
       },
       {
         id: '2',
         username: 'Anonymous',
         content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
       }
     ]
  };
 }

 changeUsername (event) {
   if(event.keyCode === 13) {
     this.setState({currentUser: {name: event.target.value }});
   }
 }

 postNewMessage(event) {
   if(event.keyCode === 13) {
      const newMessage = {id: this.state.messages.length + 1, username: this.state.currentUser.name, content: event.target.value};
      //Use concat instead of push because state comes in as a string, almost like it gets JSON.strinigfied beforehand
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
   }
 }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList MessagesList={this.state.messages} />
        <Chatbar User={this.state.currentUser.name} NameFunction={this.changeUsername.bind(this)} PostFunction={this.postNewMessage.bind(this)}/>
      </div>
    );
  }
}
export default App;
