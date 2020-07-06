import React, { Component } from "react";

export default class ErrorBoundry extends Component {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: "center", marginTop: "20%" }}>
          <h1>Oops Page Not Found!</h1>
          <p>This may also happen if you refresh the page.</p>
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}
