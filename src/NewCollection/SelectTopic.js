import React from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

const SelectTopic = ({
  setValue,
  setError,
  value,
  setTouched,
  error,
  isTouched,
  name,
}) => {
  const options = [
    { value: "Red", label: "Red" },
    { value: "White", label: "White" },
    { value: "Yellow", label: "Yellow" },
    { value: "Black", label: "Black" },
    { value: "Blue", label: "Blue" },
  ];

  const changeSelect = (selectedTopic) => {
    if (!selectedTopic) {
      setValue(name, "");
      setError(name, "Collection topic is required");
    } else {
      setValue(name, selectedTopic.label);
    }
  };

  // defaultValue equals empty string if no option was chosen
  const defaultValue = !value ? "" : options.find((o) => o.label === value);

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
      options={options}
      onChange={changeSelect}
      onFocus={() => setTouched(name)}
    />
  );
};

export default SelectTopic;
