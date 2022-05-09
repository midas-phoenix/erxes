import Datetime from '@nateradebaugh/react-datetime';
import FormControl from '@erxes/ui/src/components/form/Control';
import FormGroup from '@erxes/ui/src/components/form/Group';
import ControlLabel from '@erxes/ui/src/components/form/Label';
import Uploader from '@erxes/ui/src/components/Uploader';
import SelectCustomers from '@erxes/ui/src/customers/containers/SelectCustomers';
import { IAttachment, ILocationOption, IField } from '@erxes/ui/src/types';
import {
  COMPANY_BUSINESS_TYPES,
  COMPANY_INDUSTRY_TYPES,
  COUNTRIES
} from '@erxes/ui/src/companies/constants';
import React from 'react';
import { LogicIndicator, SelectInput, ObjectList } from '../styles';
import Select from 'react-select-plus';
import { IOption } from '@erxes/ui/src/types';
import ModifiableList from '@erxes/ui/src/components/ModifiableList';
import { __ } from '@erxes/ui/src/utils/core';
import {
  FieldStyle,
  SidebarCounter,
  SidebarList
} from '@erxes/ui/src/layout/styles';
import Map from '@erxes/ui/src/components/Map';
import { MapContainer } from '@erxes/ui/src/styles/main';

type Props = {
  field: IField;
  currentLocation: ILocationOption;
  defaultValue?: any;
  hasLogic?: boolean;
  isPreview?: boolean;
  onValueChange?: (data: { _id: string; value: any }) => void;
  onChangeLocationOptions?: (locationOptions: ILocationOption[]) => void;
};

type State = {
  value?: any;
  checkBoxValues: any[];
  errorCounter: number;
  currentLocation: ILocationOption;
};

