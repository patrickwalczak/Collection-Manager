import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomItemQuestion = ({
  name,
  setValue,
  setTouched,
  options,
  question,
  errors,
  touched,
}) => {
  return (
    <Form.Group
      onChange={(e) => {
        setValue(name, e.target.value);
        setTouched(name, e.target.value);
      }}
      controlId={name}
    >
      <Form.Label>{question}</Form.Label>

      {options.map((item) => (
        <Form.Check name={name} key={item.value} {...item} type="radio" />
      ))}
      {!errors[name] && touched[name] && (
        <div style={{ display: "block" }} className="valid-feedback">
          Looks good!
        </div>
      )}
      {errors[name] && touched[name] && (
        <div style={{ display: "block" }} className="invalid-feedback">
          {errors[name]}
        </div>
      )}
    </Form.Group>
  );
};

export default CustomItemQuestion;
