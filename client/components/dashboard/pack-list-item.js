import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Card,
  Feed,
  Button,
  Image,
  Label,
  Menu,
  Tab,
  Header,
  Segment,
  Divider,
  Item,
} from 'semantic-ui-react';

/**
 * COMPONENT
 */

export const PackListItem = props => {
  const { imageUrl, address, fullName, pets, id } = props.item;
  console.log('props in list', props);
  console.log('inside pack list item');

  return (
    <div>
      <Grid.Row columns={2}>
        <Grid.Column width={4}>
          <img style={{ width: '60px', borderRadius: '6em' }} src={imageUrl} />
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid>
            <Grid.Row style={{ padding: '0' }}>
              <Header as="a">{fullName}</Header>
              <Image
                style={{ height: '80px', width: '80px' }}
                rounded
                src={pets[0].imageUrls[0]}
              />
            </Grid.Row>
            <Grid.Row style={{ padding: '0' }}>
              <Label
                icon="globe"
                content={`${address.location.distance} mi away`}
              />
              <Button size="tiny" name="add">
                send request
              </Button>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
  };
};

const mapDispatch = dispatch => {
  return {
    getSuggestedFriends(location) {
      dispatch(getNearByUsersInfo(location));
    },
    getUserLocation() {
      dispatch(getGeolocation());
    },
  };
};

export default connect(mapState, mapDispatch)(PackListItem);

/**
 * PROP TYPES
 */
PackListItem.propTypes = {
  email: PropTypes.string,
};

{
  /* <Item unstackable>
       <Item.Image>
         <img style={{ width: '60px', borderRadius: '6em' }} src={imageUrl} />
       </Item.Image>

       <Item.Content>
         <Item.Header as="a">{fullName}</Item.Header>
         <Item.Meta><span className="cinema">test</span></Item.Meta>
         <Item.Description>
           <Image size="tiny" rounded src={pets[0].imageUrls[0]} />
         </Item.Description>
         <Item.Extra>
           <Label
             icon="globe"
             content={`${address.location.distance} mi away`}
           />
           <Button size="tiny" name="add">
             send request
           </Button>
         </Item.Extra>
       </Item.Content>
     </Item>

     <Segment.Group>
       <Segment vertical>
         <Image style={{ width: '4em' }} src={imageUrl} />

         <Button size="tiny" name="add" floated="right">
           send request
         </Button>
       </Segment>
       <Segment>
         <Image size="tiny" rounded src={pets[0].imageUrls[0]} />
       </Segment>
     </Segment.Group>

     <Feed.Event>
       <Feed.Label style={{ width: '4em' }} image={imageUrl} />
       <Feed.Content>
         <Feed.Date content={`${address.location.distance} mi away`} />
         <Feed.Summary>{`${firstName}'s pups:`}</Feed.Summary>
         {pets && (
           <Feed.Extra images>
             <Image size="tiny" rounded src={pets[0].imageUrls[0]} />
           </Feed.Extra>
         )}
         <Feed.Extra>

         </Feed.Extra>
       </Feed.Content>
     </Feed.Event>
     <Divider /> */
}
