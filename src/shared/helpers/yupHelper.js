import * as yup from "yup";

import { FormattedMessage } from "react-intl";

const isRequiredErrorMessage = <FormattedMessage id="field.required" />;
const tooLongErrorMessage = <FormattedMessage id="field.too.long" />;
const tooShortErrorMessage = <FormattedMessage id="field.too.short" />;

const regexForSpecialCharacters = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

export const validationTemplates = {
  validateSingleTextField: yup
    .string()
    .trim()
    .min(3, tooShortErrorMessage)
    .max(40, tooLongErrorMessage)
    .required(isRequiredErrorMessage),
  validateMultilineTextField: yup
    .string()
    .trim()
    .min(1, tooShortErrorMessage)
    .max(300, tooLongErrorMessage)
    .required(isRequiredErrorMessage),
  validateNumberField: yup
    .number()
    .max(1000000000, tooLongErrorMessage)
    .required(),
  validateDateField: yup.date().required(),
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
