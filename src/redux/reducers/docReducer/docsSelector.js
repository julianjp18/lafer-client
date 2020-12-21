import { createSelector } from 'reselect';

export const docInfoSelector = (state) => state.doc;

export const docSelector = createSelector(docInfoSelector);
