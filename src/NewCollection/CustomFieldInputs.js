import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";

const CustomFieldInputs = ({
  amount,
  name,
  setValue,
  fieldsNamesList,
  error,
  setTouched,
  isTouched,
  isDisabled,
}) => {
  const changeFieldName = (index, event) => {
    setTouched(name);
    const enteredCustomFieldName = event.target.value;
    fieldsNamesList[index] = enteredCustomFieldName;
    setValue(name, fieldsNamesList);
  };

  console.log(fieldsNamesList);

  return (
    <Fragment>
      {Array.from(new Array(+amount), (_, index) => (
        <Form.Group key={index} className="mb-3" controlId={name + index}>
          <Form.Label>Custom Field Name*</Form.Label>
          <Form.Control
            disabled={isDisabled}
            className="inputThemeClass"
            size="sm"
            type="text"
            name={name + index}
            value={fieldsNamesList[index]}
            onChange={changeFieldName.bind(null, index)}
            isInvalid={fieldsNamesList[index]?.length > 30}
            isValid={
              fieldsNamesList[index]?.length < 30 &&
              fieldsNamesList[index]?.length > 1
            }
          />
          <Form.Control.Feedback type="invalid">
            Invalid input
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
        </Form.Group>
      ))}

      {error && (
        <div
          style={{ display: "block" }}
          className="invalid-feedback text-center mb-3"
        >
          Custom fields names must have at least 2 and less than 30 characters.
        </div>
      )}
    </Fragment>
  );
};

export default CustomFieldInputs;
