import { FileUploader } from "react-drag-drop-files";

const UploadImageForm = ({ setFile }) => {
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
};

export default UploadImageForm;
