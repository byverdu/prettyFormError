type Positions = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';

interface IprettyError {
  classError: string;
  elementError: string;
  positionMethod: Positions;
  multiCheckbox: {
    enabled: boolean;
    selector: string;
  };
  callToAction: string;
  fadeOutError: {
    fadeOut: boolean;
    timer: number
  };
  focusErrorOnClick: boolean;
}

export type { IprettyError };
