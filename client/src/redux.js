import rootReducer from "./store/reducers/rootReducers";
import { persistStore } from "redux-persist";
import { createStore } from "redux";

const reduxStore = () => {
  const store = createStore(rootReducer); // hôm sau sẽ thêm middle ở đây
  const persistor = persistStore(store);

  return { store, persistor };
};

export default reduxStore;
