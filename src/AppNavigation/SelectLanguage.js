import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

const SelectLanguage = ({ changeLanguage, language }) => {
  return (
    <Form.Select
      onChange={(e) => changeLanguage(e.target.value)}
      style={{ maxWidth: "max-content" }}
      className="py-0"
      value={language}
    >
      <option value="EN">EN</option>
      <option value="PL">PL</option>
    </Form.Select>
  );
};
export default SelectLanguage;
