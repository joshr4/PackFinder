import React, { Component } from 'react';
import {
  Button,
  Image,
  Modal,
  Form,
  Icon,
  Input,
  TextArea,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { EditImageModal } from '../index.js';
import { updateUserStore, submiteUserUpdate } from '../../store';

class EditUserModal extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: this.props.user
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.user !== this.props.user){
      this.setState({user: nextProps.user})
    }
  }

  onChangeHandler(evt){
    let tempUser = Object.assign({}, this.state.user)
    console.log(evt.target.name)

    if (evt.target.name === 'firstName'){
      tempUser.firstName = evt.target.value
    }

    else if (evt.target.name === 'lastName'){
      tempUser.lastName = evt.target.value
    }

    else if (evt.target.name === 'email'){
      tempUser.email = evt.target.value
    }

    else if (evt.target.name === 'description'){
      tempUser.description = evt.target.value
    }
    this.setState({user: tempUser})

  }

  render(){

    console.log('state: ', this.state)
    console.log('props: ', this.props)

    const {
      updateFormFields,
      saveUserChanges,
      toggleModal,
      toggleNestedModal,
      user,
      showModal,
      showNestedModal,
    } = this.props;

    return (
      <Modal open={showModal} onClose={this.props.toggleModal}>
        <Modal.Header>Edit your profile</Modal.Header>
        <Modal.Content image>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Image wrapped size="small" src={user.imageUrl} />
            <EditImageModal
              toggleNestedModal={toggleNestedModal}
              showNestedModal={showNestedModal}
            />

            <Button onClick={toggleNestedModal} style={{ width: '128px' }}>
              Edit photo{' '}
            </Button>
          </div>
          <Modal.Description>
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  fluid
                  control={Input}
                  label="First name"
                  name="firstName"
                  placeholder="First name"
                  onChange={this.onChangeHandler.bind(this)}
                  defaultValue={this.state.user.firstName}
                />
                <Form.Field
                  fluid
                  control={Input}
                  label="Last name"
                  name="lastName"
                  placeholder="Last name"
                  onChange={this.onChangeHandler.bind(this)}
                  value={this.state.user.lastName}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  fluid
                  control={Input}
                  label="Email"
                  name="email"
                  placeholder="email@domain.com"
                  onChange={this.onChangeHandler.bind(this)}
                  value={this.state.user.email}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={TextArea}
                  label="About"
                  name="description"
                  placeholder="Tell us more about yourself..."
                  onChange={this.onChangeHandler.bind(this)}
                  value={this.state.user.description}
                />
              </Form.Group>
              {/* <Form.Group widths="equal">
                <Form.Field
                  fluid
                  control={Input}
                  label="line_1"
                  name="line_1"
                  placeholder="Address"
                  onChange={e =>
                    updateFormFields(e.target.value, { address: e.target.name })
                  }
                  value={user.address && user.address.line_1}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  fluid
                  control={Input}
                  label="City"
                  name="city"
                  placeholder="City"
                  onChange={e =>
                    updateFormFields(e.target.value, { address: e.target.name })
                  }
                  value={user.address && user.address.city}
                />
                <Form.Field
                  fluid
                  control={Input}
                  label="state"
                  name="state"
                  placeholder="State"
                  onChange={e =>
                    updateFormFields(e.target.value, { address: e.target.name })
                  }
                  value={user.address && user.address.state}
                />
                <Form.Field
                  fluid
                  control={Input}
                  label="zip"
                  name="zipcode"
                  placeholder="Zip"
                  onChange={e =>
                    updateFormFields(e.target.value, { address: e.target.name })
                  }
                  value={user.address && user.address.zipcode}
                />
              </Form.Group> */}
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={toggleModal} color="red" inverted>
            <Icon name="remove" />Cancel
          </Button>
          <Button
            onClick={() => toggleModal(saveUserChanges(this.state.user))}
            color="green"
            inverted
          >
            <Icon name="checkmark" />Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.user
  }
};

const mapDispatch = dispatch => {
  return {
    updateFormFields(value, type) {
      dispatch(updateUserStore(value, type));
    },
    saveUserChanges(userUpdate) {
      dispatch(submiteUserUpdate(userUpdate));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(EditUserModal);
