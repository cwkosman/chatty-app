import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.MessagesList.map((message) => {
          return (
              <Message Type={message.type} key={message.id} Username={message.username} Color={message.color} Content={message.content} Img={message.img}/>
            );
        })}
      </main>

    );
  }
}
export default MessageList;
