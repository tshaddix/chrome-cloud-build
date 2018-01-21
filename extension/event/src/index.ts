import { wrapStore } from "react-chrome-redux";

import Store from "./store";
import { PORT_NAME } from "../../shared/constants";
import { IState } from "../../shared/types";

const store = Store();

wrapStore<IState>(store, { portName: PORT_NAME });

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({
    url: chrome.runtime.getURL("ui.html")
  });
});
