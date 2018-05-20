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
  let styles =
    user.id === message.posterId
      ? { direction: { flexDirection: 'row-reverse' }, color: 'teal' }
      : { direction: { flexDirection: 'row' }, color: 'brown' };
  const { direction, color } = styles;
  console.log(message.timeElapsed);
  return (
    <Feed.Event key={message.id} style={direction}>
      <Feed.Label image={message.poster.imageUrl} />
      <Message color={color} style={{padding: '0.75em'}}>
        <Feed.Content>
          <Feed.Summary>
            {/* {message.poster.fullName} */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}
            >
              <Message.Header as="h4">
                {`${message.poster.fullName}`}{' '}
              </Message.Header>
              <h5 style={{ margin: 0, marginLeft: '0.25em', fontSize: '0.9em', color: 'black' }}> {`${message.timeElapsed}`}</h5>
            </div>
          </Feed.Summary>
          <Feed.Extra text style={{ color: '#000' }}>
            {message.content}
          </Feed.Extra>
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
