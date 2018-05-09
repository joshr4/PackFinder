import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Header } from 'semantic-ui-react';
import { ProfileItem, UserProfileItem, EditPetModal } from '.';
import { getPets, deletePet, updatePet, addPet } from '../store';

/**
 * COMPONENT
 */

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPetModal: false,
      selectedPet: {
        bio: 'bio',
        breed: 'breed',
        imageUrls: [],
        name: '',
        weight: null,
        age: null,
        id: null,
        userId: null,
      },
    }
    this.togglePetModal = this.togglePetModal.bind(this);
    this.addPet = this.addPet.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openPetModal = this.openPetModal.bind(this);
  }
  componentDidMount() {
    this.props.getData();
  }
  openPetModal = (pet) => {
    this.setState({
      selectedPet: pet,
    });
    this.togglePetModal()
  }
  togglePetModal = () => {
    this.setState({
      showPetModal: !this.state.showPetModal,
    });
  }
  addPet = () => {
    this.props.addNewPet(this.state.selectedPet)
    this.toggleModal()
  }
  handleChange = e => {
    this.setState({
      selectedPet: Object.assign(this.state.selectedPet, {[e.target.name]: e.target.value})
    })
  }
  render() {
    return (
      <div>
        <EditPetModal
          show={this.state.showPetModal}
          onClose={this.togglePetModal}
          item={this.state.selectedPet}
          handleSubmit={this.addPet}
          handleChange={this.handleChange}
        />
        <Container className="container">
          <Grid columns={2} divided>
            <Header as="h3">Owner:</Header>
            <UserProfileItem info={this.props.user} />
            <Header as="h3">Dogs:</Header>
            {this.props.userPets ? this.props.userPets.map((pet, i) => {
              return (<ProfileItem key={i} info={pet} openPetModal={this.openPetModal} />)
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
