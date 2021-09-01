import TextField from '../../../components/formDesigner/components/textField/textField';
import NumberField from '../../../components/formDesigner/components/numberField/numberField';
import DateField from '../../../components/formDesigner/components/dateField/dateField';
import Tabs from '../../../components/formDesigner/components/tabs/tabs';
import Columns from '../../../components/formDesigner/components/columns/columns';
import SectionSeprator from '../../../components/formDesigner/components/sectionSeprator/sectionSeprator';

import TextArea from '../../../components/formDesigner/components/textArea/textArea';
import Autocomplete from '../../../components/formDesigner/components/autocomplete/autocomplete';
import Dropdown from '../../../components/formDesigner/components/dropdown/dropdown';
import Checkbox from '../../../components/formDesigner/components/checkbox/checkbox';
import CheckboxGroup from '../../../components/formDesigner/components/checkboxGroup/checkboxGroup';
import Radio from '../../../components/formDesigner/components/radio/radio';
import FileUpload from '../../../components/formDesigner/components/fileUpload/fileUpload';
import AttachmentsEditor from '../../../components/formDesigner/components/attachmentsEditor/attachmentsEditor';
import Button from '../../../components/formDesigner/components/button/button';
import KeyValueEditor from '../../../components/formDesigner/components/labelValueEditor/labelValueEditorComponent';
import CollapsiblePanel from '../../../components/formDesigner/components/collapsiblePanel/collapsiblePanelComponent';
import Alert from '../../../components/formDesigner/components/alert/alertComponent';
import Notes from '../../../components/formDesigner/components/notes/notesComponent';
import ChildDataTable from '../../../components/formDesigner/components/childDataTable/childDataTableComponent';
import Address from '../../../components/formDesigner/components/address/addressComponent';
import Toolbar from '../../../components/formDesigner/components/dataTable/toolbar/toolbarComponent';
import TableViewSelector from '../../../components/formDesigner/components/dataTable/tableViewSelector/tableViewSelectorComponent';
import QueryBuilderComponent from '../../../components/formDesigner/components/queryBuilder/queryBuilderComponent';
import TableContext from '../../../components/formDesigner/components/dataTable/tableContext/tableContextComponent';
import DataTable from '../../../components/formDesigner/components/dataTable/table/tableComponent';
import Pager from '../../../components/formDesigner/components/dataTable/pager/pagerComponent';
import QuickSearch from '../../../components/formDesigner/components/dataTable/quickSearch/quickSearchComponent';
import AdvancedFilterButton from '../../../components/formDesigner/components/dataTable/advancedFilterButton/advancedFilterButtonComponent';
import SelectColumnsButton from '../../../components/formDesigner/components/dataTable/selectColumnsButton/selectColumnsButtonComponent';
import ContainerComponent from '../../../components/formDesigner/components/container/containerComponent';
import HierarchicalChecklistComponent from '../../../components/formDesigner/components/hierarchicalChecklist/hierarchicalChecklistComponent';
import Switch from '../../../components/formDesigner/components/switch/switch';
import ValidationErrors from '../../../components/formDesigner/components/validationErrors';
import IconPicker from '../../../components/formDesigner/components/iconPicker';

import { IToolboxComponentGroup } from '../../../interfaces/formDesigner';
import DisplayFormItem from '../../../components/formDesigner/components/basicDisplayFormItem';

export const ToolboxComponents: IToolboxComponentGroup[] = [
  {
    name: 'Basic',
    components: [
      Autocomplete,
      Button,
      Checkbox,
      CheckboxGroup,
      DateField,
      Dropdown,
      NumberField,
      Radio,
      Switch,
      TextArea,
      TextField,
    ],
  },
  {
    name: 'Static',
    components: [Alert, ValidationErrors, DisplayFormItem],
  },
  {
    name: 'Layout',
    components: [CollapsiblePanel, Columns, ContainerComponent, SectionSeprator, Tabs],
  },
  {
    name: 'Custom',
    components: [
      Address,
      AttachmentsEditor,
      ChildDataTable,
      FileUpload,
      HierarchicalChecklistComponent,
      KeyValueEditor,
      Notes,
      IconPicker,
      QueryBuilderComponent,
    ],
  },
  {
    name: 'Datatable',
    components: [
      AdvancedFilterButton,
      DataTable,
      Pager,
      //QueryBuilderComponent,
      QuickSearch,
      SelectColumnsButton,
      TableContext,
      TableViewSelector,
      Toolbar,
    ],
  },
];

/*
export const ToolboxComponents: IToolboxComponentBase[] = ComponentGroups.reduce(function(a, b) {
  return a.concat(b.components);
}, []);
*/

export default ToolboxComponents;

/*
const duplicates = Components.reduce(function (r, a) {
  r[a.type] = r[a.type] || [];
  r[a.type].push(a);
  return r;
}, Object.create(null));

console.log(duplicates);
*/
