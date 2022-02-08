import { BasicField, CustomerForm } from '../../../types/forms';
import { validate } from './../../../helpers/validations';

type ChangeAgentAction = (state: CustomerForm, payload: BasicField, isClassification?: boolean) => CustomerForm;

const changeAgent : ChangeAgentAction = (state, payload) => {

  const { name, value } = payload.element.target;

  return { 
    ...state, personsInCharge : {
      ...state.personsInCharge,  [name] : validate({ ...state.personsInCharge[name], value: value }),
    }, 
  };

};

export default changeAgent;