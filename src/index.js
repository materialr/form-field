import { MDCFormFieldAdapter } from '@material/form-field';

import adapterUtilities from './adapter-utilities';

export default ({
  activateElementInputRipple,
  deactivateElementInputRipple,
  elementLabel,
}) => {
  const {
    activateInputRipple,
    deactivateInputRipple,
    deregisterInteractionHandler,
    registerInteractionHandler,
  } = adapterUtilities();

  return new MDCFormFieldAdapter({
    activateInputRipple: activateInputRipple(activateElementInputRipple),
    deactivateInputRipple: deactivateInputRipple(deactivateElementInputRipple),
    deregisterInteractionHandler: deregisterInteractionHandler(elementLabel),
    registerInteractionHandler: registerInteractionHandler(elementLabel),
  });
};
