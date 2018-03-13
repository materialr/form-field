const PASSIVE_EVENT_LISTENERS = ['touchstart'];

export default () => ({
  activateInputRipple: activateElementInputRipple => () =>
    activateElementInputRipple && activateElementInputRipple(),
  deactivateInputRipple: deactivateElementInputRipple => () =>
    deactivateElementInputRipple && deactivateElementInputRipple(),
  deregisterInteractionHandler: element =>
    (type, handler) => element.removeEventListener(type, handler),
  registerInteractionHandler: element => (type, handler) =>
    element.addEventListener(
      type,
      handler,
      PASSIVE_EVENT_LISTENERS.includes(type) ? { passive: true } : null,
    ),
});
