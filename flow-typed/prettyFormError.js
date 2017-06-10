interface IprettyError {
  classError: string;
  elementError: string;
  positionMethod: string;
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
