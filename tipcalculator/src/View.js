import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { billChangedMsg, tipChangedMsg } from './Update';

const { div, h1, pre, input, label } = hh(h);

function inputSection(labelText, value, changeFn) {
  return div([
    label({ className: 'db fw6 lh-copy f5' }, labelText),
    input({
      type: 'text',
      className: 'border-box pa2 ba mb2 tr w-100',
      value,
      oninput: e => changeFn(e.target.value)
    })
  ]);
}

function resultSection(labelText, value) {
  return div({ className: 'w-100 b bt mt2 pt2' }, [
    div({ className: 'flex w-100' }, [
      div({ className: 'w-50 pv1 pr2' }, labelText),
      div({ className: 'w-50 tr pv1 pr2' }, `$${value}`)
    ])
  ]);
}

function view(dispatch, model) {
  return div({ className: 'mw6 center w-40' }, [
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
