import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Store } from "react-chrome-redux";

import { IState } from "../../shared/types";
import { PORT_NAME } from "../../shared/constants";
import App from "./components/App/App";

const store = new Store<IState>({ portName: PORT_NAME });

store.ready(function() {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("app")
  );
});
