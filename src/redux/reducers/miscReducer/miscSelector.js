import { createSelector } from 'reselect';

export const labelsSelector = (state) => state.misc.labels;

export const labelsFetcher = (labels) => ({
  labels,
});

export const miscSelector = createSelector(labelsSelector);
