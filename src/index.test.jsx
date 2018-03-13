import { shallow } from 'enzyme';
import React from 'react';

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
    <FormField alignLeft className={CLASS_NAME} htmlFor={HTML_FOR} label={LABEL} />,
    { disableLifecycleMethods: true },
  );
  const expected = `mdc-form-field mdc-form-field--align-left ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});
