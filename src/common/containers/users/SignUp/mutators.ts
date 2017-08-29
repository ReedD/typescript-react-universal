import { mutator } from 'satcheljs';
import { formChange, formReset, formSubmit, formSubmitted } from './actions';
import getStore from './store';

mutator(formChange, ({ name, value }) => {
  getStore()[name] = value;
});

mutator(formSubmit, () => {
  getStore().submitting = true;
});

mutator(formSubmitted, () => {
  getStore().submitting = false;
});

mutator(formChange, ({ name, value }) => {
  getStore()[name] = value;
});

mutator(formReset, () => {
  const store = getStore();
  store.name = '';
  store.email = '';
  store.password = '';
  store.submitting = false;
});
