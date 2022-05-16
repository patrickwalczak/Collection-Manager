import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

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
        control={<Switch onChange={handleChangingTheme} />}
        label="Dark mode"
      />
    </FormGroup>
  );
};
export default SwitchThemeButton;
