

type PatternType = 'email' | 'tel' | 'postal';
type TFormStatus = 'busy' | 'disabled' | '';

interface ElementTarget {
  target: { name: string, value: string }
}

interface InputField {
  label: string,
  value: string,
  touched: boolean,
  hasError: boolean,
  helperText: string,
  placeholder?: string,
  isRequired?: boolean,
  inputType?: PatternType,
  infoText?: string,
  isDisabled?: boolean
}

type SubmitStatus = 'EDITTING' |  'VALIDATE' | 'VALIDATE_SUCCESS' | 'VALIDATE_ERROR' | 'CONFIRM_SAVE' | 'FETCHING' | 'FETCH_ERROR' | 'SUCCESS' | 'SUCCES_UPDATE';


interface FormState {
  isSubmitted: boolean,
  submitState: SubmitStatus
}

interface URLParams {
  projId?: string
  projEstimateId?: string,
  custGroupId?: string,
  menuOpen?: number,
  invoiceId?: number,
}

type KeyOfUrlParams = keyof URLParams;

