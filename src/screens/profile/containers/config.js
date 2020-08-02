import {grey5} from 'src/components/config/colors';

const listIcon = {
  setting: ['settings', 'help-circle', 'phone-call', 'log-out'],
  info: ['user', 'file-text', 'message-square', 'download'],
};

export const icon = (visit=0, type='setting') => {
  const name = listIcon[type] && listIcon[type][visit] ?
    listIcon[type][visit]
    : 'settings'
  ;
  return {
    name,
    size: 18,
    color: grey5,
  }
};

export const titleProps = {
  medium: true,
};
