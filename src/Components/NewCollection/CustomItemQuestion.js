import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

const CustomItemQuestion = ({
  name,
  setValue,
  setTouched,
  question,
  errors,
  touched,
  value: chosenNumberOfCustomInputs,
  fieldsNamesId,
  fieldsNamesList,
  isDisabled,
}) => {
  const changeOption = (e) => {
    const newChosenNumberOfCustomInputs = +e.target.value;
    if (newChosenNumberOfCustomInputs < 0) return;
    setValue(name, newChosenNumberOfCustomInputs);
    setTouched(name);

    if (!newChosenNumberOfCustomInputs) return setValue(fieldsNamesId, []);

    if (newChosenNumberOfCustomInputs && chosenNumberOfCustomInputs === "")
      return initFieldsNames();

    if (newChosenNumberOfCustomInputs > chosenNumberOfCustomInputs)
      return addFieldsNames(newChosenNumberOfCustomInputs);

    if (newChosenNumberOfCustomInputs < chosenNumberOfCustomInputs)
      return removeFieldsNames(newChosenNumberOfCustomInputs);
  };

  const initFieldsNames = (newChosenNumberOfCustomInputs) =>
    setValue(
      fieldsNamesId,
      Array.from(new Array(newChosenNumberOfCustomInputs), () => "")
    );

  const addFieldsNames = (newChosenNumberOfCustomInputs) => {
    const numOfNewElements =
      newChosenNumberOfCustomInputs - fieldsNamesList.length;
    const newElementsArray = Array.from(new Array(numOfNewElements), () => "");
    const newFieldsNamesArray = fieldsNamesList.concat(newElementsArray);
    setValue(fieldsNamesId, newFieldsNamesArray);
  };

  const removeFieldsNames = (newChosenNumberOfCustomInputs) => {
    const numOfItemsToRemove =
      chosenNumberOfCustomInputs - newChosenNumberOfCustomInputs;
    const deleteStartPoint = fieldsNamesList.length - numOfItemsToRemove;
    fieldsNamesList.splice(deleteStartPoint, numOfItemsToRemove);
    setValue(fieldsNamesId, fieldsNamesList);
  };

  return (
    <Form.Group className="mb-3" onChange={changeOption} controlId={name}>
      <Form.Label>{question}</Form.Label>
      <Form.Control
        disabled={isDisabled}
        onChange={changeOption}
        name={name}
        type="number"
        min="0"
        step="1"
        defaultValue={chosenNumberOfCustomInputs}
      />
      {chosenNumberOfCustomInputs !== "" && (
        <div style={{ display: "block" }} className="valid-feedback">
          Looks good!
        </div>
      )}
      {errors[name] && touched[name] && chosenNumberOfCustomInputs === "" && (
        <div style={{ display: "block" }} className="invalid-feedback">
          {errors[name]}
        </div>
      )}
    </Form.Group>
  );
};

export default CustomItemQuestion;
