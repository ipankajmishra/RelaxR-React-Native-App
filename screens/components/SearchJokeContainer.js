import React, { Component } from 'react';

class SearchJokeContainer extends Component {
  state = {
      searchTerm: '',
  }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.fetchJokes(this.state.searchTerm);
    this.setState({
      searchTerm: ''
    })
  }

  render() {
    return (
      <React.Fragment>
        <h2>Search</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
            <input id="search" className="input-field" type='text' onChange={this.handleChange} value={this.state.searchTerm}/>
            <label htmlFor="search">Search term</label>
          </div>
          <button className="btn waves-effect waves-light blue darken-3" type='submit'>Search</button>
        </form>
      </React.Fragment>
    )
  }
}

export default SearchJokeContainer;
