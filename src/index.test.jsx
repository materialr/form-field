import { mount, shallow } from 'enzyme';
import React from 'react';

import formFieldFoundation from './foundation';
import FormField from './index';

const HTML_FOR = 'HTML_FOR';
const LABEL = 'LABEL';

test('<FormField /> > Renders only default classNames', () => {
  const wrapper = shallow(
    <FormField htmlFor={HTML_FOR} label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const expected = 'mdc-form-field';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('<FormField /> > Renders extra classNames based on props', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(
    <FormField alignEnd className={CLASS_NAME} htmlFor={HTML_FOR} label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const expected = `mdc-form-field mdc-form-field--align-end ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('<FormField /> > Adds the default foundation', () => {
  const RIPPLE_ACTIVATE = () => 'RIPPLE_ACTIVATE';
  const RIPPLE_DEACTIVATE = () => 'RIPPLE_DEACTIVATE';
  const wrapper = mount(
    <FormField
      htmlFor={HTML_FOR}
      label={LABEL}
      rippleActivate={RIPPLE_ACTIVATE}
      rippleDeactivate={RIPPLE_DEACTIVATE}
    />,
  );
  const instance = wrapper.instance();
  const expected = formFieldFoundation({
    activateElementInputRipple: RIPPLE_ACTIVATE,
    deactivateElementInputRipple: RIPPLE_DEACTIVATE,
    elementLabel: instance.elementLabel,
  });
  expected.init();

  const actual = instance.formFieldFoundation;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});

test('<FormField /> > Destroys the default foundation when the component unmounts', () => {
  const wrapper = mount(<FormField htmlFor={HTML_FOR} label={LABEL} />);
  const instance = wrapper.instance();
  instance.formFieldDestroy = jest.fn();

  wrapper.unmount();

  expect(instance.formFieldDestroy).toHaveBeenCalledTimes(1);
});

test('<FormField /> > Creates the foundation on mount', () => {
  const formFieldCreate = jest.fn();
  const wrapper = shallow(
    <FormField htmlFor={HTML_FOR} label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = 1;
  instance.formFieldCreate = formFieldCreate;

  instance.componentDidMount();
  const actual = formFieldCreate.mock.calls.length;

  expect(actual).toBe(expected);
});

test('<FormField /> > Destroys the foundation on unmount', () => {
  const formFieldDestroy = jest.fn();
  const wrapper = shallow(
    <FormField htmlFor={HTML_FOR} label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expectedFormFieldDestroy = 1;
  const expectedFoundation = undefined;
  instance.formFieldDestroy = formFieldDestroy;

  instance.componentWillUnmount();
  const actualFormFieldDestroy = formFieldDestroy.mock.calls.length;
  const actualFoundation = instance.formFieldFoundation;

  expect(actualFormFieldDestroy).toBe(expectedFormFieldDestroy);
  expect(actualFoundation).toBe(expectedFoundation);
});

test('<FormField /> > formFieldDestroy() destroys the foundation', () => {
  const destroy = jest.fn();
  const wrapper = shallow(
    <FormField htmlFor={HTML_FOR} label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = 1;
  instance.formFieldFoundation = { destroy };

  instance.formFieldDestroy();
  const actual = destroy.mock.calls.length;

  expect(actual).toBe(expected);
});
