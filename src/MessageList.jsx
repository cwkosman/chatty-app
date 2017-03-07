import React, {Component} from 'react';
import Message from './Message.jsx';

class
MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.MessagesList.map((message) => {
          return (
            <Message Username={message.username} Content={message.content}/>
          );
        })}
      </main>

    );
  }
}
export default MessageList;
