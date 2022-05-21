import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

import { FormattedMessage } from "react-intl";

const SwitchThemeButton = ({ theme, changeTheme }) => {
  const handleChangingTheme = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) changeTheme("dark");
    else {
      changeTheme("light");
    }
  };

  return (
    <Form.Group className="px-2">
      <Form.Check
        className="text-white"
        defaultChecked={theme === "dark"}
        onChange={handleChangingTheme}
        type="switch"
        id="dark-mode"
        label={<FormattedMessage id="app-navigation.darkmode.button" />}
      />
    </Form.Group>
  );
};
export default SwitchThemeButton;
