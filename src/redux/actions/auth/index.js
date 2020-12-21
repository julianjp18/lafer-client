export const START_SIGN_IN = 'START_SIGN_IN';
export const SUCCESS_SIGN_IN = 'SUCCESS_SIGN_IN';

export const startSignIn = payload => ({
    type: START_SIGN_IN,
    ...payload,
});

export const succesSignIn = payload => ({
    type: SUCCESS_SIGN_IN,
    ...payload,
});