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
import FileUpload from '../../../components/formDesigner/components/fileUpload';
import AttachmentsEditor from '../../../components/formDesigner/components/attachmentsEditor/attachmentsEditor';
import Button from '../../../components/formDesigner/components/button/button';
import KeyValueEditor from '../../../components/formDesigner/components/labelValueEditor/labelValueEditorComponent';
import CollapsiblePanel from '../../../components/formDesigner/components/collapsiblePanel/collapsiblePanelComponent';
import Alert from '../../../components/formDesigner/components/alert';
import Notes from '../../../components/formDesigner/components/notes/notesComponent';
import ChildDataTable from '../../../components/formDesigner/components/childDataTable/childDataTableComponent';
import Address from '../../../components/formDesigner/components/address/addressComponent';
import Toolbar from '../../../components/formDesigner/components/dataTable/toolbar/toolbarComponent';
import TableViewSelector from '../../../components/formDesigner/components/dataTable/tableViewSelector/tableViewSelectorComponent';
import QueryBuilderComponent from '../../../components/formDesigner/components/queryBuilder/queryBuilderComponent';
import TableContext from '../../../components/formDesigner/components/dataTable/tableContext/tableContextComponent';
import DataTable from '../../../components/formDesigner/components/dataTable/table/tableComponent';
import TableTemplate from '../../../components/formDesigner/components/dataTable/table/tableTemplateComponent';
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
import EntityPickerComponent from '../../../components/formDesigner/components/entityPicker';
import Section from '../../../components/formDesigner/components/section';
import TimeField from '../../../components/formDesigner/components/timeField';
import Statistic from '../../../components/formDesigner/components/statistic';
import PropertyAutocomplete from '../../../components/formDesigner/components/propertyAutocomplete';
import CodeEditor from '../../../components/formDesigner/components/codeEditor';
import EditableTagGroup from '../../../components/formDesigner/components/editableTagGroup';
import DetailsView from '../../../components/formDesigner/components/detailsView';
import BlankView from '../../../components/formDesigner/components/blankView';
import TableView from '../../../components/formDesigner/components/tableView';
import FormView from '../../../components/formDesigner/components/formView';
import DashboardView from '../../../components/formDesigner/components/dashboardView';
import MasterDetailsView from '../../../components/formDesigner/components/masterDetailsView';
import MenuView from '../../../components/formDesigner/components/menuView';

export const ToolboxComponents: IToolboxComponentGroup[] = [
  {
    name: 'Basic',
    visible: true,
    components: [
      Autocomplete,
      Button,
      Checkbox,
      CheckboxGroup,
      TimeField,
      DateField,
      Dropdown,
      NumberField,
      Radio,
      Switch,
      TextArea,
      TextField,
      Statistic,
    ],
  },
  {
    name: 'Static',
    visible: true,
    components: [Alert, ValidationErrors, DisplayFormItem, Section],
  },
  {
    name: 'Layout',
    visible: true,
    components: [CollapsiblePanel, Columns, ContainerComponent, SectionSeprator, Tabs],
  },
  {
    name: 'Custom',
    visible: true,
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
      EntityPickerComponent,
      PropertyAutocomplete,
      CodeEditor,
      EditableTagGroup,
    ],
  },
  {
    name: 'Datatable',
    visible: true,
    components: [
      TableTemplate,
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
  {
    visible: false,
    name: 'Views',
    components: [DetailsView, BlankView, TableView, FormView, DashboardView, MasterDetailsView, MenuView],
  },
];

export default ToolboxComponents;

/*
const duplicates = Components.reduce(function (r, a) {
  r[a.type] = r[a.type] || [];
  r[a.type].push(a);
  return r;
}, Object.create(null));

console.log(duplicates);
*/
