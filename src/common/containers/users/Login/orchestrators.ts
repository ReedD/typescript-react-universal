import axios, { AxiosError } from 'axios';
import { dispatch, orchestrator } from 'satcheljs';
import { formError, formReset, formSubmit, formSubmitted } from './actions';

orchestrator(formSubmit, async data => {
  let success = false;
  try {
    await axios.post('/api/users/login', {
      data,
    });
    success = true;
  } catch (e) {
    const { data: error } = (e as AxiosError).response;
    dispatch(formError(error));
  }
  if (success) dispatch(formReset());
  dispatch(formSubmitted());
});
