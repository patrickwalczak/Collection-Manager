import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { useState, useEffect, useCallback, Fragment } from "react";

import { useNavigate } from "react-router-dom";

import { TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import useHttp from "../hooks/useHttp";

const SearchController = ({ closeModal }) => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

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
    } catch (err) {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    if (!query) return;
    getItems(query);
  }, [getItems, query]);

  const handleClickedResultItem = (e) => {
    const clickedItemId = e.target.closest("li").dataset.id;
    setQuery("");
    setItems([]);
    closeModal();
    navigate(`/item/${clickedItemId}`);
  };

  return (
    <Fragment>
      <Form.Group
        className="mb-3 col-12 position-relative d-flex align-items-center"
        controlId="searchItems"
      >
        <TextField
          className="pl-4"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          fullWidth
          hiddenLabel
          id="filled-hidden-label-normal"
          variant="filled"
        />

        {requestStatus === "loading" && (
          <Spinner
            animation="border"
            size="sm"
            className="ps position-absolute"
          />
        )}
      </Form.Group>
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
    </Fragment>
  );
};
export default SearchController;