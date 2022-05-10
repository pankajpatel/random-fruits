import { PalletteIdentifiers } from '../style/tokens';

export const getBadgeColorForStatus = (status: Status): PalletteIdentifiers => {
  switch (status) {
    case 'paid':
      return 'success';
    case 'ready':
    case 'in_progress':
      return 'info';
    case 'default':
      return 'error';
    case 'not_started':
    default:
      return 'default';
  }
};
