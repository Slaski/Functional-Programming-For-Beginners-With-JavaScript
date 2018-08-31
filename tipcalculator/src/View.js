import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const { div, h1, pre, input, label } = hh(h);

function inputSection(labelText, value) {
  return div([
    label({ className: 'db m1' }, labelText),
    input({
      type: 'text',
      className: 'db w-100 mv2 pa2 input-reset ba',
      value
    })
  ]);
}

function resultSection(labelText, value) {
  return div([label({ className: 'db m1' }, `${labelText}: $${value}`)]);
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    inputSection('Bill Amount', model.bill || ''),
    inputSection('Tip %', model.tipPercentage || ''),
    resultSection('Tip', model.tip),
    resultSection('Total', model.total),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
