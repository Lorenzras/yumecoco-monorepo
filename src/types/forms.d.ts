
type PatternType = 'email' | 'tel' | 'postal';

export interface InputField { value: string, touched: boolean, hasError: boolean, errorMsg: string, isRequired?:boolean, inputType?: PatternType }

export interface ContactField extends InputField {
  type: '電話番号１' | '電話番号２' | 'メール',
  classification: InputField,
}


export interface CustomerBasicInformation {
  [key: string]: InputField | ContactField[] | boolean,
  fullName: InputField,
  fullNameReading: InputField,
  gender: InputField,
  birthYear: InputField,
  birthMonth : InputField,
  birthDay : InputField,
  isSameAsMain: boolean,
  contacts : ContactField[],
  postal: InputField,
  address1: InputField,
  address2: InputField,
}

export interface CustomerForm {
  isSubmitted: boolean,
  customers : CustomerBasicInformation[],
}

export interface ElementTarget {
  target :  { name: string, value: string }
}

export type InputChangeType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ;

export type HandleFieldChangeFunc = (e: ElementTarget) => void;

export type Payload = { customerIdx : number };

export interface ContactPayload extends Payload { contactIdx: number, element: ElementTarget }

export interface FieldPayload extends Payload {element: ElementTarget }

export type FieldActionType =
| { type: 'CHANGE', payload: FieldPayload }
| { type: 'SELECT_CHANGE', payload: FieldPayload }
| { type: 'ADD' }
| { type: 'SET_SAME_AS_MAIN', payload: Payload }
| { type: 'REMOVE', payload: Payload }
| { type: 'CHANGE_BIRTHYEAR', payload: FieldPayload }
| { type: 'CHANGE_CONTACT_TEXT', payload: ContactPayload }
| { type: 'CHANGE_CONTACT_CLASS', payload: ContactPayload };
