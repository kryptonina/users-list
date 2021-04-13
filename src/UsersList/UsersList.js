import React from "react";
import "./UsersList.css";
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Card,
  CardContent
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const filteredList = useSelector((state) => state.filteredList);

  const changeOnlyActive = (event) => {
    dispatch({
      type: "change-filter",
      payload: { filter: "active", value: event.target.checked }
    });
  };
  const changeSortByCreatedAt = (event) => {
    dispatch({
      type: "change-filter",
      payload: { filter: "dateSortDirection", value: event.target.value }
    });
  };

  const changeSearchName = (event) => {
    dispatch({
      type: "change-filter",
      payload: { filter: "name", value: event.target.value }
    });
  };

  const clearSearch = () => {
    dispatch({ type: "change-filter", payload: { filter: "name", value: "" } });
  };

  const renderItem = (item) => {
    const { first_name, last_name, created_at } = item;
    const date = new Date(created_at);

    return (
      <Card key={item.id} className="user">
        <CardContent>
          {`${last_name} ${first_name}, ${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="list-container">
      <div className="filters">
        <div className="filter">
          <FormControl className={`name ${filters.name === "" ? "empty" : ""}`}>
            <InputLabel id="search-label">Поиск по имени/фамилии</InputLabel>
            <Input
              value={filters.name}
              onChange={changeSearchName}
              onKeyUp={(event) => {
                if (event.code === "Escape") clearSearch();
              }}
              labelId="search-label"
            />
          </FormControl>
          {filters.name !== "" ? (
            <Close onClick={clearSearch} className="close" title="Сбросить" />
          ) : null}
        </div>
        <div className="filter">
          <FormControl className="sort">
            <InputLabel id="sort-by-created-at-label">
              Сортировать по дате создания
            </InputLabel>
            <Select
              labelId="sort-by-created-at-label"
              value={filters.dateSortDirection}
              onChange={changeSortByCreatedAt}
            >
              <MenuItem value="none">Без сортировки</MenuItem>
              <MenuItem value="asc">По возрастанию</MenuItem>
              <MenuItem value="desc">По убыванию</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="filter">
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.active}
                onChange={changeOnlyActive}
                name="activeUsers"
                color="primary"
              />
            }
            label="Показать только активных пользователей"
          />
        </div>
      </div>
      <div className="list">
        {filteredList.length > 0 ? (
          filteredList.map((item) => renderItem(item))
        ) : (
          <div>Ничего не найдено</div>
        )}
      </div>
    </div>
  );
};
