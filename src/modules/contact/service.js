import request from 'src/utils/fetch';

export const getContacts = () => request.get(`messages/contact`);
