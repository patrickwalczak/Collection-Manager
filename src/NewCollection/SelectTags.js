import { useState, useEffect, useCallback } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

import useHttp from "../hooks/useHttp";

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
  const [tags, setTags] = useState([]);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const getTags = useCallback(async (query) => {
    setIsLoading(true);
    try {
      const returnedData = await sendRequest(
        `http://localhost:5000/api/config/tags/${query}`
      );

      if (!returnedData) throw "";

      const { tags } = returnedData;

      setTags(tags);

      setIsLoading(false);
    } catch (err) {
      setTags([]);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!query) return;
    getTags(query);
  }, [getTags, query]);

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
        options={tags}
        placeholder="Type and choose your tags..."
        selected={value}
        isLoading={isLoading}
        isInvalid={inputIsInvalid}
        isValid={inputIsValid}
        open={!!query}
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
