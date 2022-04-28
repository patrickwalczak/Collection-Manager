import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import SelectTopic from "./SelectTopic";

const CollectionTopic = ({
  name,
  errors,
  touched,
  setFieldError,
  setFieldTouched,
  setFieldValue,
  value,
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>Collection Topic*</Form.Label>
      <SelectTopic
        name={name}
        onBlur={setFieldError}
        onChange={setFieldValue}
        value={value}
        onTouch={setFieldTouched}
      />
      {!errors?.collectionTopic && touched.collectionTopic && (
        <div style={{ display: "block" }} className="valid-feedback">
          Looks good!
        </div>
      )}
      {errors.collectionTopic && touched.collectionTopic && (
        <div style={{ display: "block" }} className="invalid-feedback">
          {errors.collectionTopic}
        </div>
      )}
    </Form.Group>
  );
};

export default CollectionTopic;
