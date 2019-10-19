import React, { Component } from 'react';
import { Row, Column, Switch } from '../m-components';

import RandomJokeContainer from './RandomJokeContainer';
import SearchJokeContainer from './SearchJokeContainer';

class SwitchContainer extends Component {
  state = {
    toggle: true
  }

  toggleSwitch = (event) => {
    const currentState = this.state.toggle;
    this.setState({
      toggle: !currentState
    })
  }

  render() {
    const jokeForm = (this.state.toggle)
                        ? <RandomJokeContainer
                            fetchJokes={this.props.fetchJokes}
                          />
                        : <SearchJokeContainer
                            fetchJokes={this.props.fetchJokes}
                          />;

    return(
      <React.Fragment>
        <Row>
          <Column styles={'s12 center-align'}>
            <Switch
              on='Random'
              off='Search'
              value={this.state.toggle}
              onChange={this.toggleSwitch}
            />
            {jokeForm}
          </Column>
        </Row>
      </React.Fragment>
    )
  }
}

export default SwitchContainer;
