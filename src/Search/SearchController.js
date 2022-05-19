import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

import "react-bootstrap-typeahead/css/Typeahead.css";

import { useState, useEffect, useCallback } from "react";

import useHttp from "../hooks/useHttp";
import { TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

const SearchController = ({ closeModal }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const navigate = useNavigate();

  const getItems = useCallback(async (query) => {
    setIsLoading(true);
    try {
      const returnedData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/items/getFullTextSearchResults/${query}`
      );

      if (!returnedData) throw "";

      const { results } = returnedData;
      const convertedResults = results.map(({ id, name }) => ({
        id,
        name,
      }));
      console.log(convertedResults);
      setItems(convertedResults);
      setIsLoading(false);
    } catch (err) {
      setItems([]);
      setIsLoading(false);
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
    <Form.Group className="mb-3 col-12" controlId="searchItems">
      <TextField
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        fullWidth
        hiddenLabel
        id="filled-hidden-label-normal"
        variant="filled"
      />
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
    </Form.Group>
  );
};
export default SearchController;
