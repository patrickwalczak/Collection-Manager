import { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

const SelectTags = ({
  setValue,
  setError,
  setTouched,
  value,
  name,
  error,
  isTouched,
}) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const options = ["Red", "White", "Black", "Yellow"];

  const changeTags = (t) => {
    if (!t.length) setError(name, "Collection tags are required!");
    setTouched(name);
    setValue(name, t);
  };

  const blurTags = () => {
    setTouched(name);
    if (value.length) return;
    return setError(name, "Collection tags are required");
  };

  useEffect(() => {
    if (!query) return;
    // get results
  }, [query]);

  const inputIsInvalid = error && !value.length && isTouched ? true : false;
  const inputIsValid = !error && value.length ? true : false;

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>Collection Tags</Form.Label>
      <Typeahead
        id={name}
        multiple
        name="collectionTags"
        onChange={changeTags}
        onInputChange={setQuery}
        onBlur={blurTags}
        options={options}
        placeholder="Type and choose your tags..."
        selected={value}
        isLoading={isLoading}
        isInvalid={inputIsInvalid}
        isValid={inputIsValid}
      />
      {inputIsValid && (
        <div style={{ display: "block" }} className="valid-feedback">
          Looks good!
        </div>
      )}
      {inputIsInvalid && (
        <div style={{ display: "block" }} className="invalid-feedback">
          {error}
        </div>
      )}
    </Form.Group>
  );
};
export default SelectTags;
