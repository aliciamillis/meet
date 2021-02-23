import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { getEvents } from './api';
import './nprogress.css';


class App extends Component {
  state = {
    events: [],
    currentLocation: "all",
    locations: [],
    filtered: [],
    numberOfEvents: 32
  };


  componentDidMount() {
    this.mounted = true;
    getEvents().then((response) => {
      if (this.mounted) {
        this.setState({
          events : response.events,
          locations: response.locations
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((response) => {
      const { currentLocation, numberOfEvents } = this.state;
      const locationEvents =
          currentLocation === "all"
              ? response.events
              : response.events.filter((event) => event.location === location);

      let events = [];
      if (!locationEvents.length) {
        events = response.events.slice(0, numberOfEvents);
      } else {
        events = locationEvents.slice(0, numberOfEvents);
      }

      return this.setState({
        filtered: events,
        currentLocation: location,
      });
    });
  };


  render() {
    let {filtered, locations, events} = this.state
    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <EventList events={filtered.length ? filtered : events} />
      </div>
    );
  }
}

export default App;