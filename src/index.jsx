import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '@material/form-field/mdc-form-field.scss';

import formFieldFoundation from './foundation';

const getClassNames = (alignEnd, className) => classnames({
  'mdc-form-field': true,
  'mdc-form-field--align-end': alignEnd,
  [className]: !!className,
});

class FormField extends React.Component {
  constructor(props) {
    super(props);
    this.elementLabel = undefined;
    this.formFieldFoundation = undefined;
    this.formFieldCreate = this.formFieldCreate.bind(this);
    this.formFieldDestroy = this.formFieldDestroy.bind(this);
  }
  componentDidMount() {
    this.formFieldCreate();
  }
  componentWillUnmount() {
    this.formFieldDestroy();
  }
  formFieldCreate() {
    const { rippleActivate, rippleDeactivate } = this.props;
    this.formFieldFoundation = formFieldFoundation({
      activateElementInputRipple: rippleActivate,
      deactivateElementInputRipple: rippleDeactivate,
      elementLabel: this.elementLabel,
    });
    this.formFieldFoundation.init();
  }
  formFieldDestroy() {
    this.formFieldFoundation.destroy();
    this.formFieldFoundation = undefined;
  }
  render() {
    const { alignEnd, children, className, htmlFor, label } = this.props;
    return (
      <div className={getClassNames(alignEnd, className)}>
        {children}
        <label
          className="mdc-form-field__label"
          htmlFor={htmlFor}
          ref={(elementLabel) => { this.elementLabel = elementLabel; }}
        >
          {label}
        </label>
      </div>
    );
  }
}

FormField.propTypes = {
  alignEnd: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rippleActivate: PropTypes.func,
  rippleDeactivate: PropTypes.func,
};

FormField.defaultProps = {
  alignEnd: false,
  children: undefined,
  className: undefined,
  rippleActivate: undefined,
  rippleDeactivate: undefined,
};

export default FormField;
