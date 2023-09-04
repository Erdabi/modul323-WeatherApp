import * as R from 'ramda';

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  LOCATION_INPUT: 'LOCATION_INPUT', //old meal_input new location_input
  ADD_LOCATION: 'ADD_LOCATION', //old save_meal new add_location
  DELETE_LOCATION: 'DELETE_LOCATION', 
};

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm,
  };
}

export function locationInputMsg(location) {
  return {
    type: MSGS.LOCATION_INPUT,
    location,
  };
}

export const addLocationMsg = { type: MSGS.ADD_LOCATION };

export function deleteLocationMsg(id) {
  return {
    type: MSGS.DELETE_LOCATION,
    id,
  };
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.SHOW_FORM: {
      const { showForm } = msg;
      return { ...model, showForm, location: '', temp: 0 };
    }
    case MSGS.LOCATION_INPUT: {
      const { location } = msg;
      return { ...model, location };
    }
    case MSGS.ADD_LOCATION: {
      const updatedModel = add(msg, model);
      return updatedModel;
    }
    case MSGS.DELETE_LOCATION: {
      const { id } = msg;
      const locations = R.filter(
        meal => meal.id !== id
      , model.locations);
      return { ...model, locations };
    }
  }
  return model;
}

function add(msg, model) {
  const { nextId, location } = model;
  const meal = { id: nextId, location };
  const locations = [...model.locations, meal]
  return {
    ...model,
    locations,
    nextId: nextId + 1,
    location: '',
    showForm: false,
  };
}

export default update;