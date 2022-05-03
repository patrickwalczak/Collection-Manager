import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Item from "./Item";
import Heading from "./Heading";

const CollectionView = () => {
  return (
    <Table variant="dark" responsive className="mt-5">
      <thead>
        <tr>
          <Heading></Heading>
          <Heading></Heading>
          <Heading></Heading>
          <Heading></Heading>
        </tr>
      </thead>
      <tbody>
        <Item></Item>
      </tbody>
    </Table>
  );
};

export default CollectionView;
