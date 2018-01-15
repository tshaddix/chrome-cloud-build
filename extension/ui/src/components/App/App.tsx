import * as React from "react";
import { connect } from "react-redux";

import {
  IDispatch,
  ILogState,
  IConnectedState,
  IConfiguredState,
  IState,
  ActionTypes
} from "../../../../shared/types";
import ConfigureForm from "../ConfigureForm/ConfigureForm";
import Stats from "../Stats/Stats";

export interface IAppProps {
  dispatch: IDispatch;
  log: ILogState;
  connected: IConnectedState;
  configured: IConfiguredState;
}

class App extends React.Component<IAppProps> {
  constructor(props: IAppProps) {
    super(props);

    this.onConfigure = this.onConfigure.bind(this);
    this.onUnConfigure = this.onUnConfigure.bind(this);
  }

  onConfigure(serverRoot: string, dirName: string) {
    const { dispatch } = this.props;

    dispatch({
      type: ActionTypes.Configure,
      payload: {
        serverRoot,
        dirName
      }
    });
  }

  onUnConfigure() {
    const { dispatch } = this.props;

    dispatch({
      type: ActionTypes.UnConfigure,
      payload: {}
    });
  }

  render() {
    const { log, connected, configured } = this.props;

    return (
      <div>
        {!configured.isConfigured && (
          <ConfigureForm onConfigure={this.onConfigure} />
        )}
        {!!configured.isConfigured && (
          <Stats
            log={log}
            connected={connected}
            onUnConfigure={this.onUnConfigure}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state: IState): Partial<IAppProps> {
  return {
    log: state.log,
    connected: state.connected,
    configured: state.configured
  };
}

export default connect(mapStateToProps)(App);
