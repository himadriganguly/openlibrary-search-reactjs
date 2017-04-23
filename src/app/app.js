// import ReactDom from 'react/addons';
import React from 'react';
import ReactDOM, {ReactDOMServer} from 'react-dom';

import AppRoot from './components/AppRoot';


class App {

  constructor(options) {
    this.state = options.state;
  }

  render(element) {

    // would be in JSX: <AppRoot state={this.state} />
    var appRootElement =  <AppRoot state={this.state} />;

    // render to DOM
    if (element) {
      ReactDOM.render(appRootElement, element);
      return;
    }

    // render to string
    return ReactDOMServer.renderToString(appRootElement);
  }

  renderToDOM(element) {
    if (!element) {
      new Error('App.renderToDOM: element is required');
    }

    this.render(element);
  }

  renderToString() {
    return this.render();
  }
}

export default App;
