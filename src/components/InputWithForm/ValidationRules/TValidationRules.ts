let email = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
let password = new RegExp(
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
);
const TValidationRules = {
  emailValidation: {
    value: email,
    message: 'Email is invalid',
  },
  passwordValidation: {
    value: password,
    message: 'Password is invalid',
  },
};

export { TValidationRules };
