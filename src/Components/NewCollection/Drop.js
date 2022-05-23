import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

function Drop({ name, setImg }) {
  const [file, setFile] = useState(null);
  const handleChange = (img) => {
    setFile(img);
  };

  return (
    <FileUploader
      maxSize="3"
      handleChange={handleChange}
      name={name}
      types={fileTypes}
      multiple={false}
    />
  );
}

export default Drop;
