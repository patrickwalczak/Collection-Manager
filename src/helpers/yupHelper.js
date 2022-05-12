import * as yup from "yup";

const checkQuestionErrorMessage = "You have to choose one option";
const isRequiredErrorMessage = "Field is required!";
const tooLongErrorMessage = "Input is too long!";
const tooShortErrorMessage = "Input is too short!";

const regexForSpecialCharacters = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

export const validationTemplates = {
  validateSingleTextField: yup
    .string()
    .trim()
    .min(3, tooShortErrorMessage)
    .max(25, tooLongErrorMessage)
    .required(isRequiredErrorMessage),
  validateMultilineTextField: yup
    .string()
    .trim()
    .min(1, tooShortErrorMessage)
    .max(300, tooLongErrorMessage)
    .required(isRequiredErrorMessage),
  validateNumberField: yup.number().max(15, tooLongErrorMessage).required(),
  validateDateField: yup.date().required(),
  validateRadioField: yup.string().required(checkQuestionErrorMessage),
  validateCustomFieldsNames: yup.array().test({
    message: "Custom fields names cannot be empty!",
    test: (fieldsNames) =>
      fieldsNames.every((fieldName) => fieldName !== undefined),
  }),
  validatePassword: yup
    .string()
    .trim()
    .min(2, tooShortErrorMessage)
    .max(15, tooLongErrorMessage)
    .required(isRequiredErrorMessage),
  validateEmail: yup.string().email().required(isRequiredErrorMessage),
};
