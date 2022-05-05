import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";

const FieldsNames = ({
  amount,
  name,
  setValue,
  fieldsNamesList,
  error,
  setTouched,
  isTouched,
}) => {
  const changeFieldName = (index, event) => {
    setTouched(name);
    const enteredCustomFieldName = event.target.value.trim();
    fieldsNamesList[index] = enteredCustomFieldName;
    setValue(name, fieldsNamesList);
  };

  return (
    <Fragment>
      {Array.from(new Array(+amount), (_, i) => (
        <Form.Group key={i} className="mb-3" controlId={name + i}>
          <Form.Label>Custom Field Name*</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name={name + i}
            value={fieldsNamesList[i]}
            onChange={changeFieldName.bind(null, i)}
            isInvalid={
              fieldsNamesList[i].length > 30 || fieldsNamesList[i].length === 1
            }
            isValid={
              fieldsNamesList[i].length < 30 && fieldsNamesList[i].length > 1
            }
          />
          <Form.Control.Feedback type="invalid">
            Invalid input
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
        </Form.Group>
      ))}

      {isTouched && error && (
        <Form.Text className="d-block mb-3 text-center">
          Name must have at least 2 and less than 30 characters.
        </Form.Text>
      )}
    </Fragment>
  );
};

export default FieldsNames;
