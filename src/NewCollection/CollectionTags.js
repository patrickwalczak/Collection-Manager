import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import SelectTags from "./SelectTags";

const CollectionTags = ({
  name,
  setTags,
  tagsList,
  setError,
  onTouch,
  errors,
  touched,
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>Collection Tags*</Form.Label>
      <SelectTags
        name={name}
        setTags={setTags}
        tagsList={tagsList}
        setError={setError}
        onTouch={onTouch}
      />
      {!errors?.collectionTags && touched.collectionTags && (
        <div style={{ display: "block" }} className="valid-feedback">
          Looks good!
        </div>
      )}
      {errors.collectionTags && touched.collectionTags && (
        <div style={{ display: "block" }} className="invalid-feedback">
          {errors.collectionTags}
        </div>
      )}
    </Form.Group>
  );
};

export default CollectionTags;
