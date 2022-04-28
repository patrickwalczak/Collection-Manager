import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const SelectTags = ({ name, setTags, tagsList, onTouch, setError }) => {
  const inputName = name;

  const addTagHandler = (newTags) => {
    // if method is triggered, then I want set this input to be touched
    onTouch(inputName, true);

    setTags(inputName, newTags);
  };

  return (
    <ReactTagInput
      placeholder="Type your tag and press enter"
      name={inputName}
      tags={tagsList}
      onChange={addTagHandler}
      validator={(newTag) => {
        const isDuplicated = tagsList.find(
          (t) => t.toLowerCase() === newTag.toLowerCase()
        );

        if (isDuplicated)
          return setError(inputName, "You have already this tag");
        if (!newTag.trim().length)
          return setError(inputName, "Tag cannot be empty");
        return newTag;
      }}
    />
  );
};

export default SelectTags;
