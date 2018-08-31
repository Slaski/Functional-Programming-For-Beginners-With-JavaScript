import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { billChangedMsg, tipChangedMsg } from './Update';

const { div, h1, pre, input, label } = hh(h);

function inputSection(labelText, value, changeFn) {
  return div([
    label({ className: 'db m1' }, labelText),
    input({
      type: 'text',
      className: 'db w-100 mv2 pa2 input-reset ba',
      value,
      oninput: e => changeFn(e.target.value)
    })
  ]);
}

function resultSection(labelText, value) {
  return div([label({ className: 'db m1' }, `${labelText}: $${value}`)]);
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    inputSection('Bill Amount', model.bill || '', val =>
      dispatch(billChangedMsg(val))
    ),
    inputSection('Tip %', model.tipPercentage || '', val =>
      dispatch(tipChangedMsg(val))
    ),
    resultSection('Tip', model.tip),
    resultSection('Total', model.total),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
