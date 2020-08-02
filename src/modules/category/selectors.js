import { createSelector } from 'reselect';

export const category = state => state.category;

export const categorySelector = createSelector(
  category,
  data => data ? data.toJS(): []
);
