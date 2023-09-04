import * as R from 'ramda';

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  LOCATION_INPUT: 'LOCATION_INPUT', //old meal_input new location_input
  ADD_LOCATION: 'SAVE_MEAL', //old save_meal new add_location
  DELETE_MEAL: 'DELETE_MEAL',
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
    description,
  };
}

export const saveMealMsg = { type: MSGS.SAVE_MEAL };

export function deleteMealMsg(id) {
  return {
    type: MSGS.DELETE_MEAL,
    id,
  };
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.SHOW_FORM: {
      const { showForm } = msg;
      return { ...model, showForm, description: '', calories: 0 };
    }
    case MSGS.MEAL_INPUT: {
      const { description } = msg;
      return { ...model, description };
    }
    case MSGS.CALORIES_INPUT: {
      const calories = R.pipe(
        parseInt, 
        R.defaultTo(0),
      )(msg.calories);
      return { ...model, calories };
    }
    case MSGS.SAVE_MEAL: {
      const updatedModel = add(msg, model);
      return updatedModel;
    }
    case MSGS.DELETE_MEAL: {
      const { id } = msg;
      const meals = R.filter(
        meal => meal.id !== id
      , model.meals);
      return { ...model, meals };
    }
  }
  return model;
}

function add(msg, model) {
  const { nextId, description, calories } = model;
  const meal = { id: nextId, description, calories };
  const meals = [...model.meals, meal]
  return {
    ...model,
    meals,
    nextId: nextId + 1,
    description: '',
    calories: 0,
    showForm: false,
  };
}

export default update;