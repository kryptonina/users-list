const initialState = {
  loading: false,
  list: [],
  filteredList: [],
  searchName: "",
  filters: {
    name: "",
    dateSortDirection: "none",
    active: false
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "loading-start":
      return {
        ...state,
        loading: true
      };
    case "loading-complete":
      return {
        ...state,
        loading: false
      };
    case "set-list":
      return {
        ...state,
        list: action.payload,
        filteredList: action.payload
      };
    case "change-filter":
      const { filters, list } = state;
      const newFilters = { ...filters };
      const { filter, value } = action.payload;
      newFilters[filter] = value;
      const getFilteredList = () => {
        const sortByDate = (list, value) => {
          list.sort((a, b) => {
            if (value === "asc") {
              return a.created_at - b.created_at;
            }
            if (value === "desc") {
              return b.created_at - a.created_at;
            }
            return 0;
          });
          return list;
        };
        const filterList = (list) => {
          const activeChecked = filter === "active" ? value : filters.active;
          const search = filter === "name" ? value : filters.name;
          if (activeChecked === true || search !== "") {
            const pattern = new RegExp(`^${search}`, "i");
            return list.filter((item) => {
              const matchName =
                search === "" ||
                item.first_name.match(pattern) ||
                item.last_name.match(pattern);
              const isActive = !activeChecked || item.is_active;
              return matchName && isActive;
            });
          }
          return list;
        };
        let newFilteredList = filterList([...list]);
        const direction =
          filter === "dateSortDirection" ? value : filters.dateSortDirection;
        if (["asc", "desc"].includes(direction)) {
          newFilteredList = sortByDate(newFilteredList, direction);
        }
        return newFilteredList;
      };

      return {
        ...state,
        filters: newFilters,
        filteredList: getFilteredList()
      };
    default:
      return state;
  }
};

export default reducer;
