import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";

import { TagCloud } from "react-tagcloud";

const data = [
  { value: "JavaScript", count: 38 },
  { value: "React", count: 30 },
  { value: "Nodejs", count: 28 },
  { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 },
  { value: "MongoDB", count: 18 },
  { value: "CSS3", count: 20 },
  { value: "New", count: 45 },
];

const Cloud = () => {
  return (
    <Row
      style={{ minHeight: "20rem" }}
      className="themeClass shadow rounded col-11 p-4 d-flex align-items-center"
    >
      <TagCloud
        minSize={12}
        maxSize={50}
        tags={data}
        onClick={(tag) => alert(`'${tag.value}' was selected!`)}
      />
    </Row>
  );
};

export default Cloud;
