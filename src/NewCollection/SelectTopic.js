import React from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

const SelectTopic = ({
  setValue,
  setError,
  defValue,
  setTouched,
  error,
  isTouched,
}) => {
  const options = [
    { value: "Red", label: "Red" },
    { value: "White", label: "White" },
  ];

  const changeSelect = (value) => {
    setTouched("collectionTopic");
    if (!value) {
      setValue("collectionTopic", "");
    } else {
      setValue("collectionTopic", value.label);
    }
  };

  const blurSelect = () => {
    setTouched("collectionTopic");
    if (defValue) return;
    setError("collectionTopic", "Collection topic is required");
  };

  // defaultValue equals empty string if no option was chosen
  const defaultValue = !defValue
    ? ""
    : options.find((o) => o.label === defValue);

  const isValidClass = defaultValue ? "form-control p-0 is-valid" : "";
  const isInvalidClass =
    error && isTouched ? "form-control p-0 is-invalid" : "";

  return (
    <Select
      className={`${isValidClass} ${isInvalidClass}`}
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
