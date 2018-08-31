import * as R from 'ramda';

const MSG = {
  LEFT_VALUE_INPUT: 'LEFT_VALUE_INPUT',
  RIGHT_VALUE_INPUT: 'RIGHT_VALUE_INPUT',
  LEFT_UNIT_CHANGED: 'LEFT_UNIT_CHANGED',
  RIGHT_UNIT_CHANGED: 'RIGHT_UNIT_CHANGED'
};

export function leftValueInputMsg(value) {
  return {
    type: MSG.LEFT_VALUE_INPUT,
    value
  };
}

export function rightValueInputMsg(value) {
  return {
    type: MSG.RIGHT_VALUE_INPUT,
    value
  };
}

export function leftUnitChanged(unit) {
  return {
    type: MSG.LEFT_UNIT_CHANGED,
    unit
  };
}

export function rightUnitChanged(unit) {
  return {
    type: MSG.RIGHT_UNIT_CHANGED,
    unit
  };
}

const toInt = R.pipe(
  parseInt,
  R.defaultTo(0)
);

function update(msg, model) {
  switch (msg.type) {
    case MSG.LEFT_VALUE_INPUT: {
      if (msg.value === '') {
        return { ...model, sourceLeft: true, leftValue: '', rightValue: '' };
      }

      const leftValue = toInt(msg.value);
      return { ...model, sourceLeft: true, leftValue };
    }
    case MSG.RIGHT_VALUE_INPUT: {
      if (msg.value === '') {
        return { ...model, sourceLeft: false, leftValue: '', rightValue: '' };
      }

      const rightValue = toInt(msg.value);
      return { ...model, sourceLeft: false, rightValue };
    }
    case MSG.LEFT_UNIT_CHANGED: {
      const { unit: leftUnit } = msg;
      return { ...model, leftUnit };
    }
    case MSG.RIGHT_UNIT_CHANGED: {
      const { unit: rightUnit } = msg;
      return { ...model, rightUnit };
    }
  }

  return model;
}

export default update;
