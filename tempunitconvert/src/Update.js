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

function convert(model) {
  const { leftValue, leftUnit, rightValue, rightUnit } = model;

  const [fromUnit, fromTemp, toUnit] = model.sourceLeft
    ? [leftUnit, leftValue, rightUnit]
    : [rightUnit, rightValue, leftUnit];

  const otherValue = R.pipe(
    convertFromToTemp,
    Math.round
  )(fromUnit, toUnit, fromTemp);

  return model.sourceLeft
    ? { ...model, rightValue: otherValue }
    : { ...model, leftValue: otherValue };
}

function convertFromToTemp(fromUnit, toUnit, temp) {
  const convertFn = R.pathOr(R.identity, [fromUnit, toUnit], UnitConversions);

  return convertFn(temp);
}

function FahrenheitToCelsius(temp) {
  return (5 / 9) * (temp - 32);
}

function CelsiusToFahrenheit(temp) {
  return (9 / 5) * temp + 32;
}

function KelvinToCelsius(temp) {
  return temp - 273.15;
}

function CelsiusToKelvin(temp) {
  return temp + 273.15;
}

const FahrenheitToKelvin = R.pipe(
  FahrenheitToCelsius,
  CelsiusToKelvin
);

const KelvinToFahrenheit = R.pipe(
  KelvinToCelsius,
  CelsiusToFahrenheit
);

const UnitConversions = {
  Celsius: {
    Fahrenheit: CelsiusToFahrenheit,
    Kelvin: CelsiusToKelvin
  },
  Fahrenheit: {
    Celsius: FahrenheitToCelsius,
    Kelvin: FahrenheitToKelvin
  },
  Kelvin: {
    Celsius: KelvinToCelsius,
    Fahrenheit: KelvinToFahrenheit
  }
};

function update(msg, model) {
  switch (msg.type) {
    case MSG.LEFT_VALUE_INPUT: {
      if (msg.value === '') {
        return { ...model, sourceLeft: true, leftValue: '', rightValue: '' };
      }

      const leftValue = toInt(msg.value);
      return convert({ ...model, sourceLeft: true, leftValue });
    }
    case MSG.RIGHT_VALUE_INPUT: {
      if (msg.value === '') {
        return { ...model, sourceLeft: false, leftValue: '', rightValue: '' };
      }

      const rightValue = toInt(msg.value);
      return convert({ ...model, sourceLeft: false, rightValue });
    }
    case MSG.LEFT_UNIT_CHANGED: {
      const { unit: leftUnit } = msg;
      return convert({ ...model, sourceLeft: true, leftUnit });
    }
    case MSG.RIGHT_UNIT_CHANGED: {
      const { unit: rightUnit } = msg;
      return convert({ ...model, sourceLeft: false, rightUnit });
    }
  }

  return model;
}

export default update;
