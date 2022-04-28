import React from "react";
import { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

const SelectTopic = ({ onChange, onBlur, value, onTouch }) => {
  const [isDisabled, setDisabled] = useState(false);

  // const toggleDisabled = () => setDisabled(!isDisabled);

  const options = [
    { value: "Red", label: "Red" },
    { value: "White", label: "White" },
  ];

  const onChangeHandler = (value) => {
    if (!value) {
      onChange("collectionTopic", "");
    } else {
      onChange("collectionTopic", value.label);
    }
  };

  return (
    <Select
      placeholder="Select collection topic"
      isDisabled={isDisabled}
      isClearable={true}
      isSearchable={true}
      name="collectionTopic"
      options={options}
      onChange={onChangeHandler}
      onBlur={() => {
        onTouch("collectionTopic", true);
        if (value) return;
        onBlur("collectionTopic", "Collection topic is required");
      }}
    />
  );
};

export default SelectTopic;
