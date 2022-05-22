import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { useNavigate } from "react-router-dom";

import { useState, useEffect, useCallback, Fragment } from "react";

import useHttp from "../hooks/useHttp";

const SearchController = ({ closeModal }) => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

  const [isSearching, setIsSearching] = useState(false);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const navigate = useNavigate();

  const getItems = useCallback(async (query) => {
    try {
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/items/getFullTextSearchResults/${query}`
      );

      if (!returnedData) throw "";

      const { results } = returnedData;
      setItems(results);
      setIsSearching(false);
    } catch (err) {
      setItems([]);
      setIsSearching(false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query || query.trim().length === 0) return;
    setIsSearching(true);
  };

  useEffect(() => {
    if (!isSearching) return;
    getItems(query);
  }, [getItems, query, isSearching]);

  const hideErrorAlert = 2000;

  useEffect(() => {
    if (!requestError) return;
    setTimeout(() => resetHookState(), hideErrorAlert);
  });

  const handleClickedResultItem = (e) => {
    const clickedItemId = e.target.closest("li").dataset.id;
    setQuery("");
    setItems([]);
    closeModal();
    navigate(`/item/${clickedItemId}`);
  };

  const isDisabled = requestStatus === "loading";

  return (
    <Fragment>
      <Form
        onSubmit={handleSubmit}
        className="d-flex col-12 align-items-center"
      >
        <Form.Group
          className="themeClass mb-3 col-10 position-relative d-flex align-items-center"
          controlId="searchItems"
        >
          <TextField
            className="pl-4 bg-light"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            hiddenLabel
            id="filled-hidden-label-normal"
            variant="filled"
          />
        </Form.Group>
        <Button
          style={{ height: "56px" }}
          className="themeClass btn-light col-2 fw-bolder mb-3"
          type="submit"
          disabled={isDisabled}
        >
          {requestStatus !== "loading" && "Search"}
          {requestStatus === "loading" && <Spinner animation="border" />}
        </Button>
      </Form>
      {!!items.length && (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {items.map((item, index) => (
            <ListItem
              onClick={handleClickedResultItem}
              data-id={item.id}
              key={index}
              disablePadding
            >
              <ListItemButton>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
      {!items.length && requestStatus === "completed" && (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"NO RESULT FOUND"} />
            </ListItemButton>
          </ListItem>
        </List>
      )}
      {!!requestError && <Alert variant="danger">{requestError}</Alert>}
    </Fragment>
  );
};
export default SearchController;
