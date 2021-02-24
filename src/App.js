import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { getEvents } from './api';
import './nprogress.css';
import NumberOfEvents from './NumberOfEvents';
import { Container, Card } from 'react-bootstrap';


class App extends Component {
  state = {
    events: [],
    currentLocation: "all",
    locations: [],
    filtered: [],
    numberOfEvents: 32,
  };


  componentDidMount() {
    this.mounted = true;
    getEvents().then((response) => {
      if (this.mounted) {
        this.setState({
          events: response.events,
          locations: response.locations,
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

  updateNumberOfEvents = (number) => {
    this.setState({ numberOfEvents: number });
    this.updateEvents("");
  };

  render() {
    let { filtered, locations, events, numberOfEvents } = this.state
    return (
      <Container>
        <Card>
          <Card.Text><h1 className="app-name">Meet App</h1></Card.Text>
        </Card>
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <EventList events={filtered.length ? filtered : events} />
        <NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents}
          length={numberOfEvents} />
      </Container>
    );
  }
}

export default App;