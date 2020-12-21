import { createSelector } from 'reselect';

export const docsSelector = (state) => state.docsList;
export const docsKindSelector = (state, kind) =>
  state.docsList.kind === kind ? state.docsList.docs : [];

export const docsListSelector = createSelector(docsSelector, docsKindSelector);
