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
}) => {
  const options = [
    { value: "Red", label: "Red" },
    { value: "White", label: "White" },
    { value: "Yellow", label: "Yellow" },
    { value: "Black", label: "Black" },
    { value: "Blue", label: "Blue" },
  ];

  const changeSelect = (selectedTopic) => {
    console.log(selectedTopic);
    setTouched("collectionTopic");
    if (!selectedTopic) {
      setValue("collectionTopic", "");
    } else {
      setValue("collectionTopic", selectedTopic.label);
    }
  };

  const blurSelect = () => {
    setTouched("collectionTopic");
    if (value) return;
    setError("collectionTopic", "Collection topic is required");
  };

  // defaultValue equals empty string if no option was chosen
  const defaultValue = !value ? "" : options.find((o) => o.label === value);

  const validStyle = defaultValue ? "form-control p-0 is-valid" : "";
  const invalidStyle = error && isTouched ? "form-control p-0 is-invalid" : "";

  return (
    <Select
      className={`${validStyle} ${invalidStyle}`}
      defaultValue={defaultValue}
      placeholder="Select collection topic"
      isClearable={true}
      isSearchable={true}
      name="collectionTopic"
      options={options}
      onChange={changeSelect}
      onBlur={blurSelect}
    />
  );
};

export default SelectTopic;
