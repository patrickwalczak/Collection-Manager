import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { FormattedMessage } from "react-intl";

const SwitchThemeButton = ({ theme, changeTheme }) => {
  const handleChangingTheme = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) changeTheme("light");
    else {
      changeTheme("dark");
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        className="text-white"
        control={<Switch onChange={handleChangingTheme} />}
        label={<FormattedMessage id="app-navigation.darkmode.button" />}
      />
    </FormGroup>
  );
};
export default SwitchThemeButton;
