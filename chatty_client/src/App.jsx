import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Chuck'},
      messages: []
  };
 }

 changeUsername (event) {
   if(event.keyCode === 13) {
     this.setState({currentUser: {name: event.target.value }});
   }
 }

 postNewMessage(event) {
   if(event.keyCode === 13) {
      const newMessage = {username: this.state.currentUser.name, content: event.target.value};
      //Use concat instead of push because state needs to be treated as immutable
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
      this.connection.send(JSON.stringify(newMessage));
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

  componentDidMount() {
    this.connection = new WebSocket('ws://localhost:3001');
  }
}

export default App;
