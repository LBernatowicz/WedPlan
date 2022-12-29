let regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const TValidationRules = {
  emailValidation: {
    value: regex,
    message: 'Email is invalid',
  },
};

export { TValidationRules };
