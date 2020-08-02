import { createSelector } from 'reselect';

export const contact = state => state.contact;
export const contactSelector = createSelector(
  contact,
  data => data.toJS()
);
