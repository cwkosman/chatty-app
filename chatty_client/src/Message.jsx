import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div className={`message ${this.props.Type === 'incomingNotification' ? ' system' : '' }`}>
      {this.props.Username &&
        <span className="message-username">{this.props.Username}</span>
      }
        <span className="message-content">{this.props.Content}</span>
      </div>
    );
  }
}
export default Message;
