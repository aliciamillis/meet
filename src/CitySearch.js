import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import './App.css';
import { InfoAlert } from './Alert';


class CitySearch extends Component {
  state = {
    locations: this.props.locations,
    query: "",
    suggestions: [],
    showSuggestions: false,
    infoText: ''
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ showSuggestions: true });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: 'We can not find the city you are looking for. Please try another city',
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: ''
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
    });
    this.props.updateEvents(suggestion);
  };


  render() {
    let { value } = this.state;
    return (
      <div className="CitySearch">

        Search for events in:
        <Form.Control
          type="text"
          className="city"
          value={value}
          onChange={this.handleInputChanged}
        />
        <ul
          className={
            this.state.showSuggestions
              ? "suggestions showSuggestions"
              : "display-none"
          }
        >
          <InfoAlert text={this.state.infoText} />
          {this.state.suggestions.map((suggestion) => (
            <li
              className="suggested"
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li onClick={() => this.handleItemClicked("all")}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;