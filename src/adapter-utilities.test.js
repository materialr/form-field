import adapterUtilities from './adapter-utilities';

const adapterUtilitiesInstance = adapterUtilities();

test('\'activateInputRipple()\' activates the input ripple on the input element', () => {
  const ACTIVATE_ELEMENT_INPUT_RIPPLE = jest.fn();
  const expected = 1;

  adapterUtilitiesInstance.activateInputRipple(ACTIVATE_ELEMENT_INPUT_RIPPLE)();
  const actual = ACTIVATE_ELEMENT_INPUT_RIPPLE.mock.calls.length;

  expect(actual).toBe(expected);
});

test('\'deactivateInputRipple()\' deactivates the input ripple on the input element', () => {
  const DEACTIVATE_ELEMENT_INPUT_RIPPLE = jest.fn();
  const expected = 1;

  adapterUtilitiesInstance.deactivateInputRipple(DEACTIVATE_ELEMENT_INPUT_RIPPLE)();
  const actual = DEACTIVATE_ELEMENT_INPUT_RIPPLE.mock.calls.length;

  expect(actual).toBe(expected);
});

test('\'deregisterInteractionHandler()\' removes an event listener from the element', () => {
  const HANDLER = 'HANDLER';
  const REMOVE_EVENT_LISTENER = jest.fn();
  const TYPE = 'TYPE';
  const element = { removeEventListener: REMOVE_EVENT_LISTENER };

  adapterUtilitiesInstance.deregisterInteractionHandler(element)(TYPE, HANDLER);

  expect(REMOVE_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER);
});

test('\'registerInteractionHandler()\' adds a non-passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'TYPE';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  adapterUtilitiesInstance.registerInteractionHandler(element)(TYPE, HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, null);
});

test('\'registerInteractionHandler()\' adds a passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'touchstart';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  adapterUtilitiesInstance.registerInteractionHandler(element)(TYPE, HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, { passive: true });
});
