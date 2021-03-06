import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Segment,
  Grid,
  Header,
  Button,
  Card,
} from 'semantic-ui-react';
import { PetProfileItem, UserProfileItem, PetModal } from '../index.js';
import {
  getPets,
  deletePet,
  updatePet,
  addPet,
  getSelectedUser,
} from '../../store';

/**
 * COMPONENT
 */

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPetModal: false,
      isPetModalDirty: false,
      selectedPet: {
        bio: '',
        breed: '',
        imageUrls: [],
        name: '',
        weight: undefined,
        age: undefined,
        id: undefined,
        userId: undefined,
      },
      user: {},
      isUpdatePet: false,
      readOnly: false,
      friendId: null,
      showNestedModal: false,
    };
    this.togglePetModal = this.togglePetModal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openPetModal = this.openPetModal.bind(this);
    this.toggleNestedModal = this.toggleNestedModal.bind(this);
  }
  componentDidMount() {
    if (this.props.match.params.userId !== undefined) {
      this.setState(
        { friendId: +this.props.match.params.userId, readOnly: true },
        () => {
          this.props.getSelectedUserInfo(this.state.friendId);
        }
      );
    }

    this.props.getData();
  }

  openPetModal = (pet, edit = true) => {
    let selPet = {};
    if (edit) selPet = Object.assign({}, pet);
    else {
      selPet = {
        bio: '',
        breed: '',
        imageUrls: ['https://usercontent2.hubstatic.com/7780333.jpg'],
        name: '',
        weight: undefined,
        age: undefined,
        id: undefined,
        userId: undefined,
      };
    }
    this.setState({
      selectedPet: selPet,
      isUpdatePet: edit,
    });
    this.togglePetModal();
  };
  togglePetModal = () => {
    this.setState({
      showPetModal: !this.state.showPetModal,
    });
  };
  handleAdd = () => {
    this.props.addNewPet(this.state.selectedPet);
    this.togglePetModal();
  };
  handleUpdate = () => {
    this.props.updatePet(this.state.selectedPet);
    this.togglePetModal();
  };
  handleDeletePet = () => {
    this.props.deletePet(this.state.selectedPet);
    this.togglePetModal();
  };

  handleChange = e => {
    if (e.target.name === 'imageUrls') {
      let tempArr = [...this.state.selectedPet.imageUrls];
      tempArr[0] = e.target.value;
      this.setState({
        selectedPet: Object.assign(this.state.selectedPet, {
          imageUrls: tempArr,
        }),
      });
    } else {
      this.setState({
        selectedPet: Object.assign(this.state.selectedPet, {
          [e.target.name]: e.target.value,
        }),
        isPetModalDirty: true,
      });
    }
  };
  toggleNestedModal = () => {
    this.setState({ showNestedModal: !this.state.showNestedModal });
  };
  render() {
    const { userPets, user, selectedUser } = this.props;
    const { isPetModalDirty } = this.state;
    let petsList = [];

    if (this.state.readOnly) {
      petsList = selectedUser.pets;
    } else {
      petsList = userPets;
    }

    const styles = {
      dashboardList: {
        boxShadow:
          '  rgba(0, 0, 0, 0.2) 2px 3px 11px, rgba(0, 0, 0, 0.2) 1px 2px 9px',
        width: '100%',
      },
    };

    return (
      <div className="container">
        <Grid columns={1} centered>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <Card style={styles.dashboardList} className="mobile">
              <PetModal
                show={this.state.showPetModal}
                onClose={this.togglePetModal}
                item={this.state.selectedPet}
                handleAdd={this.handleAdd}
                handleChange={this.handleChange}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDeletePet}
                isUpdatePet={this.state.isUpdatePet}
                showNestedModal={this.state.showNestedModal}
                toggleNestedModal={this.toggleNestedModal}
                isPetModalDirty={isPetModalDirty}
              />
              <Card.Content style={{ padding: '0' }} className="dashboard-card">
                <UserProfileItem
                  readOnly={this.state.readOnly}
                  selectedUser={selectedUser}
                />

                {this.state.readOnly ? null : (
                  <Button
                    color="teal"
                    onClick={() => this.openPetModal(null, false)}
                  >
                    Add a dog
                  </Button>
                )}

                {petsList ? (
                  petsList.map((pet, i) => {
                    return (
                      <PetProfileItem
                        key={i}
                        info={pet}
                        openPetModal={this.openPetModal}
                        readOnly={this.state.readOnly}
                      />
                    );
                  })
                ) : (
                  <h3>I can't find any dogs here!</h3>
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>

        {/*
        <Segment>
          <PetModal
            show={this.state.showPetModal}
            onClose={this.togglePetModal}
            item={this.state.selectedPet}
            handleAdd={this.handleAdd}
            handleChange={this.handleChange}
            handleUpdate={this.handleUpdate}
            handleDelete={this.handleDeletePet}
            isUpdatePet={this.state.isUpdatePet}
            showNestedModal={this.state.showNestedModal}
            toggleNestedModal={this.toggleNestedModal}
            isPetModalDirty={isPetModalDirty}
          />
          <Grid columns={2} divided>
            <UserProfileItem readOnly={this.state.readOnly} selectedUser={selectedUser} />
            <Grid.Row>
              <Grid.Column width="4">
                <Header as="h3">Dogs:</Header>
              </Grid.Column>
              <Grid.Column width="12">
                {this.state.readOnly ? null
                  : <Button
                  color="teal"
                  onClick={() => this.openPetModal(null, false)}
                >
                  Add a dog
                </Button>}
              </Grid.Column>
            </Grid.Row>


            {petsList ? (
              petsList.map((pet, i) => {
                return (
                  <PetProfileItem
                    key={i}
                    info={pet}
                    openPetModal={this.openPetModal}
                    readOnly={this.state.readOnly}
                  />
                );
              })
            ) : (
              <h3>I can't find any dogs here!</h3>
            )}
          </Grid>
        </Segment> */}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = ({ user, pets, selectedUser }) => {
  return {
    user,
    userPets: pets.filter(pet => pet.userId === user.id),
    selectedUser,
  };
};

const mapDispatch = dispatch => {
  return {
    getData() {
      dispatch(getPets());
    },
    deletePet(pet) {
      dispatch(deletePet(pet));
    },
    updatePet(pet) {
      dispatch(updatePet(pet));
    },
    addNewPet(pet) {
      dispatch(addPet(pet));
    },
    getSelectedUserInfo(userId) {
      dispatch(getSelectedUser(userId));
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
