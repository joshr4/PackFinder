import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Feed, Message } from 'semantic-ui-react';

/**
 * COMPONENT
 */

const ChatMessage = props => {
  const { message, user } = props;
  console.log('message', message);
  console.log('user', user.id);
  let direction =
    user.id === message.posterId
      ? { flexDirection: 'row-reverse' }
      : { flexDirection: 'row' };
  console.log('direction', direction);
  return (
    <Feed.Event key={message.id} style={direction}>
      <Feed.Label image={message.poster.imageUrl} />
      <Message color="red">
        <Feed.Content>
          <Feed.Summary>
            <a>{message.poster.fullName}</a>
            <Feed.Date>{message.timeString}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>{message.content}</Feed.Extra>
          <Feed.Meta>
            <Feed.Like />
          </Feed.Meta>
        </Feed.Content>
      </Message>
    </Feed.Event>
  );
};

/**
 * CONTAINER
 */
const mapState = ({ user }) => ({ user });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(ChatMessage);

/**
 * PROP TYPES
 */
// ChatMessage.propTypes = {
//   email: PropTypes.string,
// };
