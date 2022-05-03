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
  value,
}) => {
  return (
    <Form.Group
      className="mb-3"
      onChange={(e) => {
        setValue(name, e.target.value);
        setTouched(name);
      }}
      controlId={name}
    >
      <Form.Label>{question}</Form.Label>

      {options.map((item, index) => (
        <Form.Check
          defaultChecked={index === +value ? value : ""}
          name={name}
          key={item.value}
          {...item}
          type="radio"
        />
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
