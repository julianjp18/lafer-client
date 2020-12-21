import { createSelector } from 'reselect';

export const feedbackLoaderActiveSelector = (state) =>
  state.feedback.loaderActive;
export const feedbackModalContentSelector = (state) =>
  state.feedback.modalContent;
export const feedbackModalPorpsSelector = (state) => state.feedback.modalProps;
export const feedbackModalConfigurationsSelector = (state) =>
  state.feedback.modalConfigurations;

export const feedbackModalFetcher = (
  modalContent,
  modalProps,
  modalConfigurations
) => ({
  modalContent,
  modalProps,
  modalConfigurations,
});

export const feedbackModalSelector = createSelector(
  feedbackModalContentSelector,
  feedbackModalPorpsSelector,
  feedbackModalConfigurationsSelector,
  feedbackModalFetcher
);
