/**
 * Dynamic Modal properties
 */
export interface IModalProps {
  /**
   * Id of the form to be rendered on the markup
   */
  formId: string;

  /**
   * Url to be used to fetch form data
   */
  fetchUrl?: string;

  /**
   * Whether the modal footer should be shown. The modal footer shows default buttons Submit and Cancel.
   *
   * The url to use will be found in the form settings and the correct verb to use is specified by submitHttpVerb
   */
  showModalFooter?: boolean;

  /**
   * What http verb to use when submitting the form. Used in conjunction with `showModalFooter`
   */
  submitHttpVerb?: 'POST' | 'PUT';

  /**
   * Title to display on the modal
   */
  title?: string;
  // path | id | markup

  /**
   * Id of the modal to be shown
   */
  id: string;

  /**
   * Whether the modal is visible
   */
  isVisible: boolean;

  /**
   * A callback to execute when the form has been submitted
   */
  onSubmitted?: () => void;
}

/**
 * Modal dialog instance
 */
export interface IModalInstance {
  id: string;
  isVisible: boolean;
  props: IModalProps;
}
