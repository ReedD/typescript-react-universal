import axios from 'axios';
import { orchestrator } from 'satcheljs';
import { formReset, formSubmit, formSubmitted } from './actions';

orchestrator(formSubmit, async data => {
  await axios.post('/api/users', {
    data,
  });
  formSubmitted();
  formReset();
});
