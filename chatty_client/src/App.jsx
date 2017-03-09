import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Chuck'},
      messages: [],
      clients: 0
  };
    this.postNewMessage = this.postNewMessage.bind(this);
    this.updateClientCount = this.updateClientCount.bind(this);
 }

 changeUsername (event) {
   if(event.keyCode === 13) {
     const oldName = this.state.currentUser.name;
     const newName = event.target.value;
     this.setState({currentUser: {name: newName }});
     this.connection.send(JSON.stringify({"type": "postNotification", "content": `${oldName} has changed their name to ${newName}.`}));
   }
 }

 postNewMessage(message) {
     this.setState({messages: this.state.messages.concat(message)});
 }

 sendNewMessage(event) {
   if(event.keyCode === 13) {
      const newMessage = {type: "postMessage", username: this.state.currentUser.name, content: event.target.value};
      //Use concat instead of push because state needs to be treated as immutable
      this.connection.send(JSON.stringify(newMessage));
   }
 }

 updateClientCount(message) {
   this.setState({clients: message.clients});
 }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-count">{this.state.clients} users online</span>
        </nav>
        <MessageList MessagesList={this.state.messages} />
        <Chatbar User={this.state.currentUser.name} NameFunction={this.changeUsername.bind(this)} SendFunction={this.sendNewMessage.bind(this)}/>
      </div>
    );
  }

  componentDidMount() {
    this.connection = new WebSocket('ws://localhost:3001');
    this.connection.onmessage = (event) => {
      let messageObject = JSON.parse(event.data);
      switch (messageObject.type) {
        case 'incomingMessage':
        case 'incomingNotification':
          this.postNewMessage(messageObject);
          break;
        case 'clientCount':
          this.updateClientCount(messageObject);
          break;
        default:
          'No type specified.'
      }
    }
  }
}

export default App;
