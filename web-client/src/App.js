import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import theme from "./styles/theme";

require("./App.css");

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <p>test</p>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
