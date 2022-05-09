import { PalletIdentifiers } from '../style/tokens';
/*
ready
not_started
paid
in_progress
default
*/
export const getBadgeColorForStatus = (status: Status): PalletIdentifiers => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'paid':
      return 'success';
    case 'ready':
    case 'in_progress':
      return 'info';
    case 'cancelled':
    case 'default':
      return 'error';
    case 'not_started':
    default:
      return 'default';
  }
};
