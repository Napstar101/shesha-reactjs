import { ITextFieldProps } from './../components/formDesigner/components/textField/textField';
import { IDropdownProps } from './../../dist/components/formDesigner/components/dropdown/models.d';
import { IConfigurableFormComponent } from '.';
import { IAlertProps } from '../components/formDesigner/components/alert/alertComponent';
import { ISectionSeparatorProps } from '../components/sectionSeparator';
import { IIconPickerComponentProps } from '../components/formDesigner/components/iconPicker';
import { IAutocompleteProps } from '../components/formDesigner/components/autocomplete/autocomplete';
import { ICheckboxProps } from '../components/formDesigner/components/checkbox/checkbox';
import { INumberFieldProps } from '../components/formDesigner/components/numberField/models';

interface ToolbarSettingsProp extends Omit<IConfigurableFormComponent, 'type'> {}

type AlertType = ToolbarSettingsProp & Omit<IAlertProps, 'type'>;

type DropdownType = ToolbarSettingsProp & Omit<IDropdownProps, 'type'>;

type SectionSeparatorType = ToolbarSettingsProp & Omit<ISectionSeparatorProps, 'type'>;

type TextFieldType = ToolbarSettingsProp & Omit<ITextFieldProps, 'type'>;

type IconPickerType = ToolbarSettingsProp & Omit<IIconPickerComponentProps, 'type'>;

type AutocompleteType = ToolbarSettingsProp & Omit<IAutocompleteProps, 'type'>;

type CheckboxType = ToolbarSettingsProp & Omit<ICheckboxProps, 'type'>;

type NumberFieldType = ToolbarSettingsProp & Omit<INumberFieldProps, 'type'>;

class ToolbarSettings {
  private settings: IConfigurableFormComponent[];

  constructor() {}

  addAlert(props: AlertType) {
    this.settings.push({ ...props, type: 'alert' });

    return this;
  }

  addDropdown(props: DropdownType) {
    this.settings.push({ ...props, type: 'dropdown' });

    return this;
  }

  addSectionSeparator(props: SectionSeparatorType) {
    this.settings.push({ ...props, type: 'sectionSeparator' });

    return this;
  }

  addTextField({ ...props }: TextFieldType) {
    this.settings.push({ ...props, type: 'textField' });

    return this;
  }

  addIconPicker({ ...props }: IconPickerType) {
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

  // addSectionSeparator({ ...props }: ToolbarSettingsProp) {
  //   this.settings.push({ ...props, type: 'sectionSeparator' });

  //   return this;
  // }

  // addSectionSeparator({ ...props }: ToolbarSettingsProp) {
  //   this.settings.push({ ...props, type: 'sectionSeparator' });

  //   return this;
  // }

  // addSectionSeparator({ ...props }: ToolbarSettingsProp) {
  //   this.settings.push({ ...props, type: 'sectionSeparator' });

  //   return this;
  // }

  // addSectionSeparator({ ...props }: ToolbarSettingsProp) {
  //   this.settings.push({ ...props, type: 'sectionSeparator' });

  //   return this;
  // }

  // addSectionSeparator({ ...props }: ToolbarSettingsProp) {
  //   this.settings.push({ ...props, type: 'sectionSeparator' });

  //   return this;
  // }

  // addSectionSeparator({ ...props }: ToolbarSettingsProp) {
  //   this.settings.push({ ...props, type: 'sectionSeparator' });

  //   return this;
  // }

  toJson() {
    return this.settings;
  }

  toJsonString() {
    // reat;
    return JSON?.stringify(this.settings);
  }
}

const settings = new ToolbarSettings();

settings
  ?.addAlert({
    id: 'dce9c2e8-4190-11ec-81d3-0242ac130003',
    name: '',
    text: 'Some text comes in here',
    description: 'Some description',
  })
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
  .toJson();
