import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const SelectLanguage = () => {
  const handleChangingTheme = (e) => {
    const isChecked = e.target.checked;
    if (isChecked);
    else {
    }
  };

  return (
    <Form.Select style={{ maxWidth: "max-content" }} className="py-0">
      <option value="PL">PL</option>
      <option value="EN">EN</option>
    </Form.Select>
  );
};
export default SelectLanguage;
