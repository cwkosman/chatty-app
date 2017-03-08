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
    this.postNewMessage = this.postNewMessage.bind(this);
 }

 changeUsername (event) {
   if(event.keyCode === 13) {
     this.setState({currentUser: {name: event.target.value }});
   }
 }

 postNewMessage(message) {
     this.setState({messages: this.state.messages.concat(message)});
 }

 sendNewMessage(event) {
   if(event.keyCode === 13) {
      const newMessage = {username: this.state.currentUser.name, content: event.target.value};
      //Use concat instead of push because state needs to be treated as immutable
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
        <Chatbar User={this.state.currentUser.name} NameFunction={this.changeUsername.bind(this)} SendFunction={this.sendNewMessage.bind(this)}/>
      </div>
    );
  }

  componentDidMount() {
    this.connection = new WebSocket('ws://localhost:3001');
    this.connection.onmessage = (event) => {
      this.postNewMessage(JSON.parse(event.data));
    }
  }
}

export default App;
