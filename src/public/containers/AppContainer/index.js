import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as hashtagActions from '../../actions/hashtags';
import * as wordCloud from '../../services/word-cloud';
import './app.css';
import { maxBy } from 'lodash';

class AppContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(hashtagActions.request());
  }

  componentWillReceiveProps(props) {
    const { hashtags = [] } = props;
    const maxVolume = maxBy(hashtags, 'volume').volume;

    if (hashtags.length) {
      const words = hashtags.map(hashtag => ({
        text: hashtag.name,
        size: hashtag.volume / maxVolume * 100
      }));

      wordCloud.create(words);
    } else {
      console.error('Invalid hashtags');
    }
  }

  render() {
    const { hashtags } = this.props;
    return (
      <div />
    );
  }
}

AppContainer.propTypes = {};

function mapStateToProps(state, routing) {
  const { hashtags = [] } = state;
  return { hashtags };
}

export default connect(mapStateToProps)(AppContainer);
