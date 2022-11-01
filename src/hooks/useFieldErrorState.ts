

type UseShowErrorFunc = (formState: {
  isSubmitted: boolean,
  touched: boolean,
  hasError: boolean
}) => { hasError: boolean };

export const useFieldErrorState : UseShowErrorFunc = ({ touched, isSubmitted, hasError } ) => {

  return {
    hasError: hasError && (touched || isSubmitted),
  };
};

export default useFieldErrorState;