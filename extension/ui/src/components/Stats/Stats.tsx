import * as React from "react";
import * as cn from "classnames";

import {
  ILogState,
  IConnectedState,
  ILogEntry,
  LogTypes
} from "../../../../shared/types";
const style = require("./Stats.css");

export interface IStatsProps {
  log: ILogState;
  connected: IConnectedState;
  onUnConfigure: () => any;
}

function logClassName(type: LogTypes) {
  const classnames = [style.log];

  if (type === LogTypes.Error) {
    classnames.push(style.error);
  } else if (type === LogTypes.Warning) {
    classnames.push(style.warning);
  }

  return cn(classnames);
}

export default class Stats extends React.Component<IStatsProps> {
  constructor(props: IStatsProps) {
    super(props);

    this.onUnConfigureClicked = this.onUnConfigureClicked.bind(this);
  }

  onUnConfigureClicked(e: any): void {
    e.preventDefault();

    this.props.onUnConfigure();
  }

  render() {
    const { connected, log } = this.props;

    return (
      <div>
        <div className={style.statusContainer}>
          Status: {connected.isConnected ? "Connected" : "Disconnected"}{" "}
          &nbsp;&nbsp;
          <button type="button" onClick={this.onUnConfigureClicked}>
            Exit
          </button>
        </div>
        <div className={style.logContainer}>
          <div className={style.logs}>
            {log.logs.map((log: ILogEntry) => (
              <div className={logClassName(log.type)} key={log.time.toString()}>
                [{new Date(log.time).toUTCString()}] {log.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
