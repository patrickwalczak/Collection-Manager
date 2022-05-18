import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState, useCallback } from "react";

import useHttp from "../hooks/useHttp";

const SelectTopic = ({
  setValue,
  setError,
  value,
  setTouched,
  error,
  isTouched,
  name,
}) => {
  const defaultValue = !value ? "" : { value, label: value };
  const [topics, setTopics] = useState([]);

  const { requestError, sendRequest } = useHttp();

  const getTopics = useCallback(async () => {
    try {
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/config/topics`
      );

      if (!returnedData) throw "";

      const { topics } = returnedData;
      setTopics(topics);
    } catch (err) {}
  }, []);

  useEffect(() => {
    getTopics();
  }, [getTopics]);

  const changeSelect = (selectedTopic) => {
    setTouched(name);
    if (!selectedTopic) {
      setValue(name, "");
      setError(name, "Collection topic is required");
    } else {
      setValue(name, selectedTopic.label);
    }
  };

  const validStyle = defaultValue ? "form-control p-0 is-valid" : "";
  const invalidStyle = error && isTouched ? "form-control p-0 is-invalid" : "";

  return (
    <Select
      name={name}
      className={`${validStyle} ${invalidStyle}`}
      defaultValue={defaultValue}
      placeholder="Select collection topic"
      isClearable={true}
      isSearchable={true}
      options={topics}
      onChange={changeSelect}
      onBlur={() => setTouched(name)}
      noOptionsMessage={() => requestError || "No options"}
    />
  );
};

export default SelectTopic;
