import * as R from 'ramda';

const MSG = {
  BILL_CHANGED: 'BILL_CHANGED',
  TIP_CHANGED: 'TIP_CHANGED'
};

export function billChangedMsg(bill) {
  return { type: MSG.BILL_CHANGED, bill };
}

export function tipChangedMsg(tip) {
  return { type: MSG.TIP_CHANGED, tip };
}

const toFloat = R.pipe(
  parseFloat,
  R.defaultTo(0.0)
);

function update(msg, model) {
  switch (msg.type) {
    case MSG.BILL_CHANGED: {
      return { ...model, bill: toFloat(msg.bill) };
    }
    case MSG.TIP_CHANGED: {
      return { ...model, tipPercentage: toFloat(msg.tip) };
    }
  }

  return model;
}

export default update;
