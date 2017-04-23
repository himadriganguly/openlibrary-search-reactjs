require("jquery");
// import React from 'react/addons';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SearchPage from './SearchPage';
import config from '../../../config/app';

class AppRoot extends Component {
    // propTypes: {
    //   state: React.PropTypes.object.isRequired // We can use state as needed ahead to initialize the App.
    // }
    constructor(props) {
      super(props);
    }

    render()
    {
      return <SearchPage state={this.state}/>;
    }
};

AppRoot.propTypes = {
  state: PropTypes.object.isRequired
};

export default AppRoot;
