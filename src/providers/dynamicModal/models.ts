/** Dynami Modal properties */
export interface IModalProps {
  formId: string;
  fetchUrl?: string;
  title?: string;
  // path | id | markup
  id: string;
  isVisible: boolean;
  onSubmitted?: () => void;
}

/** Modal dialog instance */
export interface IModalInstance {
  id: string;
  isVisible: boolean;
  props: IModalProps;
}
