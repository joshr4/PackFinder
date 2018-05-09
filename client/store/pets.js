import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PETS = 'GET_PETS';
const DELETE_PET = 'DELETE_PET';
const UPDATE_PET = 'UPDATE_PET';
const ADD_PET = 'ADD_PET';

/**
 * INITIAL STATE
 */
const defaultPets = [];

/**
 * ACTION CREATORS
 */
const getAllPets = pets => ({ type: GET_PETS, pets });
const delPet = pet => ({ type: DELETE_PET, pet });
const updPet = pet => ({ type: UPDATE_PET, pet });
const addNewPet = pet => ({ type: ADD_PET, pet });

/**
 * THUNK CREATORS
 */
export const getPets = () => dispatch =>
  axios
    .get('/api/pets')
    .then(res => dispatch(getAllPets(res.data || defaultPets)))
    .catch(err => console.log(err));

export const deletePet = pet => dispatch =>
  axios
    .delete(`/api/pets/${pet.id}`)
    .then(() => dispatch(delPet(pet || defaultPets)))
    .catch(err => console.log(err));

export const updatePet = pet => dispatch =>
  axios
    .put(`/api/pets/${pet.id}`, pet)
    .then(res => dispatch(updPet(res.data || defaultPets)))
    .catch(err => console.log(err));

export const addPet = pet => dispatch =>
  axios
    .post(`/api/pets/`, pet)
    .then(res => dispatch(addNewPet(res.data || defaultPets)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = defaultPets, action) {
  switch (action.type) {
    case GET_PETS:
      return action.pets;
    case UPDATE_PET:
      return state.map(
        pet => (action.pet.id !== pet.id ? pet : action.pet)
      );
    case DELETE_PET:
      return state.filter(pet => action.pet.id !== pet.id);
    case ADD_PET:
      return [...state, action.pet];
    default:
      return state;
  }
}
