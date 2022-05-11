import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const CustomItemQuestion = ({
  name,
  setValue,
  setTouched,
  options,
  question,
  errors,
  touched,
  value: chosenOption,
  fieldsNamesId,
  fieldsNamesList,
  isDisabled,
}) => {
  const changeOption = (e) => {
    const newChosenOption = +e.target.value;
    setValue(name, newChosenOption);
    setTouched(name);

    // chosen option = 0, then returns empty array
    if (!newChosenOption) return setValue(fieldsNamesId, []);

    // chosen option is zero or empty, then fill array depends on chosen option (init)
    if (newChosenOption && chosenOption === "") {
      return setValue(
        fieldsNamesId,
        Array.from(new Array(newChosenOption), () => "")
      );
    }

    if (newChosenOption > chosenOption) {
      const numOfNewElements = newChosenOption - fieldsNamesList.length;
      const newElementsArray = Array.from(
        new Array(numOfNewElements),
        () => ""
      );
      const newFieldsNamesArray = fieldsNamesList.concat(newElementsArray);
      return setValue(fieldsNamesId, newFieldsNamesArray);
    }

    if (newChosenOption < chosenOption) {
      const numOfItemsToRemove = chosenOption - newChosenOption;
      fieldsNamesList.splice(numOfItemsToRemove - 1, numOfItemsToRemove);
      return setValue(fieldsNamesId, fieldsNamesList);
    }
  };

  return (
    <Form.Group className="mb-3" onChange={changeOption} controlId={name}>
      <Form.Label>{question}</Form.Label>
      <br></br>
      {options.map((item, index) => (
        <Form.Check
          inline
          name={name}
          checked={index === chosenOption}
          onChange={() => {}}
          key={item.value}
          {...item}
          type="radio"
          disabled={isDisabled}
        />
      ))}
      {chosenOption !== "" && (
        <div style={{ display: "block" }} className="valid-feedback">
          Looks good!
        </div>
      )}
      {errors[name] && touched[name] && chosenOption === "" && (
        <div style={{ display: "block" }} className="invalid-feedback">
          {errors[name]}
        </div>
      )}
    </Form.Group>
  );
};

export default CustomItemQuestion;
