interface IprettyError {
  classError: string;
  elementError: string;
  positionMethod: string | 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';
  multiCheckbox: {
    enabled: boolean;
    selector: string;
  };
  callToAction: string;
  fadeOutError: {
    fadeOut: boolean;
    fadeOutOpts: string
  };
}

export type { IprettyError };
