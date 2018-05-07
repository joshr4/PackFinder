import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Header } from 'semantic-ui-react';
import { ProfileItem } from '.';
import { getPets, deletePet, updatePet, addPet } from '../store';

/**
 * COMPONENT
 */
class Profile extends React.Component {
  componentDidMount() {
    this.props.getData();
  }
  render() {
    return (
      <div>
        <Container className="container">
          <Grid columns={2} divided>
            <Header as="h3">Owner:</Header>
            <ProfileItem info={this.props.user} />
            <Header as="h3">Dogs:</Header>
            {this.props.pets ? this.props.pets.map((pet, i) => {
              console.log('pet info', pet)
              return (<ProfileItem key={i} info={pet} />)
            })
            :
            <h3>No Pets</h3>
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
    pets: [{name:'fido', bio: 'asdasdf'},{name:'fidosbro', bio: 'qouiqeuqerasdasdf'}]
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
