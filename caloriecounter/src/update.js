const MSG = {
  SHOW_FORM: 'SHOW_FORM'
};

export function showFormMsg(showForm) {
  return {
    type: MSG.SHOW_FORM,
    showForm
  };
}

function update(msg, model) {
  switch (msg.type) {
    case MSG.SHOW_FORM:
      const { showForm } = msg;
      return { ...model, showForm, description: '', calories: 0 };
  }

  return model;
}

export default update;
