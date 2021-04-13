import React from "react";
import "./styles.css";
import { Button, CircularProgress } from "@material-ui/core";
import UsersList from "./UsersList/UsersList";
import { fetchData } from "./mockData";
import { useSelector, useDispatch } from "react-redux";

export default function App() {
  const loading = useSelector((state) => state.loading);
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const loadData = async () => {
    dispatch({ type: "loading-start" });
    dispatch({ type: "set-list", payload: await fetchData() });
    dispatch({ type: "loading-complete" });
  };

  return (
    <div className="app">
      {list.length === 0 ? (
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={loadData}
        >
          Загрузить список
        </Button>
      ) : null}
      {loading ? <CircularProgress className="loading" /> : null}
      {list.length > 0 ? <UsersList /> : null}
    </div>
  );
}