export default class GenerateField extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      errorCounter: 0,
      ...this.generateState(props),
      currentLocation: props.currentLocation
    };
  }

  generateState = props => {
    const { field, defaultValue } = props;

    const state = { value: defaultValue, checkBoxValues: [] };

    if (defaultValue && field.type === 'check') {
      state.checkBoxValues = defaultValue;
    }

    return state;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState(this.generateState(nextProps));
    }

    if (nextProps.currentLocation !== this.props.currentLocation) {
      this.setState({ currentLocation: nextProps.currentLocation });
    }
  }

  renderSelect(options: string[] = [], attrs = {}) {
    return (
      <FormControl componentClass="select" {...attrs}>
        <option key={''} value="">
          Choose option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </FormControl>
    );
  }

  renderMultiSelect(options: string[] = [], attrs) {
    const onChange = (ops: IOption[]) => {
      const { field, onValueChange } = this.props;

      if (onValueChange) {
        const value = ops.map(e => e.value).toString();
        this.setState({ value });

        onValueChange({ _id: field._id, value });
      }
    };
    return (
      <Select
        value={attrs.value}
        options={options.map(e => ({ value: e, label: e }))}
        onChange={onChange}
        multi={true}
      />
    );
  }

  renderInput(attrs, hasError?: boolean) {
    let { value, errorCounter } = this.state;
    let checkBoxValues = this.state.checkBoxValues || [];
    const { type } = this.props.field;
    let { validation } = this.props.field;

    if (hasError) {
      value = '';
      checkBoxValues = [];
      this.setState({ value, checkBoxValues });
    }

    attrs.type = 'text';

    attrs.onChange = e => {
      this.setState({ value: e.target.value });
      this.onChange(e, attrs.option);
    };

    if (type === 'radio') {
      attrs.type = 'radio';
      attrs.componentClass = 'radio';
      attrs.checked = String(value) === attrs.option;
    }

    if (type === 'hasAuthority') {
      attrs.type = 'radio';
      attrs.componentClass = 'radio';
      attrs.checked = String(value) === attrs.option;
    }

    if (type && type.includes('isSubscribed')) {
      attrs.type = 'radio';
      attrs.componentClass = 'radio';
      attrs.checked = String(value) === attrs.option;
    }

    if (type === 'check') {
      attrs.type = 'checkbox';
      attrs.componentClass = 'checkbox';
      attrs.checked = checkBoxValues.includes(attrs.option);
    }

    if (type === 'birthDate') {
      validation = 'date';
    }

    if (validation === 'datetime') {
      attrs.max = '9999-12-31';

      // redefine onChange since date chooser returns the value, not event
      attrs.onChange = val => {
        this.setState({ value: val });
        this.onChange(val, val);
      };

      return (
        <Datetime
          {...attrs}
          value={value}
          dateFormat="YYYY/MM/DD"
          timeFormat="HH:mm"
          closeOnSelect={true}
        />
      );
    }

    if (validation === 'date') {
      attrs.max = '9999-12-31';

      // redefine onChange since date chooser returns the value, not event
      attrs.onChange = val => {
        this.setState({ value: val });
        this.onChange(val, val);
      };

      return (
        <Datetime
          {...attrs}
          value={value}
          dateFormat="YYYY/MM/DD"
          timeFormat={false}
          closeOnSelect={true}
        />
      );
    }

    if (validation === 'number') {
      attrs.type = 'number';
    }

    if (hasError && errorCounter < 10) {
      errorCounter = errorCounter + 1;

      this.setState({ errorCounter });
    }

    return <FormControl {...attrs} />;
  }

  renderTextarea(attrs) {
    return <FormControl componentClass="textarea" {...attrs} />;
  }

  renderRadioOrCheckInputs(options, attrs, hasError?: boolean) {
    return (
      <div>
        {options.map((option, index) => (
          <SelectInput key={index}>
            {this.renderInput({ ...attrs, option }, hasError)}
            <span>{option}</span>
          </SelectInput>
        ))}
      </div>
    );
  }

  renderFile({ id, value }) {
    const onChangeFile = (attachments: IAttachment[]) => {
      const { onValueChange } = this.props;

      if (onValueChange) {
        this.setState({ value: attachments });

        onValueChange({ _id: id, value: attachments });
      }
    };

    return (
      <Uploader
        defaultFileList={value || []}
        onChange={onChangeFile}
        multiple={true}
        single={false}
      />
    );
  }

  renderCustomer({ id, value }) {
    const onSelect = e => {
      const { onValueChange } = this.props;

      if (onValueChange) {
        this.setState({ value: e });

        onValueChange({ _id: id, value: e });
      }
    };

    return (
      <SelectCustomers
        label="Filter by customers"
        name="customerIds"
        multi={false}
        initialValue={value}
        onSelect={onSelect}
      />
    );
  }

  renderHtml() {
    const { content } = this.props.field;
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: content || ''
        }}
      />
    );
  }

  renderList(attrs) {
    let options = [];
    if (attrs.value && attrs.value.length > 0) {
      options = attrs.value.split(',') || [];
    }

    const onChange = ops => {
      const { field, onValueChange } = this.props;

      if (onValueChange) {
        const value = ops.toString();

        this.setState({ value });

        onValueChange({ _id: field._id, value });
      }
    };

    return (
      <ModifiableList
        options={options}
        onChangeOption={onChange}
        addButtonLabel={__('Add a value')}
        showAddButton={true}
      />
    );
  }

  renderObject(object: any, index: number) {
    const entries = Object.entries(object);

    return (
      <SidebarList className="no-hover" key={index}>
        {entries.map(e => {
          const key = e[0];
          const value: any = e[1] || '';

          return (
            <li key={key}>
              <FieldStyle>{key}:</FieldStyle>
              <SidebarCounter>{value}</SidebarCounter>
            </li>
          );
        })}
      </SidebarList>
    );
  }

  renderObjectList(attrs) {
    let { value = [] } = attrs;

    if (typeof value === 'string' && value.length > 0) {
      try {
        value = JSON.parse(value);
      } catch {
        value = [];
      }
    }

    return (
      <ObjectList>
        {(value || []).map((object, index) => this.renderObject(object, index))}
      </ObjectList>
    );
  }

  renderMap(attrs) {
    const {
      field,
      isPreview,
      onChangeLocationOptions,
      onValueChange
    } = this.props;
    const { locationOptions = [] } = field;
    const { value } = attrs;

    let { currentLocation } = this.state;

    const onChangeMarker = e => {
      if (onValueChange) {
        onValueChange({ _id: field._id, value: e });
      }
    };

    if (value && value.length !== 0) {
      currentLocation = value;
    }

    return (
      <MapContainer>
        <Map
          center={currentLocation || { lat: 0, lng: 0 }}
          googleMapApiKey={localStorage.getItem('GOOGLE_MAP_API_KEY') || ''}
          defaultZoom={7}
          locationOptions={locationOptions}
          mapControlOptions={{
            controlSize: 30,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: isPreview ? false : true
          }}
          isPreview={isPreview}
          onChangeMarker={onChangeMarker}
          onChangeLocationOptions={onChangeLocationOptions}
        />
      </MapContainer>
    );
  }

  /**
   * Handle all types of fields changes
   * @param {Object} e - Event object
   * @param {String} optionValue - per radio button or checkbox value
   */
  onChange = (e, optionValue) => {
    const { field, onValueChange } = this.props;
    const { validation, type } = field;

    if (!e.target && !optionValue) {
      return;
    }

    let value = optionValue || e.target.value;

    if (validation === 'number') {
      value = Number(value);
    }

    if (type === 'check') {
      let checkBoxValues = this.state.checkBoxValues;
      const isChecked = e.target.checked;
      // if selected value is not already in list then add it
      if (isChecked && !checkBoxValues.includes(optionValue)) {
        checkBoxValues.push(optionValue);
      }

      // remove option from checked list
      if (!isChecked) {
        checkBoxValues = checkBoxValues.filter(v => v !== optionValue);
      }

      this.setState({ checkBoxValues });

      value = checkBoxValues;
    }

    if (onValueChange) {
      this.setState({ value });

      onValueChange({ _id: field._id, value });
    }
  };

  renderControl() {
    const { field } = this.props;
    const { type } = field;
    const options = field.options || [];

    const attrs = {
      id: field._id,
      value: this.state.value,
      onChange: this.onChange,
      name: ''
    };

    const boolOptions = ['Yes', 'No'];

    switch (type) {
      case 'select':
        return this.renderSelect(options, attrs);

      case 'multiSelect':
        return this.renderMultiSelect(options, attrs);

      case 'pronoun':
        return this.renderSelect(['Male', 'Female', 'Not applicable'], attrs);

      case 'check':
        try {
          return this.renderRadioOrCheckInputs(options, attrs);
        } catch {
          return this.renderRadioOrCheckInputs(options, attrs, true);
        }

      case 'radio':
        attrs.name = Math.random().toString();
        try {
          return this.renderRadioOrCheckInputs(options, attrs);
        } catch {
          return this.renderRadioOrCheckInputs(options, attrs, true);
        }

      case 'hasAuthority':
        attrs.name = Math.random().toString();
        try {
          return this.renderRadioOrCheckInputs(boolOptions, attrs);
        } catch {
          return this.renderRadioOrCheckInputs(boolOptions, attrs, true);
        }

      case 'isSubscribed':
        attrs.name = Math.random().toString();
        try {
          return this.renderRadioOrCheckInputs(boolOptions, attrs);
        } catch {
          return this.renderRadioOrCheckInputs(boolOptions, attrs, true);
        }

      case 'company_isSubscribed':
        attrs.name = Math.random().toString();
        try {
          return this.renderRadioOrCheckInputs(boolOptions, attrs);
        } catch {
          return this.renderRadioOrCheckInputs(boolOptions, attrs, true);
        }

      case 'textarea':
        return this.renderTextarea(attrs);

      case 'description':
        return this.renderTextarea(attrs);

      case 'company_description':
        return this.renderTextarea(attrs);

      case 'file': {
        return this.renderFile(attrs);
      }

      case 'avatar': {
        return this.renderFile(attrs);
      }

      case 'company_avatar': {
        return this.renderFile(attrs);
      }

      case 'industry': {
        return this.renderSelect(COMPANY_INDUSTRY_TYPES(), attrs);
      }

      case 'location': {
        return this.renderSelect(COUNTRIES, attrs);
      }

      case 'businessType': {
        return this.renderSelect(COMPANY_BUSINESS_TYPES, attrs);
      }

      case 'html': {
        return this.renderHtml();
      }

      case 'customer': {
        return this.renderCustomer(attrs);
      }

      case 'list': {
        return this.renderList(attrs);
      }

      case 'objectList': {
        return this.renderObjectList(attrs);
      }

      case 'map': {
        return this.renderMap(attrs);
      }

      default:
        try {
          return this.renderInput(attrs);
        } catch {
          return this.renderInput(attrs, true);
        }
    }
  }

  render() {
    const { field, hasLogic } = this.props;

    return (
      <FormGroup>
        <ControlLabel ignoreTrans={true} required={field.isRequired}>
          {field.text}
        </ControlLabel>
        {hasLogic && <LogicIndicator>Logic</LogicIndicator>}
        {field.description ? <p>{field.description}</p> : null}

        {this.renderControl()}
      </FormGroup>
    );
  }
}
