import React, { useRef, useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";

const UploadImageForm = ({ file, setFile }) => {
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

  const uploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);

    // try {
    //   const response = await sendRequest(
    //     `${process.env.REACT_APP_BACKEND_URL}/collections/uploadImage`,
    //     {
    //       method: "POST",
    //       body: formData,
    //     }
    //   );
    //   console.log(response);
    //   if (!response) throw "";
    // } catch (err) {}
  };

  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
};

export default UploadImageForm;
