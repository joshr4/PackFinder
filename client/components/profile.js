import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Header } from 'semantic-ui-react';
import { ProfileItem, UserProfileItem } from '.';
import { getPets, deletePet, updatePet, addPet } from '../store';

/**
 * COMPONENT
 */

class Profile extends React.Component {
  componentDidMount() {
    this.props.getData();
  }
  render() {
    console.log('profile props',this.props)
    return (
      <div>
        <Container className="container">
          <Grid columns={2} divided>
            <Header as="h3">Owner:</Header>
            <UserProfileItem info={this.props.user} />
            <Header as="h3">Dogs:</Header>
            {this.props.userPets ? this.props.userPets.map((pet, i) => {
              return (<ProfileItem key={i} info={pet} />)
            })
            :
            <h3>Add a dog to your profile!</h3>
            }
          </Grid>
        </Container>
      </div>
  );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    userPets: state.pets.filter(pet => pet.userId===state.user.id)
  };
};

const mapDispatch = dispatch => {
  return {
    getData() {
      dispatch(getPets());
    },
    removePet(pet) {
      dispatch(deletePet(pet));
    },
    updatePet(pet) {
      dispatch(updatePet(pet));
    },
    addNewPet(pet) {
      dispatch(addPet(pet));
    },
  };
};

export default connect(mapState, mapDispatch)(Profile);
// export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 //  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
