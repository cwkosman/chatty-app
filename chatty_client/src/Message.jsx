import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div className={`message ${this.props.Type === 'incomingNotification' ? ' system' : '' }`}>
      {this.props.Username &&
        <span className="message-username" style={{color: this.props.Color }}>{this.props.Username}</span>
      }
        <span className="message-content">{this.props.Content}{this.props.Img && <img src={this.props.Img} className="message-img" />}</span>
        </div>
    );
  }
}
export default Message;
