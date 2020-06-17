import React, { Component } from 'react';
import './App.css';
import OutputConverter from './services/OutputConverter'

class App extends Component {
  constructor(props) {
    super(props);

    this.markdownInput = React.createRef();
    this.state = {};

    this.renderOutput = this.renderOutput.bind(this);
  }

  renderOutput() {
    let result = OutputConverter.ConvertToHtml(this.markdownInput.current.value);
    this.setState({
      output: result
    })
  }

  render() {
    let output = this.state.output;
    return (
      <div className="App">
        <div className="row header">
          <div className="col-2"></div>
          <div className="col-8">
            <h1>Markdown to HTML Converter</h1>
          </div>
          <div className="col-2"></div>

        </div>
        <div className="row spacingTop">
          <div className="col-2"></div>
          <div className="col-4">
            <div className="row">
              <h1>Markdown Input:</h1>
            </div>
            <div className="row">
              <textarea ref={this.markdownInput} onChange={() => this.renderOutput()} cols="50" rows="15" />
            </div>

          </div>
          <div className="col-4">
            <h1>HTML Output:</h1>
            <div className="outputContainer">
              {output}
            </div>

          </div>
          <div className="col-2"></div>
        </div>
      </div>
    );
  }
}

export default App;
