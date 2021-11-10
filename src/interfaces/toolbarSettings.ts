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
  private settings: IConfigurableFormComponent[];

  constructor() {
    this.settings = [];
  }

  addDropdown(props: DropdownType) {
    this.settings.push({ ...props, type: 'dropdown' });

    return this;
  }

  addSectionSeparator(props: SectionSeparatorType) {
    this.settings.push({ ...props, type: 'sectionSeparator' });

    return this;
  }

  addTextField(props: TextFieldType) {
    this.settings.push({ ...props, type: 'textField' });

    return this;
  }

  addTextArea(props: TextAreaType) {
    this.settings.push({ ...props, type: 'textArea' });

    return this;
  }

  addIconPicker(props: IconPickerType) {
    this.settings.push({ ...props, type: 'iconPicker' });

    return this;
  }

  addAutocomplete(props: AutocompleteType) {
    this.settings.push({ ...props, type: 'autocomplete' });

    return this;
  }

  addCheckbox(props: CheckboxType) {
    this.settings.push({ ...props, type: 'checkbox' });

    return this;
  }

  addNumberField(props: NumberFieldType) {
    this.settings.push({ ...props, type: 'numberField' });

    return this;
  }

  addLabelValueEditor(props: LabelValueEditorType) {
    this.settings.push({ ...props, type: 'labelValueEditor' });

    return this;
  }

  addQueryBuilder(props: QueryBuilderType) {
    this.settings.push({ ...props, type: 'queryBuilder' });

    return this;
  }

  toJson() {
    return this.settings;
  }

  toJsonString() {
    // reat;
    return JSON?.stringify(this.settings);
  }
}

const settings = new DesignerToolbarSettings();

settings
  .addDropdown({ id: 'dce9c4fa-4190-11ec-81d3-0242ac130003', name: 'someName', dataSourceType: 'entityList' })
  .addSectionSeparator({ id: 'dce9c7ca-4190-11ec-81d3-0242ac130003', name: 'someName', sectionName: 'someSection' })
  .addTextField({ id: 'dce9c89c-4190-11ec-81d3-0242ac130003', name: 'someTextField' })
  .addIconPicker({ id: 'dce9c95a-4190-11ec-81d3-0242ac130003', name: 'someIconPicker' })
  .addAutocomplete({
    id: 'dce9c95a-4190-11ec-81d3-0242ac130003',
    name: 'someIconPicker',
    entityTypeShortAlias: { id: 'dce9c4fa-4190-11ec-81d3-0242ac130003' },
    dataSourceType: 'entitiesList',
  })
  .addCheckbox({ id: 'dce9ca0e-4190-11ec-81d3-0242ac130003', name: 'checkboxName' })
  .addNumberField({ id: 'dce9cac2-4190-11ec-81d3-0242ac130003', name: 'someNumberField' })
  .addLabelValueEditor({
    id: 'dce9cb76-4190-11ec-81d3-0242ac130003',
    name: 'someLabelValue',
    labelName: 'labelName',
    labelTitle: 'labelTitle',
    valueName: 'valueName',
    valueTitle: 'valueTitle',
  })
  .addQueryBuilder({ id: 'dce9cb76-4190-11ec-81d3-0242ac130003', name: 'queryBuilder' })
  .toJson();
