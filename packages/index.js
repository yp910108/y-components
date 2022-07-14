import Button from './button'
import Cascader from './cascader'
import Checkbox from './checkbox'
import CheckboxButton from './checkbox-button'
import CheckboxGroup from './checkbox-group'
import Col from './col'
import DatePicker from './date-picker'
import Dialog from './dialog'
import Dropdown from './dropdown'
import DropdownItem from './dropdown-item'
import DropdownMenu from './dropdown-menu'
import Form from './form'
import FormItem from './form-item'
import Icon from './icon'
import Input from './input'
import InputNumber from './input-number'
import ListSelect from './list-select'
import ListSelectPane from './list-select-pane'
import Option from './option'
import OptionGroup from './option-group'
import Pagination from './pagination'
import Popconfirm from './popconfirm'
import Popover from './popover'
import ProTable from './pro-table'
import Radio from './radio'
import RadioButton from './radio-button'
import RadioGroup from './radio-group'
import Row from './row'
import Scrollbar from './scrollbar'
import Select from './select'
import TabPane from './tab-pane'
import Table from './table'
import TableColumn from './table-column'
import Tabs from './tabs'
import Tree from './tree'
import TreeSelect from './tree-select'
import Upload from './upload'

const components = [
  Button,
  Cascader,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Icon,
  Input,
  InputNumber,
  ListSelect,
  ListSelectPane,
  Option,
  OptionGroup,
  Pagination,
  Popconfirm,
  Popover,
  ProTable,
  Radio,
  RadioButton,
  RadioGroup,
  Row,
  Scrollbar,
  Select,
  TabPane,
  Table,
  TableColumn,
  Tabs,
  Tree,
  TreeSelect,
  Upload
]

const install = (Vue) => {
  for (const component of components) {
    Vue.component(component.name, component)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '1.0.3',
  install,
  Button,
  Cascader,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Icon,
  Input,
  InputNumber,
  ListSelect,
  ListSelectPane,
  Option,
  OptionGroup,
  Pagination,
  Popconfirm,
  Popover,
  ProTable,
  Radio,
  RadioButton,
  RadioGroup,
  Row,
  Scrollbar,
  Select,
  TabPane,
  Table,
  TableColumn,
  Tabs,
  Tree,
  TreeSelect,
  Upload
}
