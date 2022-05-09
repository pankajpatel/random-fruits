export type PalletIdentifiers =
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'default';

export const Palette = {
  success: {
    light: '#e6fffa',
    main: '#b2ebf2',
    dark: '#00e676',
  },
  info: {
    light: '#e3f2fd',
    main: '#bbdefb',
    dark: '#01579b',
  },
  warning: {
    light: '#fffde7',
    main: '#fff9c4',
    dark: '#ffb74d',
  },
  error: {
    light: '#fce4ec',
    main: '#f8bbd0',
    dark: '#f44336',
  },
  default: {
    light: '#fafafa',
    main: '#eeeeee',
    dark: '#dddddd',
  },
};
