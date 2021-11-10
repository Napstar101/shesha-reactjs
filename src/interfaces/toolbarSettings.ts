import { ITextAreaProps } from './../components/formDesigner/components/textArea/textArea';
import { ILabelValueEditorProps } from './../components/formDesigner/components/labelValueEditor/labelValueEditorComponent';
import { ITextFieldProps } from './../components/formDesigner/components/textField/textField';
import { IDropdownProps } from './../../dist/components/formDesigner/components/dropdown/models.d';
import { IConfigurableFormComponent } from '.';
import { ISectionSeparatorProps } from '../components/sectionSeparator';
import { IIconPickerComponentProps } from '../components/formDesigner/components/iconPicker';
import { IAutocompleteProps } from '../components/formDesigner/components/autocomplete/autocomplete';
import { ICheckboxProps } from '../components/formDesigner/components/checkbox/checkbox';
import { INumberFieldProps } from '../components/formDesigner/components/numberField/models';
import { IQueryBuilderProps } from '../components/formDesigner/components/queryBuilder/queryBuilderComponent';

interface ToolbarSettingsProp extends Omit<IConfigurableFormComponent, 'type'> {}

type DropdownType = ToolbarSettingsProp & Omit<IDropdownProps, 'type'>;

type SectionSeparatorType = ToolbarSettingsProp & Omit<ISectionSeparatorProps, 'type'>;

type TextFieldType = ToolbarSettingsProp & Omit<ITextFieldProps, 'type'>;

type TextAreaType = ToolbarSettingsProp & Omit<ITextAreaProps, 'type'>;

type IconPickerType = ToolbarSettingsProp & Omit<IIconPickerComponentProps, 'type'>;

type AutocompleteType = ToolbarSettingsProp & Omit<IAutocompleteProps, 'type'>;

type CheckboxType = ToolbarSettingsProp & Omit<ICheckboxProps, 'type'>;

type NumberFieldType = ToolbarSettingsProp & Omit<INumberFieldProps, 'type'>;

type LabelValueEditorType = ToolbarSettingsProp & Omit<ILabelValueEditorProps, 'type'>;

type QueryBuilderType = ToolbarSettingsProp & Omit<IQueryBuilderProps, 'type'>;

export class DesignerToolbarSettings {
  private form: IConfigurableFormComponent[];

  constructor() {
    this.form = [];
  }

  addDropdown(props: DropdownType) {
    this.form.push({ ...props, type: 'dropdown' });

    return this;
  }

  addSectionSeparator(props: SectionSeparatorType) {
    this.form.push({ ...props, type: 'sectionSeparator' });

    return this;
  }

  addTextField(props: TextFieldType) {
    this.form.push({ ...props, type: 'textField' });

    return this;
  }

  addTextArea(props: TextAreaType) {
    this.form.push({ ...props, type: 'textArea' });

    return this;
  }

  addIconPicker(props: IconPickerType) {
    this.form.push({ ...props, type: 'iconPicker' });

    return this;
  }

  addAutocomplete(props: AutocompleteType) {
    this.form.push({ ...props, type: 'autocomplete' });

    return this;
  }

  addCheckbox(props: CheckboxType) {
    this.form.push({ ...props, type: 'checkbox' });

    return this;
  }

  addNumberField(props: NumberFieldType) {
    this.form.push({ ...props, type: 'numberField' });

    return this;
  }

  addLabelValueEditor(props: LabelValueEditorType) {
    this.form.push({ ...props, type: 'labelValueEditor' });

    return this;
  }

  addQueryBuilder(props: QueryBuilderType) {
    this.form.push({ ...props, type: 'queryBuilder' });

    return this;
  }

  get settings() {
    return this.form;
  }

  toJson() {
    return this.form;
  }

  toJsonString() {
    return JSON?.stringify(this.form);
  }
}
