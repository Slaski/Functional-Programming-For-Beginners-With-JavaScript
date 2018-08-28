import * as R from 'ramda';

const MSG = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT'
};

export function showFormMsg(showForm) {
  return {
    type: MSG.SHOW_FORM,
    showForm
  };
}

export function mealInputMsg(description) {
  return {
    type: MSG.MEAL_INPUT,
    description
  };
}

export function caloriesInputMsg(calories) {
  return {
    type: MSG.CALORIES_INPUT,
    calories
  };
}

function update(msg, model) {
  switch (msg.type) {
    case MSG.SHOW_FORM:
      const { showForm } = msg;
      return { ...model, showForm, description: '', calories: 0 };
    case MSG.MEAL_INPUT:
      const { description } = msg;
      return { ...model, description };
    case MSG.CALORIES_INPUT:
      const calories = R.pipe(
        parseInt,
        R.defaultTo(0)
      )(msg.calories);
      return { ...model, calories };
  }

  return model;
}

export default update;
