// 

export const utils = {
  _valuePositonChecker: ( userValue = 'afterend' ) => {
    const notFound = [ 'beforebegin', 'afterend' ].indexOf( userValue.toLowerCase()) === -1;
    if ( notFound ) {
      console.warn( 'positionMethod prop value should be "beforebegin" or "afterend", a default "afterend" value has been assigned' );
    }
    return notFound ?
      'afterend' :
      userValue.toLowerCase();
  }
};
