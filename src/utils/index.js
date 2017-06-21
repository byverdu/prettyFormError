// 
/* global IprettyError */

/**
 * Assignement a default value and checking valid one for positionMethod prop
 * @param {string} [userValue='afterend'] user value
 * @returns {string} value for positionMethod prop
 */
const _valuePositonChecker = ( userValue = 'afterend' ) => {
  const notFound = [ 'beforebegin', 'afterend' ].indexOf( userValue.toLowerCase()) === -1;
  if ( notFound ) {
    console.warn( 'positionMethod prop value should be "beforebegin" or "afterend", a default "afterend" value has been assigned' );
  }
  return notFound ?
    'afterend' :
    userValue.toLowerCase();
};

export const utils = {
    /** Setting defualt properties values if user
   *  doesn't specify them
   * @param {IprettyError} options Object implementing IprettyError
   * @returns {void}
   */
  _setOpts: ( options = {}) => {
    const tempFadeOpt = {fadeOut: false, fadeOutOpts: ''};
    const tempMulti = {enabled: false, selector: '.multiCheckbox'};
    const callToAction = options.callToAction || 'button';
    const elementError = options.elementError || 'div';
    const classError = options.classError || 'prettyFormError';
    const positionMethod = _valuePositonChecker( options.positionMethod );
    const focusErrorOnClick = options.focusErrorOnClick || true;
    const fadeOutError = options.fadeOutError || tempFadeOpt;
    const multiCheckbox = options.multiCheckbox || tempMulti;

    return {
      callToAction,
      elementError,
      classError,
      positionMethod,
      focusErrorOnClick,
      fadeOutError,
      multiCheckbox
    };
  }
};
