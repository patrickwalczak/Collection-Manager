import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomItemQuestion = ({
  name,
  setValue,
  setTouched,
  options,
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
    setValue(name, newChosenNumberOfCustomInputs);
    setTouched(name);

    if (!newChosenNumberOfCustomInputs) return setValue(fieldsNamesId, []);

    if (newChosenNumberOfCustomInputs && chosenNumberOfCustomInputs === "") {
      return setValue(
        fieldsNamesId,
        Array.from(new Array(newChosenNumberOfCustomInputs), () => "")
      );
    }

    if (newChosenNumberOfCustomInputs > chosenNumberOfCustomInputs)
      return addFieldsNames(newChosenNumberOfCustomInputs);

    if (newChosenNumberOfCustomInputs < chosenNumberOfCustomInputs)
      return removeFieldsNames(newChosenNumberOfCustomInputs);
  };

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
      <br></br>
      {options.map((item, index) => (
        <Form.Check
          inline
          name={name}
          checked={index === chosenNumberOfCustomInputs}
          onChange={() => {}}
          key={item.value}
          {...item}
          type="radio"
          disabled={isDisabled}
        />
      ))}
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
