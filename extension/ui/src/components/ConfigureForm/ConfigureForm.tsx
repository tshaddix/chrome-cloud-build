import * as React from "react";

export interface IConfigureFormProps {
  onConfigure: (serverRoot: string, dirName: string) => any;
}

export interface IConfigureFormState {
  serverRoot: string;
  dirName: string;
}

export default class ConfigureForm extends React.Component<
  IConfigureFormProps,
  IConfigureFormState
> {
  constructor(props: IConfigureFormProps) {
    super(props);

    this.state = {
      serverRoot: "",
      dirName: ""
    };

    this.onConfigure = this.onConfigure.bind(this);
    this.onServerRootChange = this.onServerRootChange.bind(this);
    this.onDirNameChange = this.onDirNameChange.bind(this);
  }

  onConfigure(e): void {
    e.preventDefault();

    const { serverRoot, dirName } = this.state;

    this.props.onConfigure(serverRoot, dirName);
  }

  onServerRootChange(e: any): void {
    this.setState({
      serverRoot: e.target.value || ""
    });
  }

  onDirNameChange(e: any): void {
    this.setState({
      dirName: e.target.value || ""
    });
  }

  render() {
    const { serverRoot, dirName } = this.state;

    return (
      <form onSubmit={this.onConfigure}>
        <div>
          <label>Server:</label>
          <input
            type="text"
            placeholder="http://1.2.3.4"
            value={serverRoot}
            onChange={this.onServerRootChange}
          />
        </div>
        <div>
          <label>Download Folder:</label>
          <input
            type="text"
            placeholder="my-extension"
            value={dirName}
            onChange={this.onDirNameChange}
          />
        </div>
        <div>
          <button disabled={!serverRoot || !dirName} type="submit">
            Connect
          </button>
        </div>
      </form>
    );
  }
}
